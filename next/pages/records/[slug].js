import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import axios from "axios";

import { renderHTML } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavRecords from "../../components/nav/NavRecords";

export default function SingleRecord({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title> ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-ac">
          <h1>Records</h1>
          <NavRecords />
        </div>
        {/* <div
          className="content grid--span-7"
          dangerouslySetInnerHTML={renderIntro(data.page)}
        ></div> */}
      </main>

      <style jsx>{`
        h1 {
          margin: 0;
          line-height: 1;
        }
        span {
          font-size: 0.6rem;
          color: darkgrey;
        }
      `}</style>
    </DefaultLayout>
  );
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  console.log(params);
  // Fetch page
  let page;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
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
