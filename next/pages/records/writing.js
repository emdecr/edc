import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import moment from "moment";

import { renderIntro, renderHTML, getImageUrl } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavRecords from "../../components/nav/NavRecords";

export default function Writing({ data }) {
  const renderWriting = data.posts.map((item, index) => (
    <li key={"item-" + index}>
      <span className="mono fs--xs grid--span-7">
        {moment(item.date).format("ll")}
      </span>
      <div className="grid--span-7">
        <h3 className="fw--normal italic">
          <Link href={"/records/" + item.slug}>
            <a dangerouslySetInnerHTML={renderHTML(item.title.rendered)}></a>
          </Link>
        </h3>
      </div>
      <style jsx>{`
        li {
          font-size: 1.1rem;
          line-height: 1.2;
          padding: 2rem 0;
        }
        li:not(:last-child) {
          border-bottom: 1px solid #f3f3f3;
        }
        @media only screen and (min-width: 900px) {
          li {
            display: grid;
            grid-template-columns: repeat(7, [col-start] 1fr);
            grid-gap: 20px;
          }
        }
      `}</style>
    </li>
  ));
  return (
    <DefaultLayout>
      <Head>
        <title>Writing ← Records ← Emily Dela Cruz</title>
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
        <div className="content grid--span-7">
          <ul className="reset-list">{renderWriting}</ul>
        </div>
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

export async function getServerSideProps() {
  // Fetch page
  let page;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      page = pages.filter(p => p.slug == "writing")[0];
    })
    .catch(function(error) {
      console.log("Records page error: " + error);
      page = null;
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
  const data = {
    page,
    posts
  };
  return { props: { data } };
}
