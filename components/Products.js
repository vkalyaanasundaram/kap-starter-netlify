import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";

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

export default function ProductsContainer({ data }) {
  const router = useRouter();
  const { asPath, pathname } = useRouter();

  const cardPage = (href) => {
    // console.log(href)
    router.push(href);
  };

  return (
    <>
      <div className="w-full p-10">
        <div className="container mx-auto">
          <div>{ReactHtmlParser(data?.ourGoal)}</div>
          <div className="container">
            <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
              {data?.productsCards?.map((value, key) => (
                <div
                  className="overflow-hidden dark:bg-red-100 dark:text-black relative py-10 min-h-min border-2"
                  key={key}
                >
                  <div className="grid place-items-center w-full text-right">
                    {value?.svgIcon?.sourceUrl?.length > 0 && (
                      <Image
                        src={value?.svgIcon?.sourceUrl}
                        width="100"
                        height="100"
                        alt=""
                        objectFit="cover"
                        quality={100}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(700, 475)
                        )}`}
                      />
                    )}
                  </div>

                  <h2 className="text-3xl font-semibold text-center my-10 uppercase text-kapitus">
                    {ReactHtmlParser(value?.cardTitle)}
                  </h2>
                  <div className="place-items-center">
                    <p className="mb-4 p-5">
                      {ReactHtmlParser(value?.cardContent)}
                    </p>
                  </div>

                  <div className="grid place-items-center w-full text-right my-5 absolute bottom-0">
                    <button
                      className="shadow-md p-5 py-3 bg-blue-900 text-sm"
                      onClick={(e) => {
                        cardPage(value?.cardSlug);
                      }}
                    >
                      {ReactHtmlParser(value?.cardButton)}
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </div>
          <div>{ReactHtmlParser(data?.getStartedToday)}</div>
        </div>
      </div>
    </>
  );
}
