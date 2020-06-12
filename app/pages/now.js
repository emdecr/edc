import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import axios from "axios";

import { renderIntro, renderFormat, renderHTML, getImageUrl } from "../helpers";

import DefaultLayout from "../components/layouts/Default";
import NavAbout from "../components/nav/NavAbout";

function renderTrack(track) {
  if (track) {
    const string = track.artist + " " + track.name;
    const searchString = string.replace(/\s/g, "+");
    return (
      <div className="music-grid mt--sm flex-all flex--ai-c">
        <img
          className="grid--span-1"
          src={track.image}
          alt={"Album art for " + track.name}
        />
        <div className="music__deats grid--span-3">
          <a
            href={`https://www.youtube.com/results?search_query=${searchString}`}
            target="_blank"
          >
            "{track.name}" by {track.artist}
          </a>
        </div>
        <style jsx>{`
          .music-grid {
            display: grid;
            grid-template-columns: repeat(4, [col-start] 1fr);
            grid-gap: 20px;
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
function commentURL(event) {
  return `https://github.com/${event.repo.name}/commit/${event.payload.comment.commit_id}#commitcomment-${event.payload.comment.id}`;
}
function getType(event) {
  let newType = event.type.replace(/([A-Z])/g, " $1").trim();
  return newType.replace(" Event", "");
}
function renderGithubMessage(event) {
  if (event.type === "PushEvent") {
    function commitMessage(message) {
      let split = message.split("\n");
      return split[0];
    }
    return (
      <p>
        <strong className="mono">{getType(event)}</strong> | <strong>R</strong>:{" "}
        <a href={repoURL(event)} target="_blank>">
          {event.repo.name}
        </a>
        , <strong>B</strong>: {repoBranch(event)}, <strong>CM</strong>:{" "}
        <a
          href={
            "https://github.com/" +
            event.repo.name +
            "/commit/" +
            event.payload.commits[0].sha
          }
          target="_blank>"
        >
          {commitMessage(event.payload.commits[0].message)}
        </a>
        <style jsx>{`
          p {
            font-size: 0.7rem;
            line-height: 1.6;
          }
          a {
            border-bottom: 2px solid var(--link-main);
          }
        `}</style>
      </p>
    );
  } else if (event.type === "CommitCommentEvent") {
    return (
      <p>
        <strong className="mono">{getType(event)}</strong> | <strong>R</strong>:{" "}
        <a href={repoURL(event)} target="_blank>">
          {event.repo.name}
        </a>
        , <strong>CC</strong>:{" "}
        <a href={commentURL(event)} target="_blank>">
          {event.payload.comment.id}
        </a>
        <style jsx>{`
          p {
            font-size: 0.7rem;
            line-height: 1.6;
          }
          a {
            border-bottom: 2px solid var(--link-main);
          }
        `}</style>
      </p>
    );
  } else {
    return (
      <p>
        <strong className="mono">{getType(event)}</strong> | <strong>R</strong>:
        <a href={repoURL(event)} target="_blank>">
          {event.repo.name}
        </a>
        <style jsx>{`
          p {
            font-size: 0.7rem;
            line-height: 1.6;
          }
          a {
            border-bottom: 2px solid var(--link-main);
          }
        `}</style>
      </p>
    );
  }
}
function renderGithub(githubActivity) {
  if (githubActivity) {
    const listItems = githubActivity.slice(0, 3).map((item, index) => (
      <li key={"item-" + index} className="grid--span-3">
        <div className="">
          <span className="mono">
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
          span {
            font-size: 0.6rem;
            color: darkgrey;
          }
          li:not(:last-child) {
            border-bottom: 1px solid var(--list-border);
          }
        `}</style>
      </li>
    ));
    return <ul className="reset-list">{listItems}</ul>;
  } else {
    return <p>Error loading GitHub activity.</p>;
  }
}
function renderAuthors(authors) {
  if (authors.length > 1) {
    const authorList = authors.map((a, index) => (
      <span
        key={`author-${index}`}
        className="display--b mono fs--md"
      >{`${a.first_name} ${a.last_name}`}</span>
    ));
    return <div className="mt--sm">{authorList}</div>;
  }
  if (authors.length > 0) {
    return (
      <span className="display--b mono fs--md mt--sm">
        {authors[0].first_name + " " + authors[0].last_name}
      </span>
    );
  }
  return null;
}
function renderSubtitle(item) {
  if (item.meta_box._read_subtitle && item.meta_box._read_subtitle != "") {
    return (
      <React.Fragment>
        {": "}
        <span className="mono">
          {item.meta_box._read_subtitle}
          <style jsx>{`
            span {
              margin-top: 0.5rem;
              display: block;
              font-size: 0.7rem;
              font-weight: normal;
              line-height: 1.5;
              color: grey;
            }
          `}</style>
        </span>
      </React.Fragment>
    );
  } else {
    return null;
  }
}
function renderTitle(item) {
  if (item.meta_box._read_title && item.meta_box._read_title != "") {
    return item.meta_box._read_title;
  } else {
    return item.title.rendered;
  }
}

function renderRead(read) {
  if (read) {
    return (
      <div className="mb--md read-container">
        <h2 className="grid--span-4">Reading</h2>
        <img className="grid--span-1" src={getImageUrl(read)} />
        <div className="grid--span-3">
          <h3 className="fw--normal italic">
            {renderTitle(read)}
            {renderSubtitle(read)}
          </h3>
          {renderAuthors(read.meta_box._read_authors)}
        </div>
        <style jsx>{`
          .read-container {
            display: grid;
            grid-template-columns: repeat(4, [col-start] 1fr);
            grid-gap: 20px;
          }
          img {
            width: 100%;
            height: auto;
          }
        `}</style>
      </div>
    );
  } else {
    return null;
  }
}

export default function AboutNow({ data }) {
  return (
    <DefaultLayout>
      <Head>
        <title>Now ← About ← Emily Dela Cruz</title>
      </Head>
      <main className="container container--grid mt--lg" id="main-content">
        <div className="grid--span-all title flex-all flex--ai-ac">
          <h1>Now</h1>
          <NavAbout />
        </div>
        <div className="content grid--span-7">
          <div dangerouslySetInnerHTML={renderIntro(data)}></div>
          <div className="updated mt--md pt--sm">
            <p className="mono fs--sm fc--meta">
              Last updated: {moment(data.page.modified).format("ll")}
            </p>
          </div>
        </div>
        <div className="grid--span-4 grid--start-9">
          <div className="mb--md">
            <h2>Recently Played</h2>
            {renderTrack(data.track)}
          </div>
          <div className="mb--md">
            <h2 className="mb--sm">The Link Shelf Latest</h2>
            {renderFormat(data.shelf)}
            <a
              href={data.shelf.meta_box._shelf_item_link}
              target="_blank"
              className=""
              dangerouslySetInnerHTML={renderHTML(data.shelf.title.rendered)}
            ></a>
            <div className="mono">
              <span>
                {moment(data.shelf.date).fromNow()} –{" "}
                {moment(data.shelf.date).format("ll")}
              </span>
            </div>
            <Link href="/about/the-link-shelf">
              <a className="btn btn--ghost fs--xs mt--sm mono">
                View The Link Shelf
              </a>
            </Link>
          </div>
          {renderRead(data.read)}
          <div>
            <h2>GitHub Activity</h2>
            {renderGithub(data.github)}
          </div>
        </div>
      </main>

      <style jsx>{`
        h1 {
          margin: 0;
          line-height: 1;
        }
        span {
          font-size: 0.6rem;
          color: darkgrey;
        }
        .updated {
          border-top: 1px solid var(--list-border);
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
      process.env.CMS_API_URL + "/wp-json/wp/v2/shelf-item?per_page=1&_embed"
    )
    .then(function(response) {
      shelfItems = response.data[0];
    })
    .catch(function(error) {
      console.log("Shelf error: " + error);
      shelfItems = null;
    });

  // Fetch Current Read
  let currently;
  await axios
    .get(process.env.CMS_API_URL + "/wp-json/wp/v2/read?per_page=10&_embed")
    .then(function(response) {
      const posts = response.data;
      const reads = posts.filter((item, index, arr) => item.flag.includes(24));
      if (reads.length > 0) {
        currently = reads[0];
      } else {
        currently = null;
      }
    })
    .catch(function(error) {
      console.log("Records page error: " + error);
      currently = null;
    });

  const data = {
    page: now,
    learning: learning,
    track: track,
    github: github,
    shelf: shelfItems,
    read: currently
  };

  return { props: { data } };
}
