import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";

import Products from "../components/Products";
import CarouselComponent from "../components/Carousel";
import ProductBanner from "../components/products/Banner";

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
export default function ProductsWeOffer({ data }) {
  const { asPath, pathname } = useRouter();
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  // const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  const ProductsData = data?.page?.productsAcf;
  const AccordionData = data?.page?.accordionData;
  const getStartedData = data?.page?.productsAcf?.getStartedToday;

  return (
    <>
      <Header />
      <div className="float-left clear-both w-full">
        <ProductBanner data={ProductsData} />
      </div>
      <div ref={observe}>{inView && <Products data={ProductsData} />}</div>
      <div ref={observe}>
        {inView && <CarouselComponent data={data?.page?.carouselAcf} />}
      </div>
      {/* <div className="container mx-10">
        {ReactHtmlParser(getStartedData)}
      </div> */}

      <div ref={observe}>{inView && <Footer />}</div>
    </>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  const { data, error } = await client.query({
    query: gql`
      query SinglePage {
        page(idType: URI, id: "/products-we-offer") {
          productsAcf {
            mobileBannerImage {
              mediaDetails {
                width
                height
                file
              }
              sourceUrl
            }
            bannerListItems {
              title
              listsItems
            }
            pageBannerDescription
            pageBannerTitle
            ourGoal
            productsCards {
              cardContent
              cardTitle
              svgIcon {
                sourceUrl
              }
              cardButton
              cardSlug
            }
            getStartedToday
            pageBanner {
              mediaDetails {
                width
                height
                file
              }
              sourceUrl
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
      data: data,
    },
  };
}
