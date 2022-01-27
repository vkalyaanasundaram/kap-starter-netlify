// pages/404.js
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Custom404() {
  return (
    <>
      <Header />
      <div className="container min-h-screen">
        <h3>404 - Page Not Found</h3>
        <p>
          Please
          <Link href="/" passHref>
            <strong className="text-lg m-2 cursor-pointer">Click Here</strong>
          </Link>
          to go to Home Page
        </p>
      </div>
      <Footer />
    </>
  );
}
