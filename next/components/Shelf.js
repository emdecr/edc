import React from "react";
import moment from "moment";
import Link from "next/link";

import { renderFormat } from "../helpers";

export default function Shelf(props) {
  const getImageUrl = i => {
    if (i.hasOwnProperty("_embedded")) {
      if (
        i._embedded["wp:featuredmedia"][0]["media_details"][
          "sizes"
        ].hasOwnProperty("medium")
      ) {
        return i._embedded["wp:featuredmedia"][0]["media_details"]["sizes"][
          "medium"
        ]["source_url"];
      } else {
        return i._embedded["wp:featuredmedia"][0]["source_url"];
      }
    } else {
      return i._embedded["wp:featuredmedia"][0]["source_url"];
    }
  };

  function renderTitle(item) {
    return { __html: item.title.rendered };
  }

  const items = props.items;
  const renderItems = items.map((item, index) => (
    <li key={"item-" + index} className="grid--span-3">
      <img src={getImageUrl(item)} />
      {renderFormat(item)}
      <a
        href={item.meta_box._shelf_item_link}
        target="_blank"
        className=""
        dangerouslySetInnerHTML={renderTitle(item)}
      ></a>
      <div className="mono">
        <span>
          {moment(item.date).fromNow()} – {moment(item.date).format("ll")}
        </span>
      </div>

      <style jsx>{`
        li {
          font-size: 1.2rem;
          line-height: 1.2;
          padding: 2rem 1rem;
          border-bottom: 1px solid #e3e3e3;
          position: relative;
          overflow: hidden;
        }
        // li:first-child {
        //   padding-top: 0;
        // }
        li:not(:last-child) {
          // border-bottom: 1px solid #e3e3e3;
        }
        span {
          font-size: 0.6rem;
          color: darkgrey;
        }
        a {
          // color: #0071f3;
          // font-weight: bold;
        }
        img {
          // display: none;
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
  return (
    <ul className="container--grid reset-list">
      {renderItems}
      <style jsx>{`
        li {
          font-size: 1.3rem;
        }
      `}</style>
    </ul>
  );
}
