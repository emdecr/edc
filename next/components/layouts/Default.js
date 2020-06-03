import Head from "next/head";
import Link from "next/link";

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
      <NavMain />
      {children}
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
    </div>
  );
}

export default DefaultLayout;
