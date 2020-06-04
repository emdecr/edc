import { renderHTML } from "../helpers";

export default function ReadContent({ read }) {
  return (
    <React.Fragment>
      <h1>{read.title}</h1>
      <div dangerouslySetInnerHTML={renderHTML(read.content)}></div>
    </React.Fragment>
  );
}
