import Link from "next/link";
import { Layout } from "./Layout";

type Props = {
  articlePath: string;
};

const ArticleRedirect = ({ articlePath }: Props) => {
  return (
    <>
      <head>
        <meta http-equiv="refresh" content={`0; url=${articlePath}`}></meta>
      </head>
      <Layout>
        <h1>Redirecting from permalink...</h1>
        <Link href={articlePath}>Click here</Link> if you are not redirected
        automatically after a couple of seconds.
      </Layout>
    </>
  );
};

export default ArticleRedirect;
