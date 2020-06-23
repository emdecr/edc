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
    if (i._embedded.hasOwnProperty("wp:featuredmedia")) {
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
      return "/placeholder.png";
    }
  } else {
    return "/placeholder.png";
  }
}

export function renderFormat(i) {
  if (i.hasOwnProperty("_embedded")) {
    if (i._embedded.hasOwnProperty("wp:term")) {
      return (
        <div>
          <span className="mono opacity--50 fs--sm">
            {i._embedded["wp:term"][0][0].name}
          </span>
        </div>
      );
    }
  }
}
