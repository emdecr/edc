import { renderHTML } from "../helpers";

export default function ReadContent({ read }) {
  function renderAuthors() {
    if (read.authors != "") {
    } else {
      return null;
    }
  }
  function renderEditors() {
    if (read.editors != "") {
    } else {
      return null;
    }
  }
  function renderPublisher() {
    if (read.publisher != "") {
    } else {
      return null;
    }
  }
  function renderDate() {
    if (read.published_date != "") {
    } else if (read.published_year != "") {
    } else {
      return null;
    }
  }
  return (
    <React.Fragment>
      <h1 className="grid--span-all">{read.title}</h1>
      <div className="grid--span-2">
        <img src={read.image_url} />
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
