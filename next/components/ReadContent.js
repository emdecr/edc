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
  function renderAuthors() {
    if (read.authors && read.authors != "") {
      const authors = read.authors.map((a, index) => (
        <span key={`author-${index}`}>{`${a.first_name} ${a.last_name}`}</span>
      ));
      return (
        <p className="fs--sm read-stats mono">
          <span>Author(s):</span>
          <br />
          {authors}
        </p>
      );
    } else {
      return null;
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
    } else {
      return null;
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
    } else {
      return null;
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
    } else if (read.published_year != "") {
      return (
        <p className="fs--sm read-stats mono">
          <span>Edition Release:</span>
          <br />
          {read.published_year}
        </p>
      );
    } else {
      return null;
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
    } else {
      return null;
    }
  }
  function renderISBNSearch() {
    if (read.isbn && read.isbn != "") {
      return (
        <p className="fs--sm read-stats mono">
          <span>Search for purchase:</span>
          <br />
          <a
            href={`https://duckduckgo.com/?q=isbn+${read.isbn}&t=hk&ia=shopping`}
          >
            ISBN: {read.isbn}
          </a>
        </p>
      );
    } else {
      return null;
    }
  }
  return (
    <React.Fragment>
      <h1 className="grid--span-7">{renderTitle()}</h1>
      <div className="grid--span-2 grid--start-1">
        <img src={read.image_url} />
        {renderAuthors()}
        {renderEditors()}
        {renderPublisher()}
        {renderDate()}
        {renderRating()}
        {renderISBNSearch()}
      </div>

      <div
        className="grid--span-7 grid--start-4"
        dangerouslySetInnerHTML={renderHTML(read.content)}
      ></div>
      <style jsx>{`
        img {
          width: 100%;
          height: auto;
        }
      `}</style>
    </React.Fragment>
  );
}
