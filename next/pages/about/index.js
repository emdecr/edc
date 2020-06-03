import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { renderIntro } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavAbout from "../../components/nav/NavAbout";
import Shelf from "../../components/Shelf";

export default function About({ data }) {
  function renderSkills() {
    if (data.page !== null) {
      return { __html: data.page.meta_box._page_skills_text };
    } else {
      return { __html: "<p>Error loading page content.</p>" };
    }
  }
  return (
    <DefaultLayout>
      <Head>
        <title>About ← Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-c">
          <h1>About</h1>
          <NavAbout active="/about" />
        </div>
        <div
          className="content grid--start-1 grid--span-7"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
        <div className="grid--start-9 grid--span-4">
          <h2>Main tools on rotation...</h2>
          <p
            className="mono fs--sm"
            dangerouslySetInnerHTML={renderSkills()}
          ></p>
        </div>
        <section className="grid--start-1 grid--span-all mt--md">
          <h2>The Link Shelf</h2>
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
  let about;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      about = pages.filter(p => p.slug == "about")[0];
    })
    .catch(function(error) {
      console.log("About page error: " + error);
      about = null;
    });
  // Fetch shelf
  let shelfItems;
  await axios
    .get(
      process.env.CMS_API_URL + "/wp-json/wp/v2/shelf-item?per_page=12&_embed"
    )
    .then(function(response) {
      shelfItems = response.data;
    })
    .catch(function(error) {
      console.log("Shelf error: " + error);
      shelfItems = null;
    });

  const data = {
    page: about,
    shelf: shelfItems
  };

  return { props: { data } };
}
