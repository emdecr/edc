import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { renderIntro } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavAbout from "../../components/nav/NavAbout";
import Shelf from "../../components/Shelf";

export default function AboutTheShelf({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title>The Shelf ← About ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-fe">
          <h1>About</h1>
          <NavAbout active="/about/now" />
        </div>
        <div
          className="content grid--span-7"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
        <section className="grid--span-all">
          <Shelf items={data.shelf} />
        </section>
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
  let shelfPage;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      shelfPage = pages.filter(p => p.slug == "the-shelf")[0];
    })
    .catch(function(error) {
      console.log("About page error: " + error);
      shelfPage = null;
    });
  // Fetch shelf
  let shelfItems;
  await axios
    .get(
      process.env.CMS_API_URL + "/wp-json/wp/v2/shelf-item?per_page=100&_embed"
    )
    .then(function(response) {
      shelfItems = response.data;
    })
    .catch(function(error) {
      console.log("Shelf error: " + error);
      shelfItems = null;
    });

  const data = {
    page: shelfPage,
    shelf: shelfItems
  };

  return { props: { data } };
}
