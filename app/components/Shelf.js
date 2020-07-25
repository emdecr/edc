import React from "react";
import moment from "moment";

import { renderFormat, renderHTML, getImageUrl } from "../helpers";

function referNote(item) {
  if (item.refer && item.refer != "") {
    return (
      <span mono opacity--50 fs--xs>
        Heard about it from{" "}
        <a href={rec.refer} target="_blank">
          here
        </a>
        .
        <style jsx>{`
          span {
            display: absolute;
            bottom: 0;
          }
        `}</style>
      </span>
    );
  }
}

const renderItems = items => {
  return items.map((item, index) => (
    <li key={"item-" + index} className="grid--span-3">
      <img src={getImageUrl(item)} />
      {renderFormat(item)}
      <a
        href={item.meta_box._shelf_item_link}
        target="_blank"
        className=""
        dangerouslySetInnerHTML={renderHTML(item.title.rendered)}
      ></a>
      <div className="mono opacity--50 fs--xs mt--sm">
        <span>
          {moment(item.date).fromNow()} – {moment(item.date).format("ll")}
        </span>
      </div>

      <style jsx>{`
        li {
          font-size: 1.2rem;
          line-height: 1.2;
          padding: 2rem 1rem;
          position: relative;
          border-bottom: 1px solid var(--list-border);
          overflow: hidden;
        }
        img {
          opacity: 0.03;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
        }
      `}</style>
    </li>
  ));
};

export default function Shelf(props) {
  return (
    <ul className="container--grid reset-list grid--span-all">
      {renderItems(props.items)}
      <style jsx>{`
        li {
          font-size: 1.3rem;
        }
      `}</style>
    </ul>
  );
}
