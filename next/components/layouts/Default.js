import NavMain from "../nav/NavMain";
import Head from "next/head";
import Link from "next/link";

function DefaultLayout({ children }) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/quu5xdo.css" />
      </Head>
      <NavMain />
      {children}
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
