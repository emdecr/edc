import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { renderIntro } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavRecords from "../../components/nav/NavRecords";

export default function Music({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title>Music ← Records ← Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-fe">
          <h1>Records</h1>
          <NavRecords />
        </div>
        <div
          className="content grid--span-7"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
      </main>

      <style jsx>{`
        h1 {
          margin: 0;
          line-height: 1;
        }
      `}</style>
    </DefaultLayout>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch page
  let musicPage;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      musicPage = pages.filter(p => p.slug == "music")[0];
    })
    .catch(function(error) {
      console.log("Records page error: " + error);
      musicPage = null;
    });
  const data = {
    page: musicPage
  };
  return { props: { data } };
}
