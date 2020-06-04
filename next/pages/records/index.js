import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import moment from "moment";

import { renderIntro, renderHTML, getImageUrl } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavRecords from "../../components/nav/NavRecords";

export default function Records({ data }) {
  const renderWriting = data.posts.map((item, index) => (
    <li key={"item-" + index}>
      <span className="mono fs--xs grid--span-4">
        {moment(item.date).format("ll")}
      </span>
      <div className="grid--span-3">
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
            grid-template-columns: repeat(4, [col-start] 1fr);
            grid-gap: 20px;
          }
        }
      `}</style>
    </li>
  ));
  const renderReads = data.reads.map((item, index) => (
    <li key={"item-" + index}>
      <span className="mono fs--xs grid--span-4">
        {moment(item.date).format("ll")}
      </span>
      <img className="grid--span-1" src={getImageUrl(item)} />
      <div className="grid--span-3">
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
        img {
          display: block;
          width: 150px;
          height: auto;
        }
        @media only screen and (min-width: 900px) {
          li {
            display: grid;
            grid-template-columns: repeat(4, [col-start] 1fr);
            grid-gap: 20px;
          }
          img {
            width: 100%;
          }
        }
      `}</style>
    </li>
  ));
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
          className="content content-intro grid--span-7"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
        <div className="grid--span-4 grid--start-1">
          <h2>Writing</h2>
          <ul className="reset-list">{renderWriting}</ul>
          {/* <Link href="/records/writing">
            <a className="btn mt--md">View all</a>
          </Link> */}
        </div>
        <div className="grid--span-4">
          <h2>Reads</h2>
          <ul className="reset-list">{renderReads}</ul>
          <Link href="/records/reads">
            <a className="btn mt--md">View all</a>
          </Link>
        </div>
        <div className="grid--span-4">
          <h2>Music</h2>
          <p>Coming soon.</p>
          {/* <Link href="/records/music">
            <a className="btn mt--md">View all</a>
          </Link> */}
        </div>
      </main>

      <style jsx>{`
        h1 {
          margin: 0;
          line-height: 1;
        }
        .btn {
          padding: 0.5rem 2rem;
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
        "wp-json/wp/v2/read?per_page=5&order=desc&_embed"
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
