import Head from "next/head";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  bgWrap,
  bgText,
  heroDesktopImage,
  heroMobileImage,
} from "../styles/Home.module.css";

export default function Banner({ data }) {
  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  return (
    <>
      <section className="relative">
        <div className="opacity-40">
          <div className={heroDesktopImage}>
            {data?.staticBannerImage?.sourceUrl?.length > 0 && (
              <Image
                src={data?.staticBannerImage?.sourceUrl}
                width={data?.staticBannerImage?.mediaDetails?.width}
                // height={data?.bannerImage?.mediaDetails?.height}
                height={550}
                layout="intrinsic"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                alt="Kapitus"
              />
            )}
          </div>
          <div className={heroMobileImage}>
            {data?.staticMobileBannerImage?.sourceUrl?.length > 0 && (
              <Image
                src={data?.staticMobileBannerImage?.sourceUrl}
                width={500}
                height={750}
                layout="intrinsic"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="container">
          <div className={bgText}>
            <div className="xs:grid col-auto lg:grid grid-cols-2 gap-1 p-3">
              <div className="text-kapitus mb-10">
                <div className="xs:w-full text-3xl md:text-5xl">
                  {data?.staticBannerTitle}
                </div>
                {/* <div className="text-sm md:text-xl lg:text-2xl text-descGreen my-10">
                  {ReactHtmlParser(data?.staticBannerDescription)}
                </div> */}
                <div
                  className="text-sm md:text-xl lg:text-2xl text-descGreen my-10"
                  dangerouslySetInnerHTML={{
                    __html: data?.staticBannerDescription,
                  }}
                />
                <div
                  className="xs:text-xs sm:text-lg mt-5 md:text-xl text-kapitus"
                  dangerouslySetInnerHTML={{
                    __html: data?.staticBannerButton,
                  }}
                />
              </div>

              <div className="xs: hidden sm:hidden md:block ">
                {/* {ReactHtmlParser(frmData)} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
