import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { SkipNavContent } from "@reach/skip-nav";

import { renderHTML } from "../helpers";

import DefaultLayout from "../components/layouts/Default";

export default function Home({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title>Emily Dela Cruz</title>
      </Head>
      <SkipNavContent>
        <main className="container container--grid mt--lg" id="main-content">
          <div className="grid--span-all title flex-all flex--ai-c">
            <h1>emily dela cruz</h1>
            <div>
              <a
                className="pronouns mono fs--sm"
                href="https://www.mypronouns.org/she-her"
                target="_blank"
              >
                she/her
              </a>
            </div>
          </div>
          <div
            className="content grid--span-6"
            dangerouslySetInnerHTML={renderHTML(data.page.content.rendered)}
          ></div>
          <div className="learn-more fs--sm grid--span-all mono">
            <Link href="/about">
              <a>Learn more...</a>
            </Link>
          </div>
        </main>
      </SkipNavContent>

      <style jsx>{`
        .title > div {
          margin-left: 20px;
        }
        h1 {
          margin: 0;
          line-height: 1;
        }
      `}</style>
    </DefaultLayout>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get(
    "https://emilydelacruz.com/data/wp-json/wp/v2/pages?per_page=50"
  );
  const pages = res.data;
  const home = pages.filter(p => p.slug == "home")[0];
  const data = {
    page: home
  };

  return { props: { data } };
}
