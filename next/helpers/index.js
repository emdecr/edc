export function renderIntro(data) {
  if (data.page !== null) {
    return { __html: data.page.content.rendered };
  } else {
    return { __html: "<p>Error loading page content.</p>" };
  }
}

export function renderHTML(content) {
  return { __html: content };
}

export function getImageUrl(i) {
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
}

export function renderFormat(i) {
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
}
