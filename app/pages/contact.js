import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import { renderIntro } from "../helpers";

import DefaultLayout from "../components/layouts/Default";

export default function Contact({ data }) {
  const url = process.env.MAILCHIMP_URL;
  const SimpleForm = () => <MailchimpSubscribe url={url} />;
  return (
    <DefaultLayout>
      <Head>
        <title>Contact ← Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-c">
          <h1>Contact</h1>
        </div>
        <div
          className="content grid--span-7"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
        {/* <div className="grid--span-all">{SimpleForm()}</div> */}
      </main>

      <style jsx>{`
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
