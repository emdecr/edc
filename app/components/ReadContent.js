import { renderHTML } from "../helpers";
import Link from "next/link";
import moment from "moment";

function renderTitle(read) {
  if (read.read_title && read.read_title != "") {
    return read.read_title;
  } else {
    return read.title;
  }
}
function renderSubtitle(read) {
  if (read.read_subtitle && read.read_subtitle != "") {
    return (
      <React.Fragment>
        {": "}
        <span className="mono">
          {read.read_subtitle}
          <style jsx>{`
            span {
              display: block;
              font-size: 1rem;
              font-weight: normal;
            }
          `}</style>
        </span>
      </React.Fragment>
    );
  }
}
function renderAuthors(read) {
  if (read.authors && read.authors != "") {
    const authors = read.authors.map((a, index) => (
      <span
        key={`author-${index}`}
        className="display--b"
      >{`${a.first_name} ${a.last_name}`}</span>
    ));
    return (
      <p className="fs--sm read-stats mono">
        <span>Author(s):</span>
        <br />
        {authors}
      </p>
    );
  }
}
function renderEditors(read) {
  if (read.editors && read.editors != "") {
    const editors = read.editors.map((e, index) => (
      <span key={`editor-${index}`}>{`${e.first_name} ${e.last_name}`}</span>
    ));
    return (
      <p className="fs--sm read-stats mono">
        <span>Editor(s):</span>
        <br />
        {editors}
      </p>
    );
  }
}
function renderPublisher(read) {
  if (read.publisher && read.publisher != "") {
    return (
      <p className="fs--sm read-stats mono">
        <span>Edition Publisher:</span>
        <br />
        {read.publisher}
      </p>
    );
  }
}
function renderDate(read) {
  if (read.published_date && read.published_date != "") {
    return (
      <p className="fs--sm read-stats mono">
        <span>Edition Release:</span>
        <br />
        {moment(read.published_date).format("ll")}
      </p>
    );
  }
  if (read.published_year != "" && read.published_date == "") {
    return (
      <p className="fs--sm read-stats mono">
        <span>Edition Release:</span>
        <br />
        {read.published_year}
      </p>
    );
  }
}
function renderRating(read) {
  if (read.rating && read.rating != "") {
    return (
      <p className="fs--sm read-stats mono">
        <span>Recommendation Rating:</span>
        <br />
        {read.rating}/10
      </p>
    );
  }
}
function renderFinishDate(read) {
  if (!read.currently_reading) {
    return (
      <p className="fs--sm read-stats mono">
        <span>Finished Reading:</span>
        <br />
        {moment(read.date).format("ll")}
      </p>
    );
  }
}
function renderISBNSearch(read) {
  if (read.isbn && read.isbn != "") {
    const title =
      read.read_title && read.read_title != "" ? read.read_title : read.title;
    return (
      <p className="fs--sm read-stats mono">
        <span>Purchase Search via DuckDuckGo:</span>
        <br />
        <a
          target="_blank"
          href={`https://duckduckgo.com/?q=${title}+isbn+${read.isbn}&t=hk&ia=shopping`}
        >
          ISBN {read.isbn}
        </a>
      </p>
    );
  }
}

function renderPurchase(read) {
  if (read.purchase && read.purchase != "") {
    return (
      <p className="fs--sm read-stats mono">
        <span>Purchase:</span>
        <br />
        <a target="_blank" href={read.purchase}>
          Website
        </a>
      </p>
    );
  }
}

const renderEachNote = items => {
  return items.map((item, index) => (
    <div className="single-note mt--md" key={`note-${index}`}>
      <span className="fs--xs opacity--50 mono">
        {moment(item.date).format("ll")}
      </span>
      <h3>{item.title}</h3>
      <div dangerouslySetInnerHTML={renderHTML(item.content)}></div>
    </div>
  ));
};
function renderNotes(notes) {
  if (notes) {
    return (
      <div className="grid--span-7 grid--start-4 notes">
        <h2>Notes</h2>
        {renderEachNote(notes)}
        <hr />
      </div>
    );
  }
}

const renderRelatedReads = items => {
  return items.map((item, index) => (
    <li className="single-related mb--sm" key={`related-${index}`}>
      <img className="grid--span-1" src={item.image_url} />
      <div className="grid--span-5">
        <h4>
          <Link href={`/records/${item.slug}`}>
            <a>{item.read_title}</a>
          </Link>
        </h4>
        {renderAuthors(item)}
        {renderEditors(item)}
      </div>
      <style jsx>{`
        @media only screen and (min-width: 900px) {
          li {
            display: grid;
            grid-template-columns: repeat(7, [col-start] 1fr);
            grid-gap: 20px;
          }
          img {
            width: 100%;
            height: auto;
          }
        }
      `}</style>
    </li>
  ));
};
function renderRelated(related) {
  if (related) {
    return (
      <div className="grid--span-7 grid--start-4 related single-content">
        <h2>Referenced Reads</h2>
        <ul className="reset-list mt--sm">{renderRelatedReads(related)}</ul>
        <hr />
      </div>
    );
  }
}

export default function ReadContent({ read }) {
  return (
    <React.Fragment>
      <h1 className="grid--span-7 mt--sm mb--md">
        {renderTitle(read)}
        {renderSubtitle(read)}
      </h1>

      <div className="grid--span-2 grid--start-1">
        <img src={read.image_url} />
        {renderAuthors(read)}
        {renderEditors(read)}
        {renderFinishDate(read)}
        {renderPublisher(read)}
        {renderDate(read)}
        {renderRating(read)}
        {renderISBNSearch(read)}
        {renderPurchase(read)}
      </div>

      {renderNotes(read.notes)}

      {renderRelated(read.related)}

      <div className="grid--span-7 grid--start-4 single-content content">
        <h2 className="content__main-heading">Highlights</h2>
        <div dangerouslySetInnerHTML={renderHTML(read.content)}></div>
      </div>

      <style jsx>{`
        img {
          width: 150px;
          height: auto;
        }
        h1 {
          line-height: 1.3;
        }
        @media only screen and (min-width: 900px) {
          img {
            width: 100%;
          }
        }
      `}</style>
    </React.Fragment>
  );
}
