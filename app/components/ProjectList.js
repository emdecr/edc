import React from "react";
import moment from "moment";
import Link from "next/link";

import { getImageUrl, renderHTML } from "../helpers";

function renderLink(item) {
  if (item.meta_box._project_link != "") {
    return (
      <a
        href={item.meta_box._project_link}
        target="_blank"
        dangerouslySetInnerHTML={renderHTML(item.title.rendered)}
      ></a>
    );
  } else {
    return (
      <Link href={`/projects/${item.slug}`}>
        <a dangerouslySetInnerHTML={renderHTML(item.title.rendered)}></a>
      </Link>
    );
  }
}

const renderItems = items => {
  return items.map((item, index) => (
    <li key={"item-" + index} className="grid--span-3">
      {/* <img src={getImageUrl(item)} className="mb--sm" /> */}
      {renderLink(item)}
      <style jsx>{`
        li {
          font-size: 1.2rem;
          line-height: 1.2;
          padding: 2rem 2rem 2rem 0;
          border-bottom: 1px solid var(--list-border);
        }
        span {
          font-size: 0.6rem;
          color: darkgrey;
        }
      `}</style>
    </li>
  ));
};

export default function ProjectList(props) {
  return (
    <ul className="container--grid reset-list">
      {renderItems(props.items)}
      <style jsx>{`
        li {
          font-size: 1.3rem;
        }
      `}</style>
    </ul>
  );
}
