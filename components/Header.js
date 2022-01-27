import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import { HamburgerArrow } from "react-animated-burgers";
import { useMediaQuery } from "react-responsive";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Header() {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const { data, error } = useSWR("/api/page/header", fetcher);
  const [isOpen, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const toggleButton = useCallback(
    () => setIsActive((prevState) => !prevState),
    []
  );

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <div>failed to load</div>;

  return (
    <>
      <div className="md:block border-2 border-white w-full bg-kapitus px-2 py-2 float-left ">
        <div className="container">
          <div className="xs:w-1/2  md:w-9/12">
            <Link href="https://www.facebook.com/KapitusFinance/">
              <a target="_blank" rel="noreferrer">
                <FaFacebookSquare
                  className="text-white mr-2 float-left"
                  size="25px"
                />
              </a>
            </Link>
            <Link href="https://twitter.com/KapitusFinance">
              <a target="_blank" rel="noreferrer">
                <FaTwitterSquare
                  className="text-white  mr-2 float-left"
                  size="25px"
                />
              </a>
            </Link>
            <Link href="https://www.linkedin.com/company/kapitus/">
              <a target="_blank" rel="noreferrer">
                <FaLinkedin
                  className="text-white mr-2 float-left"
                  size="25px"
                />
              </a>
            </Link>
            <Link href="https://www.instagram.com/kapitus_financing/">
              <a target="_blank" rel="noreferrer">
                <FaInstagram
                  className="text-white mr-2 float-left"
                  size="25px"
                />
              </a>
            </Link>
            <Link href="https://www.youtube.com/channel/UCeCPsIXW-bxrVBQI_ilP_tA">
              <a target="_blank" rel="noreferrer">
                <FaYoutube className="text-white mr-2 float-left" size="25px" />
              </a>
            </Link>
          </div>
          <div className="xs:w-1/2 text-xs md:w-3/12 text-right text-white text-xs float-right">
            Login | Call now: (800) 780-7133
          </div>
        </div>
      </div>
      <div className="bg-kapitus border-2 border-white px-5">
        <nav className="container flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="tracking-tight">
              <Link href="/" passHref>
                <a>
                  {isDesktopOrLaptop && (
                    <Image
                      src="/Kapitus_Logo_white.webp"
                      width={250}
                      height={85}
                      layout="intrinsic"
                      className="cursor-pointer"
                      alt="Kapitus"
                    />
                  )}

                  {isTabletOrMobile && (
                    <div className="flex">
                      <Image
                        src="/kapitus-bug-3.png"
                        width={50}
                        height={40}
                        layout="intrinsic"
                        className="cursor-pointer"
                        alt="Kapitus"
                      />
                      <button className="bg-kapitusLiteGreen xs: ml-10">
                        <span className="kapitusblue"> Apply Now</span>
                      </button>
                    </div>
                  )}
                </a>
              </Link>
            </span>
          </div>
          <div className="float-left mb-5 block lg:hidden">
            <button
              onClick={() => setMenuVisibility(!isMenuVisible)}
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            >
              <title>Menu</title>
              {/* <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /> */}

              <HamburgerArrow
                buttonColor="#00395d"
                barColor="white"
                buttonWidth={15}
                className="humbargerBtn"
                {...{ isActive, toggleButton }}
              />
            </button>
          </div>
          <div
            className={`${
              isMenuVisible ? "max-h-full" : "h-0"
            } overflow-hidden w-full lg:h-full block flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
              {data?.menuItems?.edges.map(({ node }, index) => (
                <span
                  className="text-white text-center text-lg block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  key={index}
                >
                  <Link
                    href={node.url}
                    passHref
                    prefetch={false}
                    className="text-white"
                  >
                    <a>{node.label}</a>
                  </Link>
                </span>
              ))}
            </div>
            <div className="bg-green px-10 py-3 mb-5 text-kapitus font-semibold">
              <Link href="/fast-application/" passHref>
                APPLY NOW
              </Link>
            </div>
          </div>
        </nav>
      </div>
      {/* Sticky Header Sample Code */}
      {isDesktopOrLaptop && scrollY > 100 ? (
        <div className="stickySmall xs:hidden md: block">
          <div className="bg-kapitus  px-5">
            <nav className="container flex items-center justify-between flex-wrap">
              <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="tracking-tight">
                  <Link href="/" passHref>
                    <a>
                      {isDesktopOrLaptop && (
                        <Image
                          src="/Kapitus_Logo_white.webp"
                          width={250}
                          height={85}
                          layout="intrinsic"
                          className="cursor-pointer"
                          alt="Kapitus"
                        />
                      )}

                      {isTabletOrMobile && (
                        <div className="flex">
                          <Image
                            src="/kapitus-bug-3.png"
                            width={40}
                            height={20}
                            layout="intrinsic"
                            className="cursor-pointer"
                            alt="Kapitus"
                          />
                          <button className="bg-kapitusLiteGreen xs: ml-10">
                            <span className="kapitusblue"> Apply Now</span>
                          </button>
                        </div>
                      )}
                    </a>
                  </Link>
                </span>
              </div>

              <div
                className={`${
                  isMenuVisible ? "max-h-full" : "h-0"
                } overflow-hidden w-full lg:h-full block flex-grow lg:flex lg:items-center lg:w-auto`}
              >
                <div className="text-sm lg:flex-grow">
                  {data?.menuItems?.edges.map(({ node }, index) => (
                    <span
                      className="text-white text-center text-md block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                      key={index}
                    >
                      <Link
                        href={node.url}
                        passHref
                        prefetch={false}
                        className="text-white"
                      >
                        <a>{node.label}</a>
                      </Link>
                    </span>
                  ))}
                </div>
                <div className="bg-green px-5 py-1 mb-5 text-kapitus font-semibold">
                  <Link href="/fast-application/" passHref>
                    APPLY NOW
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

// export default Header;
