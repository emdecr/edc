import { renderHTML } from "../helpers";
import moment from "moment";

export default function ReadContent({ read }) {
  function renderTitle() {
    if (read.read_title && read.read_title != "") {
      return read.read_title;
    } else {
      return read.title;
    }
  }
  function renderSubtitle() {
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
  function renderAuthors() {
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
  function renderEditors() {
    if (read.editors && read.editors != "") {
      const authors = read.editors.map(e => (
        <span>{`${e.first_name} ${e.last_name}`}</span>
      ));
      return (
        <p className="fs--sm read-stats mono">
          <span>Editor(s):</span>
          <br />
          {authors}
        </p>
      );
    }
  }
  function renderPublisher() {
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
  function renderDate() {
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
  function renderRating() {
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
  function renderFinishDate() {
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
  function renderISBNSearch() {
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
  return (
    <React.Fragment>
      <h1 className="grid--span-7 mt--sm mb--md">
        {renderTitle()}
        {renderSubtitle()}
      </h1>

      <div className="grid--span-2 grid--start-1">
        <img src={read.image_url} />
        {renderAuthors()}
        {renderEditors()}
        {renderFinishDate()}
        {renderPublisher()}
        {renderDate()}
        {renderRating()}
        {renderISBNSearch()}
      </div>

      <div
        className="grid--span-7 grid--start-4 single-content"
        dangerouslySetInnerHTML={renderHTML(read.content)}
      ></div>
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