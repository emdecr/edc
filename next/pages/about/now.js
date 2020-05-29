import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import DefaultLayout from "../../components/layouts/Default";

export default function AboutNow({ data }) {
  function renderIntro() {
    return { __html: data.content.rendered };
  }
  return (
    <DefaultLayout>
      <Head>
        <title>About – Now – Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid" id="main-content">
        <div className="grid--span-all name">
          <h1>About – Now</h1>
          <nav className="mono">
            <Link href="/about">
              <a>General</a>
            </Link>
            <Link href="/about/now">
              <a>Now</a>
            </Link>

            <a href="https://emilydelacruz.com/life-overview" target="_blank">
              Life Overview
            </a>
          </nav>
        </div>
        <div
          className="content grid--span-7"
          dangerouslySetInnerHTML={renderIntro()}
        ></div>
      </main>

      <style jsx>{`
        .container {
          margin-top: 4rem;
        }
        .name {
          display: flex;
          align-items: center;
        }
        .name > nav {
          margin-left: 20px;
        }
        .name > nav,
        .learn-more {
          font-size: 0.7rem;
        }
        h1 {
          margin: 0;
          line-height: 1;
        }
        nav a:not(:last-of-type) {
          margin-right: 20px;
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
  const data = pages.filter(p => p.slug == "now")[0];
  // const data = await res.json();
  // Return properties
  // Pass data to the page via props
  return { props: { data } };
}
