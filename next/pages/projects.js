import Head from "next/head";
import Link from "next/link";
import axios from "axios";

import { renderHTML } from "../helpers";

import DefaultLayout from "../components/layouts/Default";

export default function Projects({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title>Projects ← Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title">
          <h1>Projects</h1>
        </div>
        <div
          className="content grid--span-7"
          dangerouslySetInnerHTML={renderHTML(data.page.content.rendered)}
        ></div>
      </main>

      <style jsx>{``}</style>
    </DefaultLayout>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch page
  let projects;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      projects = pages.filter(p => p.slug == "projects")[0];
    })
    .catch(function(error) {
      console.log("Projects page error: " + error);
      projects = null;
    });
  // Fetch projects
  let projectList;
  await axios
    .get(
      process.env.CMS_API_URL +
        "wp-json/wp/v2/project?per_page=50&order=asc&_embed"
    )
    .then(function(response) {
      projectList = response.data;
    })
    .catch(function(error) {
      console.log("Projects error: " + error);
      projectList = null;
    });

  const data = {
    page: projects,
    projectList
  };

  return { props: { data } };
}
