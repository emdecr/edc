import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import axios from "axios";

import { renderIntro, renderFormat, renderHTML } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";

export default function Fit({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title>'Fit' ← About ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-ac">
          <h1>About 'Fit'</h1>
        </div>
        <div className="content grid--span-7">
          <div dangerouslySetInnerHTML={renderIntro(data)}></div>
          <div className="updated mt--md pt--sm">
            <p className="mono fs--sm fc--meta">
              Last updated: {moment(data.page.modified).format("ll")}
            </p>
          </div>
        </div>
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
        .updated {
          border-top: 1px solid var(--list-border);
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
      page = pages.filter(p => p.slug == "fit")[0];
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
