export const helper = {
  decodeHtmlEntity: function(str) {
    var s = str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });

    var s = s.replace("&amp;", "&");
    var s = s.replace("read more.", "");

    return s;
  },
  removeTags: function(str) {
    var n = str.replace(/(<([^>]+)>)/gi, "");
    return n;
  }
};
