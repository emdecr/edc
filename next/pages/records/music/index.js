import Head from "next/head";
import Link from "next/link";
import DefaultLayout from "../../components/layouts/Default";

export default function Music() {
  return (
    <DefaultLayout>
      <Head>
        <title>Music – Emily Dela Cruz</title>
      </Head>

      <main className="container">
        <h1>Music</h1>
      </main>

      <style jsx>{``}</style>
    </DefaultLayout>
  );
}
