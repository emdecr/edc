import React from "react";
import moment from "moment";
import Link from "next/link";

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

  const renderFormat = i => {
    if (i.hasOwnProperty("_embedded")) {
      if (i._embedded.hasOwnProperty("wp:term")) {
        return (
          <div>
            <span className="mono">{i._embedded["wp:term"][0][0].name}</span>
            <style jsx>{`
              div {
                line-height: 1;
                margin-bottom: 0.2rem;
              }
              span {
                font-size: 0.7rem;
                color: darkgrey;
              }
            `}</style>
          </div>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  function renderTitle(item) {
    return { __html: item.title.rendered };
  }

  const items = props.items;
  const renderItems = items.map((item, index) => (
    <li key={"item-" + index} className="grid--span-3">
      {renderFormat(item)}
      <a
        href={item.meta_box._shelf_item_link}
        target="_blank"
        className="border--none"
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
        }
        // li:first-child {
        //   padding-top: 0;
        // }
        li:not(:last-child) {
          border-bottom: 1px solid #e3e3e3;
        }
        span {
          font-size: 0.6rem;
          color: darkgrey;
        }
      `}</style>
    </li>
  ));
  return (
    <ul className="container--grid">
      {renderItems}
      <style jsx>{`
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        li {
          font-size: 1.3rem;
        }
      `}</style>
    </ul>
  );
}
