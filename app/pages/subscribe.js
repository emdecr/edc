import Head from "next/head";
import DefaultLayout from "../components/layouts/Default";

export default function Subscribe() {
  return (
    <DefaultLayout>
      <Head>
        <title>Subscribe ← Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-c">
          <h1>You are now officially subscribed! 🎉</h1>
        </div>
        <div className="content grid--span-7">
          <p>Thanks for the support 💕</p>
        </div>
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
