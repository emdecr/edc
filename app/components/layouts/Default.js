import Head from "next/head";
import Link from "next/link";
import { SkipNavContent } from "@reach/skip-nav";

import NavMain from "../nav/NavMain";
import Footer from "../Footer";

function DefaultLayout({ children }) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/quu5xdo.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i|Material+Icons"
        />
      </Head>
      <Link href="/">
        <a className="mobile-logo no-border">
          <img src="/connect-extend.svg" alt="logo" />
        </a>
      </Link>
      <NavMain />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
      <div className="grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{`
        img {
          width: 60px;
          height: auto;
          margin: 1rem 20px 0;
        }
        @media only screen and (min-width: 700px) {
          .mobile-logo {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default DefaultLayout;
