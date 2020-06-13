import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { renderIntro, renderHTML } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavAbout from "../../components/nav/NavAbout";
import Shelf from "../../components/Shelf";

export default function About({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title>About ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-c mb--sm">
          <h1>About</h1>
          <NavAbout active="/about" />
        </div>
        <div
          className="content grid--start-1 grid--span-6"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
        <div className="grid--start-8 grid--span-4">
          <h2>{data.page.meta_box._page_skills_title}</h2>
          <div
            className="mono fs--sm"
            dangerouslySetInnerHTML={renderHTML(
              data.page.meta_box._page_skills_text
            )}
          ></div>
        </div>
        <section className="grid--start-1 grid--span-all container--grid mt--md">
          <h2 className="grid--span-all">The Link Shelf</h2>
          <div
            className="grid--span-6"
            dangerouslySetInnerHTML={renderHTML(
              data.shelfIntro.content.rendered
            )}
          ></div>
          <Shelf items={data.shelf} />
          <div className="grid--span-all">
            <Link href="/about/the-link-shelf">
              <a className="btn btn--ghost mt--md fs--sm mono grid--span-all">
                View the full shelf
              </a>
            </Link>
          </div>
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
  let shelfIntro;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      about = pages.filter(p => p.slug == "new-about")[0];
      shelfIntro = pages.filter(p => p.slug == "the-shelf")[0];
    })
    .catch(function(error) {
      console.log("About page error: " + error);
      about = null;
      shelfIntro = null;
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
    shelf: shelfItems,
    shelfIntro
  };

  return { props: { data } };
}
