import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import axios from "axios";

import { renderHTML } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import ReadContent from "../../components/ReadContent";

function renderSubtitle(record) {
  if (record.subtitle && record.subtitle != "") {
    return (
      <React.Fragment>
        {": "}
        <span className="mono opacity--50">
          {record.subtitle}
          <style jsx>{`
            span {
              margin-top: 0.3rem;
              margin-bottom: 2rem;
              display: block;
              font-size: 1rem;
              font-weight: normal;
            }
          `}</style>
        </span>
      </React.Fragment>
    );
  }
}

function renderContent(record) {
  if (record != null) {
    if (record.type == "read") {
      return <ReadContent read={record} />;
    } else {
      return (
        <div className="grid--span-7 mt--md">
          <p className="mono fs--xs opacity--50 mb--sm">
            {moment(record.date).format("ll")}
          </p>
          <h1 className="mb--sm single-title">
            {record.title}
            {renderSubtitle(record)}
          </h1>
          <div
            className="content"
            dangerouslySetInnerHTML={renderHTML(record.content)}
          ></div>
          <style jsx>{`
            @media only screen and (min-width: 2000px) {
              .grid--span-7 {
                grid-column-start: 3;
              }
            }
          `}</style>
        </div>
      );
    }
  } else {
    return <p>No post found.</p>;
  }
}
function renderBackLink(record) {
  if (record != null) {
    if (record.type == "read") {
      return (
        <React.Fragment>
          |
          <Link href={"/records/reads"}>
            <a className="mono">Back to Reads</a>
          </Link>
          <style jsx>{`
            a {
              display: inline-block;
              margin: 0 10px;
            }
          `}</style>
        </React.Fragment>
      );
    }
    if (record.type == "post") {
      return (
        <React.Fragment>
          |
          <Link href={"/records/writing"}>
            <a className="mono">Back to Writing</a>
          </Link>
          <style jsx>{`
            a {
              display: inline-block;
              margin: 0 10px;
            }
          `}</style>
        </React.Fragment>
      );
    }
  }
}

export default function SingleRecord({ data }) {
  const record = data.page != null ? data.page.data : null;
  const title = record.read_title ? record.read_title : record.title;
  return (
    <DefaultLayout>
      <Head>
        <title>{title} ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all mini-nav fs--sm">
          ←
          <Link href={"/records/"}>
            <a className="mono fs--sm">Back to Records</a>
          </Link>
          {renderBackLink(record)}
        </div>
        {renderContent(record)}
      </main>
      <style jsx>{`
        a {
          display: inline-block;
          margin: 0 10px;
        }
        .mini-nav {
          line-height: 1.2;
        }
      `}</style>
    </DefaultLayout>
  );
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  // Fetch page
  let page;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/edc/v1/slug/" + params.slug)
    .then(function(response) {
      page = response.data;
    })
    .catch(function(error) {
      console.log("Now page error: " + error);
      page = null;
    });

  const data = {
    page
  };

  return { props: { data } };
}
