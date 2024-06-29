import ora from "ora";
import chalk from "chalk";
import {
  type ObjectIdentifier,
  PutObjectCommandOutput,
  S3,
} from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import mime from "mime-types";
import fs, { createReadStream } from "fs";
import path from "path";

const config = {
  distFolder: "out",
  bucketName: process.env.S3_BUCKET_NAME,
};

const getS3Config = () => {
  const credentials = process.env.AWS_PROFILE
    ? fromIni({
        profile: process.env.AWS_PROFILE,
      })
    : undefined;

  const logger = process.env.MUTE_AWS_LOGGER
    ? {
        trace: () => {},
        debug: () => {},
        info: () => {},
        warn: () => {},
        error: () => {},
      }
    : undefined;

  const region = process.env.AWS_REGION;

  return {
    credentials,
    region,
    logger,
  };
};

// recursive collection of files
async function getFiles(dir: string): Promise<string[]> {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : [res];
    }),
  );
  return Array.prototype.concat(...files) as string[];
}

async function collectFilesToDeploy() {
  const fileSpinner = ora("Collecting files to deploy").start();
  const files = await getFiles(config.distFolder);
  fileSpinner.stopAndPersist({
    text: `${files.length} local files`,
    symbol: "📦",
  });
  return files;
}

const deploy = async () => {
  const s3 = new S3(getS3Config());
  const spinner = ora("Deploying site to S3").start();

  const listBucketObjectKeys = async (
    symbol: string = "🔎",
  ): Promise<ObjectIdentifier[]> => {
    const bucketContentsSpinner = ora("Listing bucket contents").start();
    const bucketObjects: ObjectIdentifier[] = [];

    let response = await s3.listObjectsV2({ Bucket: config.bucketName });

    while (true) {
      if (!response.Contents || response.Contents.length === 0) {
        break;
      }

      const keys =
        response.Contents.map((object) =>
          object?.Key ? { Key: object.Key } : undefined,
        ).filter((key) => key !== undefined) ?? [];
      bucketObjects.push(...keys);

      if (response.IsTruncated) {
        response = await s3.listObjectsV2({
          Bucket: config.bucketName,
          ContinuationToken: response.ContinuationToken,
        });
      } else {
        break;
      }
    }

    bucketContentsSpinner.stopAndPersist({
      text: `${bucketObjects.length} objects in S3`,
      symbol,
    });
    return bucketObjects;
  };

  /**
   * Note: this is a batch action and it is eventually consistent.
   * If you upload while this is stil happening it will delete your newly uploaded files!
   * We need to poll the bucket until it is empty before continuing.
   */
  async function emptyBucket(objectsToDelete: ObjectIdentifier[]) {
    const emptyBucketSpinner = ora("Deleting bucket contents").start();

    s3.deleteObjects({
      Bucket: config.bucketName,
      Delete: { Objects: objectsToDelete },
    }).catch((err) => {
      console.error(chalk.redBright(err));
      emptyBucketSpinner.fail("Error emptying bucket");
      process.exit(1);
    });

    emptyBucketSpinner.text = "Waiting for bucket to empty...";
    let waits = 3;
    while ((await listBucketObjectKeys("🧹")).length != 0) {
      if (waits === 0) {
        spinner.fail("Bucket still not empty. Bailing out");
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      waits--;
    }

    emptyBucketSpinner.succeed("Bucket emptied");
  }

  const uploadFile = async (filePath: string, retry = 0) => {
    const opts = {
      Key: path.relative(config.distFolder, filePath),
      Bucket: config.bucketName,
      Body: createReadStream(filePath),
      ContentType: mime.lookup(filePath) || undefined,
    };

    try {
      return await s3.putObject(opts);
    } catch (err) {
      console.log("error on" + filePath);
      // Retry on throttles
      if (err && typeof err == "object" && "name" in err) {
        if (err.name === "SlowDown" && retry < 3) {
          await new Promise((resolve) => setTimeout(resolve, 2 ** retry * 200));
          return await uploadFile(filePath, retry + 1);
        }
      }
      console.log("Problem " + err);
      throw err;
    }
  };

  const uploadFiles = async (files: string[]) => {
    const uploadSpinner = ora("Uploading contents").start();

    // explicitly pass the filename in, otherwise the index messes with the retry counter
    const uploads = files.map((fileName) => uploadFile(fileName));

    let results: PutObjectCommandOutput[] = [];
    return Promise.all(uploads)
      .then((promiseResults) => results.push(...promiseResults))
      .then(() => uploadSpinner.succeed("Contents uploaded"))
      .catch((err) => {
        console.error(chalk.redBright(err));
        uploadSpinner.fail("Upload failed");
        process.exit(1);
      });
  };

  const validateUpload = async (expectedFiles: Iterable<string>) => {
    spinner.text = "Validating deployment";
    const objectKeysAfterDeployment = await listBucketObjectKeys("📋");
    const actualFiles = objectKeysAfterDeployment.map(
      (identifier) => identifier.Key,
    );

    let expectedFilesNotInS3 = new Set(expectedFiles);
    let unexpectedFilesInS3 = new Set(actualFiles);
    for (let expectedKey of expectedFilesNotInS3) {
      if (unexpectedFilesInS3.has(expectedKey)) {
        expectedFilesNotInS3.delete(expectedKey);
        unexpectedFilesInS3.delete(expectedKey);
      }
    }

    if (expectedFilesNotInS3.size + unexpectedFilesInS3.size > 0) {
      spinner.warn("Unexpected state after deployment completed");
      console.log({
        unexpectedFilesInS3,
        expectedFilesNotInS3,
      });
      process.exit(1);
    }
  };

  /**
   * Actual deployment
   */
  const files = await collectFilesToDeploy();
  if (files.length === 0) {
    spinner.warn("Could not find any files to upload in: " + config.distFolder);
    process.exit(1);
  }

  const objectsToDelete = await listBucketObjectKeys();
  if (objectsToDelete.length > 0) {
    await emptyBucket(objectsToDelete);
  }

  await uploadFiles(files);

  const expectedFiles = files.map((filePath) =>
    path.relative(config.distFolder, filePath),
  );
  await validateUpload(expectedFiles);

  spinner.stopAndPersist({
    symbol: "🚀",
    text: "Deployment complete",
  });
};

void deploy();
