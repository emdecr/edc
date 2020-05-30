import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import DefaultLayout from "../../components/layouts/Default";
import NavAbout from "../../components/nav/NavAbout";

export default function About({ data }) {
  function renderIntro() {
    return { __html: data.content.rendered };
  }
  return (
    <DefaultLayout>
      <Head>
        <title>About – Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid" id="main-content">
        <div className="grid--span-all name">
          <h1>About</h1>
          <NavAbout active="/about" />
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
  const data = pages.filter(p => p.slug == "about")[0];
  // const data = await res.json();
  // Return properties
  // Pass data to the page via props
  return { props: { data } };
}
