import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import DefaultLayout from "../../components/layouts/Default";
import NavAbout from "../../components/nav/NavAbout";
import Shelf from "../../components/Shelf";

export default function About({ data }) {
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
        <title>About – Emily Dela Cruz</title>
      </Head>

      <main className="container container--grid" id="main-content">
        <div className="grid--span-all name">
          <h1>About</h1>
          <NavAbout active="/about" />
        </div>
        <div
          className="content grid--start-1 grid--span-7"
          dangerouslySetInnerHTML={renderIntro()}
        ></div>
        <section className="grid--start-1 grid--span-6">
          <h2>The Link Shelf</h2>
          <Shelf items={data.shelf} />
        </section>
        <section className="grid--start-8 grid--span-5">
          <h2>Github</h2>

          <h2>Recently played...</h2>
        </section>
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
  let about;
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      about = pages.filter(p => p.slug == "about")[0];
    })
    .catch(function(error) {
      console.log("About page error: " + error);
      about = null;
    });
  // Fetch shelf
  let shelfItems;
  await axios
    .get(
      process.env.CMS_API_URL + "/wp-json/wp/v2/shelf-item?per_page=8&_embed"
    )
    .then(function(response) {
      shelfItems = response.data;
    })
    .catch(function(error) {
      console.log("Shelf error: " + error);
      shelfItems = null;
    });
  // Fetch music
  let track;
  await axios
    .get(
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
        process.env.LASTFM_USER +
        "&api_key=" +
        process.env.LASTFM_KEY +
        "&format=json&limit=1"
    )
    .then(function(response) {
      const trackName = response.data.recenttracks.track[0].name;
      const trackArtist = response.data.recenttracks.track[0].artist["#text"];
      const trackImage = response.data.recenttracks.track[0].image[1]["#text"];
      let trackInfo = {
        artist: trackArtist,
        name: trackName,
        image: trackImage
      };
      track = trackInfo;
    })
    .catch(function(error) {
      console.log("Music error: " + error);
      track = null;
    });
  // Fetch github
  let github;
  await axios
    .get("https://api.github.com/users/emdecr/events")
    .then(function(response) {
      github = response.data;
    })
    .catch(function(error) {
      github = null;
      console.log("Github error: " + error);
    });

  const data = {
    page: about,
    shelf: shelfItems,
    track: track,
    github: github
  };

  return { props: { data } };
}
