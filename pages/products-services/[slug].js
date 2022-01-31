import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Header from "../../components/Header";
import ProductBanner from "../../components/products/IndividualBanner";
import Content from "../../components/products/Content";
import { useMediaQuery } from "react-responsive";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const InvoiceBannerNav = dynamic(() =>
  import("../../components/products/InvoiceBanner")
);

const GroupColumn = dynamic(() => import("../../components/products/Group"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const InvoiceGroupColumn = dynamic(
  () => import("../../components/products/InvoiceGroup"),
  {
    loading: function ld() {
      return <p>Loading...</p>;
    },
    ssr: false,
  }
);
const Requirements = dynamic(
  () => import("../../components/products/Requirements"),
  {
    loading: function ld() {
      return <p>Loading...</p>;
    },
    ssr: false,
  }
);
const FAQ = dynamic(() => import("../../components/products/FAQ"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const Who = dynamic(() => import("../../components/products/Who"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const How = dynamic(() => import("../../components/products/HowToApply"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const ProductsBlogs = dynamic(
  () => import("../../components/products/ProductsBlogs"),
  {
    loading: function ld() {
      return <p>Loading...</p>;
    },
    ssr: false,
  }
);
const Footer = dynamic(() => import("../../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

export default function ProductPage() {
  const { router, asPath } = useRouter();

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
    rootMargin: "50px",
  });

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
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const individualProducts = data?.individualProducts;
  const IndividualBanner = data?.individualProducts;
  const ProductDescription =
    data?.individualProducts?.individualProductDescription;
  const ProductContent = data?.individualProducts?.productsContent;
  const RequirementsData = data?.individualProducts?.requirements;
  const HowToApply = data?.individualProducts?.howToApply;
  const WhoShould = data?.individualProducts?.whoShould;

  // invoiceTemplate
  const invoiceTemplate = data?.invoiceTemplate;
  const InvoiceBanner = data?.invoiceTemplate;
  const InvoiceGroupColumnOne = data?.invoiceTemplate?.groupColumnOne;
  const InvoiceGroupColumnTwo = data?.invoiceTemplate?.groupColumnTwo;
  // console.log(data);

  if (individualProducts) {
    return (
      <>
        <Head>
          <title>Products We Offer</title>
        </Head>
        <Header />
        <section className="w-full">
          <section className="productSticky ">
            <div className="container">
              <div className="ml-5 flex">
                <div className="xs:p-5 text-pink mr-5 text-md flex-col md:pr-10">
                  <a href="#Requirement"> Requirements</a>
                </div>
                <div className="xs:p-5 text-pink mr-5 text-md flex-col md:pr-10">
                  <a href="#HowApply"> How To Apply</a>
                </div>
                <div className="xs:p-5 text-pink text-md flex-col md:pr-10">
                  <a href="#Who"> Who is this For?</a>
                </div>
              </div>
            </div>
          </section>
          {isTabletOrMobile && (
            <section className="w-full bg-kapitus">
              <div className="container">
                <div className="ml-5 p-5 text-center">
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    keyBoardControl={true}
                    transitionDuration={800}
                    containerClass="carousel-container"
                    itemClass="carousel-item-padding-40-px"
                    autoPlay={true}
                    arrows={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                  >
                    <span className="xs:p-2 text-2xl text-white md:pr-10 ">
                      <Link href="/products-services/business-loans">
                        Business Loans
                      </Link>
                    </span>
                    <span className="xs:p-2 text-2xl text-white md:pr-10 ">
                      <Link href="/products-services/concierge-services">
                        Concierge Services
                      </Link>
                    </span>
                    <span className="xs:p-2 text-2xl text-white md:pr-10 ">
                      <Link href="/products-services/helix-healthcare-financing">
                        Helix Healthcare Financing
                      </Link>
                    </span>
                    <span className="xs:p-2 text-2xl text-white md:pr-10 ">
                      <Link href="/products-services/invoice-factoring">
                        Invoice Factoring
                      </Link>
                    </span>
                    <span className="xs:p-2 text-2xl text-white md:pr-10 ">
                      <Link href="/products-services/line-of-credit">
                        Line of Credit
                      </Link>
                    </span>
                    <span className="xs:p-2 text-2xl text-white md:pr-10 ">
                      <Link href="/products-services/purchase-order-financing">
                        Purchase Order Financing
                      </Link>
                    </span>
                    <span className="xs:p-2 text-2xl text-white md:pr-10 ">
                      <Link href="/products-services/revenue-based-financing">
                        Revenue Based Financing
                      </Link>
                    </span>
                    <span className="xs:p-2 text-2xl text-white md:pr-10 ">
                      <Link href="/products-services/sba-loans">SBA Loans</Link>
                    </span>
                  </Carousel>
                </div>
              </div>
            </section>
          )}
          <section className="w-full">
            <ProductBanner data={IndividualBanner} />
          </section>

          <section ref={observe}>
            {inView && (
              <Content content={ProductContent} desc={ProductDescription} />
            )}
          </section>

          <div className="container">
            <div className="xs:w-full md:w-9/12 " ref={observe}>
              {inView && <Requirements data={RequirementsData} />}
            </div>
            <div className="xs:w-full md:w-9/12 " ref={observe}>
              {inView && <How data={HowToApply} />}
            </div>
            <div className="xs:w-full md:w-9/12" ref={observe}>
              {inView && <Who data={WhoShould} />}
            </div>
          </div>
          <div className="xs:w-full md:w-9/12" ref={observe}>
            {inView && <GroupColumn />}
          </div>
          <div className="container" ref={observe}>
            {inView && <FAQ />}
          </div>
          <section className="container my-10" ref={observe}>
            {inView && <ProductsBlogs data={data} />}
          </section>
          <section className="w-full" ref={observe}>
            {inView && <Footer />}
          </section>
        </section>
      </>
    );
  } else {
    return (
      <>
        <Header />

        <div className="w-full">
          <InvoiceBannerNav data={InvoiceBanner} />
        </div>
        <div ref={observe}>
          <InvoiceGroupColumn
            columnone={InvoiceGroupColumnOne}
            columnTwo={InvoiceGroupColumnTwo}
            data={data}
          />
        </div>

        <div className="xs:w-full container px-5 m-10 mx-auto">
          <div className="container">
            <h3>READY TO APPLY? </h3>
            <p className="mt-5">
              If invoice factoring seems like the right fit for you, let’s get
              you ready to apply. To begin the application, you will need to be
              able to provide an accounts receivable/payable aging report,
              articles of incorporation or partnership agreement, personal or
              corporate tax return and personal or corporate financial
              statement. Also, be sure to check the credit of your commercial
              clients. Invoice factoring does not pull your credit, but your
              commercial clients’ credit must be in good standing. Additional
              documentation will likely be required as you move through the
              underwriting process. If you’re still not sure that invoice
              factoring is right for you, you can use our financing matching
              tool or give us a call at (800) 780-7133 to speak with one of our
              financing specialists.
            </p>
          </div>
        </div>
        <div className="w-full mt-10" ref={observe}>
          {inView && <Footer />}
        </div>
      </>
    );
  }
}
