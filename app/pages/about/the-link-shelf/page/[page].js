import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

import { renderIntro } from "../../../../helpers";

import DefaultLayout from "../../../../components/layouts/Default";
import NavAbout from "../../../../components/nav/NavAbout";
import Shelf from "../../../../components/Shelf";

function renderShelfPagination(currentPage, totalItems, totalPages) {
  if (currentPage === totalPages) {
    return (
      <div className="flex flex--ai-c flex--jc-c grid--span-all">
        <Link href={`/about/the-link-shelf/page/${totalPages - 1}`}>
          <a className="btn btn--ghost fs--sm mono">Previous Page</a>
        </Link>
        <style jsx>{`
          a {
            width: 30%;
            text-align: center;
            margin: 1rem 0.5rem;
          }
        `}</style>
      </div>
    );
  } else if (currentPage == 2) {
    return (
      <div className="flex flex--ai-c flex--jc-c grid--span-all">
        <Link href="/about/the-link-shelf/">
          <a className="btn btn--ghost fs--sm mono">Previous Page</a>
        </Link>
        <Link href={`/about/the-link-shelf/page/${currentPage + 1}`}>
          <a className="btn btn--ghost fs--sm mono">Next Page</a>
        </Link>
        <style jsx>{`
          a {
            width: 30%;
            text-align: center;
            margin: 1rem 0.5rem;
          }
        `}</style>
      </div>
    );
  } else if (currentPage < totalPages && currentPage > 1) {
    return (
      <div className="flex flex--ai-c flex--jc-c grid--span-all">
        <Link href={`/about/the-link-shelf/page/${currentPage - 1}`}>
          <a className="btn btn--ghost fs--sm mono">Previous Page</a>
        </Link>
        <Link href={`/about/the-link-shelf/page/${currentPage + 1}`}>
          <a className="btn btn--ghost fs--sm mono">Next Page</a>
        </Link>
        <style jsx>{`
          a {
            width: 30%;
            text-align: center;
            margin: 1rem 0.5rem;
          }
        `}</style>
      </div>
    );
  }
}

export default function AboutTheShelf({ data }) {
  const router = useRouter();
  const { page } = router.query;
  return (
    <DefaultLayout>
      <Head>
        <title>The Link Shelf ← About ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-fe">
          <h1>The Link Shelf</h1>
          <NavAbout />
        </div>
        <div
          className="content grid--span-7"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
        <section className="grid--span-all">
          <Shelf items={data.shelf} />
        </section>
        {renderShelfPagination(+page, data.totalItems, data.totalPages)}
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
export async function getServerSideProps({ params }) {
  const offset = (params.page - 1) * 52;
  // Fetch page
  let shelfPage;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      shelfPage = pages.filter(p => p.slug == "the-shelf")[0];
    })
    .catch(function(error) {
      console.log("About page error: " + error);
      shelfPage = null;
    });
  // Fetch shelf
  let shelfItems;
  let totalItems;
  let totalPages;
  await axios
    .get(
      process.env.CMS_API_URL +
        "/wp-json/wp/v2/shelf-item?per_page=52&offset=" +
        offset +
        "&_embed"
    )
    .then(function(response) {
      const totalItemsCount = response.headers["x-wp-total"];
      totalItems = +totalItemsCount;
      const totalPagesCount = response.headers["x-wp-totalpages"];
      totalPages = +totalPagesCount;
      shelfItems = response.data;
    })
    .catch(function(error) {
      console.log("Shelf error: " + error);
      shelfItems = null;
      totalItems = false;
      totalPages = false;
    });

  const data = {
    page: shelfPage,
    shelf: shelfItems,
    totalItems,
    totalPages
  };

  return { props: { data } };
}
