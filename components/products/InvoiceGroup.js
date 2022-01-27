import React, { useEffect } from "react";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const GroupColumn = ({ columnone, columnTwo, data }) => {
  return (
    <>
      <div className="xs:w-full container m-10 mx-auto">
        <div className="container">
          <section className="xs: w-full md: grid grid-cols-1">
            <h2 className="text-kapitus font-bold xs: ml-5">
              {data?.invoiceTemplate?.groupColumnTitle}
            </h2>
            <hr className="my-5 p-5" />
          </section>
        </div>
      </div>
      {/* <div className="xs:w-full container px-5 m-10 mx-auto">
        
      </div> */}
      <div className="xs:w-full md:container px-5 mt-10 mb-10 mx-auto">
        <div className="container">
          <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            {columnone?.map((value, key) => (
              <div
                className="shadow-md rounded-md overflow-hidden dark:bg-red-100 dark:text-black"
                key={key}
              >
                <div className="grid place-items-center w-full text-right">
                  <Image
                    src={value?.groupOneImage?.sourceUrl}
                    width="100"
                    height="100"
                    alt=""
                  />
                </div>
                <h3 className="mb-2 text-center p-2">
                  {ReactHtmlParser(value?.groupOneTitle)}
                </h3>
                <div className="place-items-center">
                  <p className="mb-4 p-5">{value?.groupOneContent}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <div className="xs:w-full container m-10 mx-auto">
        <div className="container">
          <section className="grid grid-cols-1">
            <h2 className="text-kapitus font-bold xs: ml-5">
              {data?.invoiceTemplate?.groupColumnTitleTwo}
            </h2>
            <hr className="my-5 p-5" />
          </section>
        </div>
      </div>
      {/*<div className="xs:w-full container px-5 m-10 mx-auto">
        
      </div> */}
      <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
        <div className="container">
          <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            {columnTwo?.map((value, key) => (
              <div
                className="overflow-hidden dark:bg-red-100 dark:text-black relative py-10 min-h-min border-2"
                key={key}
              >
                <div className="grid place-items-center w-full text-right">
                  <Image
                    src={value?.groupImage?.sourceUrl}
                    width="100"
                    height="100"
                    alt=""
                  />
                </div>
                <h3 className="mb-2 text-center p-2">
                  {ReactHtmlParser(value?.groupTitle)}
                </h3>
                <div className="place-items-center">
                  <p className="mb-4 p-5">{value?.groupContent}</p>
                </div>
                <div className="grid place-items-center w-full text-right my-5 absolute bottom-0">
                  <button>
                    <Link
                      href={`/products-services/${value?.groupTitle
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                      passHref
                    >
                      Learn More
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default GroupColumn;
