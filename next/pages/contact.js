import Head from "next/head";
import Link from "next/link";
import DefaultLayout from "../components/layouts/Default";

export default function Contact() {
  return (
    <DefaultLayout>
      <Head>
        <title>Contact – Emily Dela Cruz</title>
      </Head>

      <main className="container">
        <h1>Contact</h1>
      </main>

      <style jsx>{``}</style>
    </DefaultLayout>
  );
}
