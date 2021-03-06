import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Content from "../components/Content";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import CarouselComponent from "../components/Carousel";
import { contentNav } from "../styles/Home.module.css";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
export default function Contant({ ProblmesData }) {
  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
    rootMargin: "50px",
  });

  const BannerData = ProblmesData?.page?.ThreeColumnStaticPage?.banner;

  return (
    <>
      <Header />
      <Banner data={BannerData} />
      <div>
        <div ref={observe}>
          {inView && (
            <Content data={ProblmesData?.page?.ThreeColumnStaticPage?.cards} />
          )}
        </div>
        <div className={contentNav} ref={observe}>
          {inView && (
            <CarouselComponent data={ProblmesData?.page?.carouselAcf} />
          )}
        </div>
      </div>
      <div ref={observe}>{inView && <Footer />}</div>
    </>
  );
}

export async function getStaticProps(context) {
  // console.log("Generating/Regenerating");

  const client = new ApolloClient({
    uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const { data, error } = await client.query({
    query: gql`
      query HomePage {
        page(id: "/problems-we-solve", idType: URI) {
          title
          ThreeColumnStaticPage {
            banner {
              staticBannerButton
              staticBannerDescription
              staticBannerTitle
              staticMobileBannerImage {
                sourceUrl
                mediaDetails {
                  width
                  height
                }
              }
              staticBannerImage {
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            financeSolution
            cards {
              staticCardContent
              staticCardButton
              staticButtonLink
              staticCardTitle
            }
          }
          carouselAcf {
            carouselData {
              carouselContent
              carouselImage {
                sourceUrl
              }
            }
          }
        }
      }
    `,
  });
  // console.log(data);
  return {
    props: {
      ProblmesData: data,
    },
    revalidate: 10, // 10 seconds
  };
}
