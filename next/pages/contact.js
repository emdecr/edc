import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import DefaultLayout from "../components/layouts/Default";

export default function Contact({ data }) {
  function renderIntro() {
    if (data.page !== null) {
      return { __html: data.page.content.rendered };
    } else {
      return { __html: "<p>Error loading page content.</p>" };
    }
  }
  return (
    <DefaultLayout>
      <Head>
        <title>Contact – Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid" id="main-content">
        <div className="grid--span-all name">
          <h1>Contact</h1>
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
  // Fetch page
  let contact;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      contact = pages.filter(p => p.slug == "contact")[0];
    })
    .catch(function(error) {
      console.log("Contact page error: " + error);
      contact = null;
    });
  const data = {
    page: contact
  };
  return { props: { data } };
}
