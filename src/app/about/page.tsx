"use client";

import React, { useMemo } from "react";
import { Layout } from "~/app/components/Layout";
import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
  const showSnek = useMemo(() => Math.floor(Date.now() / 1000) % 5 > 2, []);
  const image = useMemo(() => {
    return showSnek ? (
      <Image
        alt="a snek"
        className="my-5 rounded-3xl"
        height={150}
        width={150}
        src=""
        overrideSrc="/images/angry-snek.jpg"
      />
    ) : (
      <Image
        alt="picture of Emerick Bosch"
        className="my-5 rounded-3xl"
        height={150}
        width={150}
        src=""
        overrideSrc="/images/emerick-bosch.jpg"
      />
    );
  }, [showSnek]);

  return (
    <Layout>
      <div className="flex justify-center text-center">
        <div style={{ maxWidth: "800px" }} className="w-9/12">
          <h2>Hi, there! 👋</h2>
          <div className="flex justify-center">{image}</div>
          <p>I am Emerick; you can also call me Rick.</p>
          <p>
            I build software systems. I strive to build them to leave a positive
            impact on those who use them, to build them sustainably, and to
            build them alongside excellent people. I am currently based in the
            Nederlands 🇳🇱.
          </p>
          <br />
          <Link
            href="/"
            className={
              "mt-2" +
              " quicksand text-gray-600 visited:text-gray-600 hover:text-orange-500 visited:hover:text-orange-500" +
              " dark:text-gray-300 dark:visited:text-gray-300 dark:hover:text-orange-400 dark:visited:hover:text-orange-400" +
              " border-b-2 border-dotted border-gray-600 pb-1"
            }
          >
            Back to landing page
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
