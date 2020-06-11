import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import moment from "moment";

import { renderIntro, renderHTML, getImageUrl } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavRecords from "../../components/nav/NavRecords";

export default function Reads({ data }) {
  function renderAuthors(authors) {
    if (authors.length > 1) {
      const authorList = authors.map((a, index) => (
        <span
          key={`author-${index}`}
          className="display--b mono fs--md"
        >{`${a.first_name} ${a.last_name}`}</span>
      ));
      return <div className="mt--sm">{authorList}</div>;
    }
    if (authors.length > 0) {
      return (
        <span className="display--b mono fs--md mt--sm">
          {authors[0].first_name + " " + authors[0].last_name}
        </span>
      );
    }
    return null;
  }
  function renderEditors(editors) {
    if (editors.length > 1) {
      const editorList = editors.map((e, index) => (
        <span
          key={`author-${index}`}
          className="display--b mono fs--md"
        >{`${e.first_name} ${e.last_name}`}</span>
      ));
      return <div className="mt--sm">{editorList}</div>;
    }
    if (editors.length > 0) {
      return (
        <span className="display--b mono fs--md mt--sm">
          {editors[0].first_name + " " + editors[0].last_name}
        </span>
      );
    }
    return null;
  }
  function renderSubtitle(item) {
    if (item.meta_box._read_subtitle && item.meta_box._read_subtitle != "") {
      return (
        <React.Fragment>
          {": "}
          <span className="mono">
            {item.meta_box._read_subtitle}
            <style jsx>{`
              span {
                margin-top: 0.5rem;
                display: block;
                font-size: 0.7rem;
                font-weight: normal;
                line-height: 1.5;
                color: grey;
              }
            `}</style>
          </span>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
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
  const renderReads = data.reads.map((item, index) => (
    <li key={"item-" + index} className="grid--span-6">
      <span className="mono fs--xs grid--span-6">
        {moment(item.date).format("ll")}
      </span>
      <img className="grid--span-2" src={getImageUrl(item)} />
      <div className="grid--span-3">
        <h3 className="fw--normal italic">
          {renderTitle(item)}
          {renderSubtitle(item)}
        </h3>
        {renderEditors(item.meta_box._read_editors)}
        {renderAuthors(item.meta_box._read_authors)}
      </div>
      <style jsx>{`
        li {
          font-size: 1.1rem;
          line-height: 1.2;
          padding: 2rem 0;
        }
        li:not(:last-child) {
          border-bottom: 1px solid var(--list-border);
        }
        img {
          display: block;
          width: 150px;
          height: auto;
        }
        @media only screen and (max-width: 900px) {
          h3,
          img {
            margin-top: 1rem;
          }
        }
        @media only screen and (min-width: 900px) {
          li {
            display: grid;
            grid-template-columns: repeat(6, [col-start] 1fr);
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
          <h1>Reads</h1>
          <NavRecords />
        </div>
        <div
          className="content grid--span-5"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
        <section className="currently grid--span-6 grid--start-7">
          {/* NTS: If there's more than one post tagged with CR, just show as a normal list without cover image */}
          <h2 className="grid--span-6">Currently Reading</h2>
          <div className="grid--span-2 mt--sm">
            <img src={getImageUrl(data.currently)} />
          </div>
          <div className="grid--span-4 mt--sm">
            <h3 className="fw--normal italic">
              {renderTitle(data.currently)}
              {renderSubtitle(data.currently)}
            </h3>
            {renderAuthors(data.currently.meta_box._read_authors)}
          </div>
        </section>
        <section className="grid--span-all mt--md">
          <h2>Past Reads</h2>
          <ul className="reset-list container--grid">{renderReads}</ul>
        </section>
      </main>

      <style jsx>{`
        h1,
        h2 {
          margin: 0;
          line-height: 1;
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
            grid-template-columns: repeat(6, [col-start] 1fr);
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
      reads = null;
      currently = null;
    });
  const data = {
    page,
    currently,
    reads
  };
  return { props: { data } };
}
