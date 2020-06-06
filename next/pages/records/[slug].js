import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import axios from "axios";

import { renderHTML } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import ReadContent from "../../components/ReadContent";

export default function SingleRecord({ data }) {
  const record = data.page != null ? data.page.data : null;
  function renderContent() {
    if (data.page != null) {
      if (record.type == "read") {
        return <ReadContent read={record} />;
      } else {
        return (
          <div
            className="content grid--span-7"
            dangerouslySetInnerHTML={renderHTML(record.content)}
          ></div>
        );
      }
    } else {
      return <p>No post found.</p>;
    }
  }
  return (
    <DefaultLayout>
      <Head>
        <title>{record.title} ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-ac">
          ←{" "}
          <Link href={"/records/"}>
            <a>Back to all records</a>
          </Link>{" "}
          |{" "}
          <Link href={"/records/reads"}>
            <a>Back to all reads</a>
          </Link>
        </div>
        {renderContent()}
      </main>

      <style jsx>{`
        a {
          display: inline-block;
          margin: 0 10px;
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
