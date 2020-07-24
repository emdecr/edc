import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { renderHTML } from "../helpers";

import DefaultLayout from "../components/layouts/Default";
import ProjectList from "../components/ProjectList";

export default function Home({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title>Emily Dela Cruz</title>
        <meta
          name="description"
          content="I'm a developer who's also building up their research muscles. I try to help people whose work addresses environmental, social, and ethical issues."
        />
      </Head>
      <main className="container container--grid mt--md" id="main-content">
        <div className="grid--span-6">
          <div className="title flex-all flex--ai-c">
            <h1 className="display--ib">Emily Dela Cruz</h1>
            <a
              className="pronouns mono fs--sm"
              href="https://www.mypronouns.org/she-her"
              target="_blank"
            >
              she/her
            </a>
          </div>
          <div
            className="content mt--xs intro-bio"
            dangerouslySetInnerHTML={renderHTML(data.page.content.rendered)}
          ></div>
        </div>
        <div
          className="grid--span-8 grid--start-1 nav-sentence fs--xl"
          dangerouslySetInnerHTML={renderHTML(
            data.page.meta_box._page_home_nav_sentence
          )}
        ></div>
      </main>

      <style jsx>{`
        h1 {
          margin: 0;
          line-height: 1;
          font-weight: normal;
        }
        .title > a {
          margin-left: 20px;
        }
        @media only screen and (max-width: 500px) {
          h1 {
            font-size: 1.5rem;
          }
          .title {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </DefaultLayout>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch page
  let page;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      page = pages.filter(p => p.slug == "home")[0];
    })
    .catch(function(error) {
      console.log("Projects page error: " + error);
      page = null;
    });
  // Fetch projects
  let projectList;
  await axios
    .get(
      process.env.CMS_API_URL +
        "wp-json/wp/v2/project?per_page=3&order=asc&_embed"
    )
    .then(function(response) {
      projectList = response.data;
    })
    .catch(function(error) {
      console.log("Projects error: " + error);
      projectList = null;
    });

  const data = {
    page,
    projectList
  };

  return { props: { data } };
}
