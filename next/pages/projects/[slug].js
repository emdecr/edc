import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import axios from "axios";

import { renderHTML } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";

export default function SingleProject({ data }) {
  function renderContent() {
    if (data.page != null) {
      return (
        <React.Fragment>
          <h1
            className="mt--md"
            dangerouslySetInnerHTML={renderHTML(data.page.data.title)}
          ></h1>
          <div
            className="content"
            dangerouslySetInnerHTML={renderHTML(data.page.data.content)}
          ></div>
        </React.Fragment>
      );
    } else {
      return <p>No post found.</p>;
    }
  }
  return (
    <DefaultLayout>
      <Head>
        <title> ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-ac mono fs--sm">
          ←{" "}
          <Link href={"/records/"}>
            <a>Back to all Projects</a>
          </Link>
        </div>
        <div className="grid--span-7 ">{renderContent()}</div>
      </main>

      <style jsx>{`
        a {
          display: inline-block;
          margin: 0 10px;
        }
        .single-content img {
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
