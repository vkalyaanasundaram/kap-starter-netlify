import Head from "next/head";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

export default function CarouselComponent({ data }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      keyBoardControl={true}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      autoPlay={true}
      autoPlaySpeed={4000}
      transitionDuration={800}
    >
      {data?.carouselData.map((value, key) => (
        <div className="w-full bg-carouselBlue" key={key}>
          <div className="xs:w-full md:w-1/2">
            <Image
              src={value?.carouselImage?.sourceUrl}
              // width={getWidth() * value?.carouselImage?.sourceUrl.length}
              width="650"
              height="550"
              layout="intrinsic"
              alt="Mountains"
              objectFit="cover"
            />
          </div>
          <div className="xs: static w-full md:absolute inset-y-0 right-5 top-1/4 w-1/2">
            <div className="xs:w-full text-center md:p-4 text-white carouselContent">
              {ReactHtmlParser(value?.carouselContent)}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
