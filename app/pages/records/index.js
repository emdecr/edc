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
      <span className="mono fs--xs grid--span-4 opacity--30">
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
          padding: 1.5rem 0;
        }
        li:not(:last-child) {
          border-bottom: 1px solid var(--list-border);
        }
        @media only screen and (max-width: 500px) {
          li:first-child {
            padding-top: 0;
          }
        }
        @media only screen and (min-width: 700px) {
          li {
            display: grid;
            grid-template-columns: repeat(4, [col-start] 1fr);
            grid-gap: 20px;
            padding: 2rem 0;
          }
        }
      `}</style>
    </li>
  ));
  function renderTitle(item) {
    if (item.meta_box._read_title && item.meta_box._read_title != "") {
      return (
        <Link href={"/records/" + item.slug}>
          <a
            dangerouslySetInnerHTML={renderHTML(item.meta_box._read_title)}
          ></a>
        </Link>
      );
    } else {
      return (
        <Link href={"/records/" + item.slug}>
          <a dangerouslySetInnerHTML={renderHTML(item.title.rendered)}></a>
        </Link>
      );
    }
  }
  function renderAuthors(item) {
    if (item.meta_box._read_authors && item.meta_box._read_authors.length > 0) {
      const authors = item.meta_box._read_authors.map((a, index) => (
        <span
          key={`author-${index}`}
          className="display--b"
        >{`${a.first_name} ${a.last_name}`}</span>
      ));
      return <p className="fs--sm mono opacity--50">{authors}</p>;
    } else {
      return null;
    }
  }
  const renderReads = data.reads.map((item, index) => (
    <li key={"item-" + index}>
      <span className="mono fs--xs grid--span-4 opacity--30">
        {moment(item.date).format("ll")}
      </span>
      <img className="grid--span-1" src={getImageUrl(item)} />
      <div className="grid--span-3">
        <h3 className="fw--normal italic">{renderTitle(item)}</h3>
        {renderAuthors(item)}
      </div>
      <style jsx>{`
        li {
          font-size: 1.1rem;
          line-height: 1.2;
          padding: 1.5rem 0;
        }
        li:not(:last-child) {
          border-bottom: 1px solid var(--list-border);
        }
        img {
          display: block;
          width: 150px;
          height: auto;
        }
        @media only screen and (max-width: 500px) {
          li:first-child {
            padding-top: 0;
          }
        }
        @media only screen and (max-width: 700px) {
          h3,
          img {
            margin-top: 1rem;
          }
        }
        @media only screen and (min-width: 700px) {
          li {
            display: grid;
            grid-template-columns: repeat(4, [col-start] 1fr);
            grid-gap: 20px;
            padding: 2rem 0;
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
        <title>Records ← Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-c">
          <h1>Records</h1>
          <NavRecords />
        </div>
        <div
          className="content content-intro grid--span-6"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
        <div className="grid--span-4 grid--start-1 mb--lg">
          <h2>Writing</h2>
          <ul className="reset-list">{renderWriting}</ul>
          {/* <Link href="/records/writing">
            <a className="btn mt--md">View all</a>
          </Link> */}
        </div>
        <div className="grid--span-4 mb--lg">
          <h2>Reads</h2>
          <ul className="reset-list">{renderReads}</ul>
          <Link href="/records/reads">
            <a className="btn btn--ghost fs--xs opacity--80 mono">View all</a>
          </Link>
        </div>
        <div className="grid--span-4 mb--lg">
          <h2>Music</h2>
          <p>Coming soon...hopefully.</p>
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
        "wp-json/wp/v2/read?per_page=50&order=desc&_embed"
    )
    .then(function(response) {
      const allReads = response.data;
      const remove = allReads.filter(
        (item, index, arr) => !item.flag.includes(24)
      );
      reads = remove.slice(0, 5);
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
