import Head from "next/head";
import Link from "next/link";
import { SkipNavContent } from "@reach/skip-nav";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import NavMain from "../nav/NavMain";
import Footer from "../Footer";

function DefaultLayout({ children }) {
  const router = useRouter();
  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 100,
    when: "afterChildren"
  };
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/quu5xdo.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i|Material+Icons"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Link href="/">
        <a className="mobile-logo no-border">
          <img src="/connect-extend.svg" alt="logo" />
        </a>
      </Link>
      <NavMain />
      <motion.div
        transition={spring}
        key={router.pathname}
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 0, opacity: 0 }}
        id="page-transition-container"
      >
        <SkipNavContent>{children}</SkipNavContent>
      </motion.div>
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
