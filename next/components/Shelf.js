import React from "react";
import moment from "moment";

export default function Shelf(props) {
  const image = i => {
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
  const renderOverlayIndicator = item => {
    if (!item.content.rendered) {
      return null;
    }
    return (
      <div className="reaction-indicator">
        <span className="material-icons">textsms</span>
      </div>
    );
  };
  const renderOverlayContent = content => {
    return { __html: content };
  };
  const renderOverlay = item => {
    if (!item.content.rendered) {
      return null;
    }
    return (
      <div className="reaction-overlay mono">
        <div
          dangerouslySetInnerHTML={renderOverlayContent(item.content.rendered)}
        ></div>
      </div>
    );
  };

  const items = props.items;
  const renderItems = items.map((item, index) => (
    <li
      className="grid--span-3 shelf-item flex-all flex--col flex--jc-fe flex--ai-c tdec--none"
      key={"item-" + index}
    >
      <a
        href={item.meta_box._shelf_item_link}
        target="_blank"
        className="border--none"
      >
        <div className="shelf-item__content text-align--c">
          <span
            className="text-align--c bold"
            v-html="item.title.rendered"
          ></span>
          <img src={image(item)} alt={item.title.rendered} />
        </div>
        <div className="shelf-item__bottom"></div>
        <span className="text-align--c time-ago">
          Added {moment(item.date).fromNow()} on
          <br />
          {moment(item.date).format("ll")}
        </span>
        {renderOverlayIndicator(item)}
        {renderOverlay(item)}
      </a>
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
      `}</style>
    </ul>
  );
}
