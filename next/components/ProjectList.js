import React from "react";
import moment from "moment";
import Link from "next/link";

import { renderFormat } from "../helpers";

export default function ProjectList(props) {
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

  function renderLink(item) {
    if (item.meta_box._project_link != "") {
      return (
        <a
          href={item.meta_box._project_link}
          target="_blank"
          dangerouslySetInnerHTML={renderTitle(item)}
        ></a>
      );
    } else {
      return (
        <Link href={`/projects/${item.slug}`}>
          <a dangerouslySetInnerHTML={renderTitle(item)}></a>
        </Link>
      );
    }
  }

  const items = props.items;
  const renderItems = items.map((item, index) => (
    <li key={"item-" + index} className="grid--span-3">
      {/* <img src={getImageUrl(item)} className="mb--sm" /> */}
      {renderLink(item)}
      <style jsx>{`
        li {
          font-size: 1.2rem;
          line-height: 1.2;
          padding: 2rem 1rem;
          border-bottom: 1px solid #e3e3e3;
          // position: relative;
          // overflow: hidden;
        }
        span {
          font-size: 0.6rem;
          color: darkgrey;
        }
        // img {
        //   width: 100%;
        //   height: 150px;
        //   object-fit: cover;
        //   filter: grayscale(100%);
        // }
        // li:hover img,
        // li:active img,
        // li:focus img {
        //   filter: grayscale(0%);
        // }
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