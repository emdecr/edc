import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import DefaultLayout from "../components/layouts/Default";
import { SkipNavContent } from "@reach/skip-nav";

export default function Home({ data }) {
  function renderIntro() {
    return { __html: data.content.rendered };
  }
  return (
    <DefaultLayout>
      <Head>
        <title>Emily Dela Cruz</title>
      </Head>
      {/* <Link href="#main-content">
        <a class="skip-to-content-link">Skip to content</a>
      </Link> */}
      <SkipNavContent>
        <main className="container container--grid" id="main-content">
          <div className="grid--span-all name">
            <h1>emily dela cruz</h1>
            <div>
              <a
                className="pronouns mono"
                href="https://www.mypronouns.org/she-her"
                target="_blank"
              >
                she/her
              </a>
            </div>
          </div>
          <div
            className="content grid--span-6"
            dangerouslySetInnerHTML={renderIntro()}
          ></div>
          <div className="learn-more grid--span-all mono">
            <Link href="/about">
              <a>Learn more...</a>
            </Link>
          </div>
        </main>
      </SkipNavContent>

      <style jsx>{`
        .container {
          margin-top: 4rem;
        }
        .name {
          display: flex;
          align-items: center;
        }
        .name > div {
          margin-left: 20px;
        }
        .name > div,
        .learn-more {
          font-size: 0.7rem;
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
  // console.log();
  const pages = res.data;
  const data = pages.filter(p => p.slug == "home")[0];
  // const data = await res.json();
  // Return properties
  // Pass data to the page via props
  return { props: { data } };
}
