import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import axios from "axios";

import { renderHTML } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import ReadContent from "../../components/ReadContent";

function renderContent(record) {
  if (record != null) {
    if (record.type == "read") {
      return <ReadContent read={record} />;
    } else {
      return (
        <div className="grid--span-7">
          <h1 className="mb--sm">{record.title}</h1>
          <div
            className="content"
            dangerouslySetInnerHTML={renderHTML(record.content)}
          ></div>
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
            <a className="mono">Back to all Reads</a>
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
            <a className="mono">Back to all Writing</a>
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
  return (
    <DefaultLayout>
      <Head>
        <title>{record.read_title} ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all mini-nav fs--sm">
          ←
          <Link href={"/records/"}>
            <a className="mono fs--sm">Back to all Records</a>
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
