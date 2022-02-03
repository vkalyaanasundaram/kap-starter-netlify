import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Content from "../components/Content";
import Accordion from "../components/Accordion";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
export default function Contant({ data }) {
  const { asPath, pathname } = useRouter();
  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
    rootMargin: "50px",
  });

  // const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  const BannerData = data?.page?.ThreeColumnStaticPage?.banner;
  return (
    <>
      <Header />
      <Banner data={BannerData} />
      <div className="py-10 px-5">
        <div ref={observe}>
          {inView && (
            <Content data={data?.page?.ThreeColumnStaticPage?.cards} />
          )}
        </div>
      </div>
      <section ref={observe} className="w-full">
        <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
          <div className="container">
            <div className="xs:grid-cols-1 md:grid grid-cols-2 gap-4">
              <div className="md:w-full mx-auto">
                {data?.page?.accordionData?.accordion?.map((value, key) => (
                  <Accordion
                    title={value.accordionTitle}
                    content={value.accordionContent}
                    key={key}
                  />
                ))}
              </div>
              <div className="md:w-full mx-auto ">
                <Image
                  src="/HeroImages_secondarypage_salespartners.jpg"
                  alt=""
                  width="750"
                  height="500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section ref={observe}>
        {inView && (
          <div
            className="xs:w-full container px-5 mt-10 mb-10 mx-auto"
            dangerouslySetInnerHTML={{
              __html: data?.ThreeColumnStaticPage?.financeSolution,
            }}
          />
        )}
      </section>
      <section ref={observe}>{inView && <Footer />}</section>
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
      query PartnerPage {
        page(id: "/partner", idType: URI) {
          title
          uri
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
            cards {
              staticCardTitle
              staticCardContent
              staticCardButton
              staticButtonLink
              staticSvgIcon {
                sourceUrl
              }
            }
            financeSolution
          }
          accordionData {
            accordion {
              accordionTitle
              accordionContent
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
