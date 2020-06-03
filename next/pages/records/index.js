import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { renderIntro } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavRecords from "../../components/nav/NavRecords";

export default function Records({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title>Records – Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-c">
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
  let recordsPage;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      recordsPage = pages.filter(p => p.slug == "records")[0];
    })
    .catch(function(error) {
      console.log("Records page error: " + error);
      recordsPage = null;
    });
  // Fetch posts
  let posts;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/posts?per_page=50&_embed")
    .then(function(response) {
      posts = response.data;
    })
    .catch(function(error) {
      console.log("Posts error: " + error);
      posts = null;
    });
  // Fetch reads
  let reads;
  await axios
    .get(
      process.env.CMS_API_URL +
        "wp-json/wp/v2/read?per_page=50&order=desc&_embed"
    )
    .then(function(response) {
      reads = response.data;
    })
    .catch(function(error) {
      console.log("Reads error: " + error);
      reads = null;
    });

  const data = {
    page: recordsPage,
    reads,
    posts
  };

  return { props: { data } };
}
