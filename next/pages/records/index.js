import Head from "next/head";
import Link from "next/link";
import DefaultLayout from "../../components/layouts/Default";

export default function Records() {
  return (
    <DefaultLayout>
      <Head>
        <title>Records – Emily Dela Cruz</title>
      </Head>

      <main className="container">
        <h1>Records</h1>
      </main>

      <style jsx>{``}</style>
    </DefaultLayout>
  );
}
