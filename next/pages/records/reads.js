import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import moment from "moment";

import { renderIntro, renderHTML, getImageUrl } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavRecords from "../../components/nav/NavRecords";

export default function Reads({ data }) {
  function renderAuthors(authors) {
    console.log(authors);
    if (authors.length > 1) {
      return (
        <span className="">
          {authors[0].first_name + " " + authors[0].last_name}
        </span>
      );
    }
    if (authors.length > 0) {
      return (
        <span className="">
          {authors[0].first_name + " " + authors[0].last_name}
        </span>
      );
    }
    return null;
  }
  const renderReads = data.reads.map((item, index) => (
    <li key={"item-" + index}>
      <span className="mono grid--span-1">
        {moment(item.date).format("ll")}
      </span>
      <img className="grid--span-2" src={getImageUrl(item)} />
      <div className="grid--span-4">
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
          border-bottom: 1px solid #e3e3e3;
        }
        li:not(:last-child) {
          border-bottom: 1px solid #e3e3e3;
        }
        img {
          display: block;
          width: 150px;
          height: auto;
        }
        span {
          font-size: 0.55rem;
        }
        @media only screen and (min-width: 900px) {
          li {
            display: grid;
            grid-template-columns: repeat(7, [col-start] 1fr);
            grid-gap: 20px;
          }
          img {
            width: 90%;
          }
        }
      `}</style>
    </li>
  ));
  return (
    <DefaultLayout>
      <Head>
        <title>Reads ← Records ← Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-fe">
          <h1>Records</h1>
          <NavRecords />
        </div>
        <div
          className="content grid--span-4"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
        <section className="grid--span-7 grid--start-6">
          <h2>Currently Reading</h2>
          <div className="currently mt--sm">
            <div className="grid--span-2">
              <img src={getImageUrl(data.currently)} />
            </div>
            <div className="grid--span-4">
              <h3 className="fw--normal italic">
                {data.currently.title.rendered}
              </h3>
              {renderAuthors(data.currently.meta_box._read_authors)}
            </div>
          </div>
        </section>
        <section className="grid--span-7 mt--md">
          <h2>Past Reads</h2>
          <ul className="reset-list">{renderReads}</ul>
        </section>
      </main>

      <style jsx>{`
        h1 {
          margin: 0;
          line-height: 1;
          // font-size: 0.9rem;
        }
        h3 {
          font-size: 28px;
        }
        img {
          width: 150px;
          height: auto;
        }
        @media only screen and (min-width: 900px) {
          .currently {
            display: grid;
            grid-template-columns: repeat(7, [col-start] 1fr);
            grid-gap: 20px;
          }
          img {
            width: 100%;
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
      page = pages.filter(p => p.slug == "reads")[0];
    })
    .catch(function(error) {
      console.log("Records page error: " + error);
      page = null;
    });
  // Get Reads
  let reads;
  let currently;
  await axios
    .get(process.env.CMS_API_URL + "/wp-json/wp/v2/read?per_page=100&_embed")
    .then(function(response) {
      const posts = response.data;
      reads = posts.filter((item, index, arr) => !item.flag.includes(24));
      currently = posts.filter((item, index, arr) => item.flag.includes(24))[0];
    })
    .catch(function(error) {
      console.log("Records page error: " + error);
      page = null;
      currently = null;
    });
  const data = {
    page,
    currently,
    reads
  };
  return { props: { data } };
}
