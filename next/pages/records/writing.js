import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { renderIntro } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavRecords from "../../components/nav/NavRecords";

export default function Writing({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title>Writing ← Records ← Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid" id="main-content">
        <div className="grid--span-all name">
          <h1>Records</h1>
          <NavRecords />
        </div>
        {/* <div
          className="content grid--span-7"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div> */}
      </main>

      <style jsx>{`
        .container {
          margin-top: 4rem;
        }
        .name {
          display: flex;
          align-items: center;
        }
        .learn-more {
          font-size: 0.7rem;
        }
        h1 {
          margin: 0;
          line-height: 1;
        }
      `}</style>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  // Fetch page
  // let page;
  // await axios
  //   .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
  //   .then(function(response) {
  //     const pages = response.data;
  //     page = pages.filter(p => p.slug == "writing")[0];
  //   })
  //   .catch(function(error) {
  //     console.log("Records page error: " + error);
  //     page = null;
  //   });
  // const data = {
  //   page
  // };
  // return { props: { data } };
}
