import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import axios from "axios";

import { renderIntro } from "../../helpers";

import DefaultLayout from "../../components/layouts/Default";
import NavAbout from "../../components/nav/NavAbout";

export default function AboutNow({ data }) {
  function renderTrack(track) {
    if (track) {
      return (
        <div className="music-grid mt--sm">
          <img src={track.image} alt={"Album art for " + track.name} />
          <div className="music__deats">
            <span className="mono">
              {track.artist} | {track.name}
            </span>
          </div>
          <style jsx>{`
            .music-grid {
              display: flex;
            }
            .music__deats {
              margin-left: 10px;
              font-size: 0.8rem;
            }
          `}</style>
        </div>
      );
    } else {
      return <p>Error loading track.</p>;
    }
  }
  function repoBranch(event) {
    let branchArray = event.payload.ref.split("/");
    return branchArray[2];
  }
  function repoURL(event) {
    return "https://github.com/" + event.repo.name;
  }
  function getType(event) {
    let newType = event.type.replace(/([A-Z])/g, " $1").trim();
    return newType.replace(" Event", "");
  }
  function renderGithubMessage(event) {
    if (event.type === "PushEvent") {
      return (
        <p>
          <strong>{getType(event)}</strong> | <strong>R</strong>:
          <a href={repoURL(event)} target="_blank>">
            {event.repo.name}
          </a>
          , <strong>B</strong>: {repoBranch(event)}, <strong>CM</strong>:
          <a
            href={
              "https://github.com/" +
              event.repo.name +
              "/commit/" +
              event.payload.commits[0].sha
            }
            target="_blank>"
          >
            {event.payload.commits[0].message}
          </a>
          <style jsx>{`
            p {
              font-size: 0.7rem;
              line-height: 1.6;
            }
            a {
              border-bottom: 2px solid #0071f3;
            }
          `}</style>
        </p>
      );
    } else {
      return (
        <p>
          <strong>{type(event)}</strong> | <strong>R</strong>:
          <a href={repoURL(event)} target="_blank>">
            {event.repo.name}
          </a>
          <style jsx>{`
            p {
              font-size: 0.6rem;
            }
          `}</style>
        </p>
      );
    }
  }
  function renderGithub(githubActivity) {
    if (githubActivity) {
      const listItems = githubActivity.slice(0, 5).map((item, index) => (
        <li key={"item-" + index} className="grid--span-3">
          <div className="mono">
            <span>
              {moment(item.created_at).fromNow()} –{" "}
              {moment(item.created_at).format("ll")}
            </span>
            {renderGithubMessage(item)}
          </div>
          <style jsx>{`
            li {
              font-size: 1.2rem;
              line-height: 1.2;
              padding: 1rem 0;
            }
            li:first-child {
              padding-top: 0;
            }
            li:not(:last-child) {
              border-bottom: 1px solid #e3e3e3;
            }
            span {
              font-size: 0.6rem;
              color: darkgrey;
            }
          `}</style>
        </li>
      ));
      return <ul className="reset-list">{listItems}</ul>;
    } else {
      return <p>Error loading GitHub activity.</p>;
    }
  }

  return (
    <DefaultLayout>
      <Head>
        <title>Now ← About ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid" id="main-content">
        <div className="grid--span-all name">
          <h1>About</h1>
          <NavAbout active="/about/now" />
        </div>
        <div
          className="content grid--span-7"
          dangerouslySetInnerHTML={renderIntro(data)}
        ></div>
        <div className="content grid--span-4 grid--start-9">
          <div className="mb--md">
            <h2>Recently played...</h2>
            {renderTrack(data.track)}
          </div>
          <div>
            <h2>GitHub Activity</h2>
            {renderGithub(data.github)}
          </div>
        </div>
        <div className="content grid--span-all">
          {" "}
          <h2>Learning</h2>
          <h2>Lastest from The Link Shelf</h2>
        </div>
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
  let now;
  let learning = { doing: null, done: null };
  await axios
    .get(process.env.CMS_API_URL + "wp-json/wp/v2/pages?per_page=50")
    .then(function(response) {
      const pages = response.data;
      now = pages.filter(p => p.slug == "now")[0];
      const learningContent = pages.filter(p => p.slug == "about")[0];
      learning.doing = learningContent.meta_box._page_learning;
      learning.done = learningContent.meta_box._page_learning_done;
    })
    .catch(function(error) {
      console.log("Now page error: " + error);
      now = null;
      learning = null;
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

  // Fetch shelf
  let shelfItems;
  await axios
    .get(
      process.env.CMS_API_URL + "/wp-json/wp/v2/shelf-item?per_page=4&_embed"
    )
    .then(function(response) {
      shelfItems = response.data;
    })
    .catch(function(error) {
      console.log("Shelf error: " + error);
      shelfItems = null;
    });

  const data = {
    page: now,
    learning: learning,
    track: track,
    github: github,
    shelf: shelfItems
  };

  return { props: { data } };
}
