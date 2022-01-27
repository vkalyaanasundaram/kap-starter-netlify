import Image from "next/image";

import useSWR from "swr";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/forms/Contactform";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Map = dynamic(() => import("../components/pages/ContactUs"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

export default function Contact() {
  const { asPath, pathname } = useRouter();
  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

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

  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
    rootMargin: "50px",
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // alert(data?.ACFcontact?.mobileImage?.sourceUrl);
  return (
    <>
      <Header />
      <div className="xs:grid-cols-1 md:grid grid-cols-2">
        {isDesktopOrLaptop && (
          <div className="xs:w-full">
            <Image
              src="https://kap-staging.us/wp-content/uploads/2020/05/HeroImages_secondarypage_contactus-2-1.jpg"
              width={750}
              height={600}
              layout="intrinsic"
              objectFit="contain"
              quality={100}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
              alt=""
            />
          </div>
        )}
        {isTabletOrMobile && (
          <div className="xs:w-full">
            {data?.ACFcontact?.mobileImage?.sourceUrl?.length > 0 && (
              <Image
                src={data?.ACFcontact?.mobileImage?.sourceUrl}
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
        )}
        <div className="xs:w-full bg-kapitus p-10">
          <ContactForm />
        </div>
      </div>

      <section ref={observe}>{inView && <Map />}</section>
      <section ref={observe}>{inView && <Footer />}</section>
    </>
  );
}
