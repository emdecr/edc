import Head from "next/head";
import Link from "next/link";
import DefaultLayout from "../components/layouts/Default";

export default function Projects() {
  return (
    <DefaultLayout>
      <Head>
        <title>Projects – Emily Dela Cruz</title>
      </Head>

      <main className="container">
        <h1>Projects</h1>
      </main>

      <style jsx>{``}</style>
    </DefaultLayout>
  );
}
