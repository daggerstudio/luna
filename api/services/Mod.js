//==============================================================================
// MOD
//==============================================================================
module.exports = {

  slugify: function (str) {
    return str.toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '');
  },
  capitalize: function (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
  uid: function (str) {

    var clean = str.match(/\b(\w{2,})/g); // Get words larger then 1 letter
    var words = clean.join(" "); // Join the cleaned words back into a string
    var count = clean.length; // Count the amount of cleaned words

    var four = /\b(\w{4})/g; // Regex, matches four characters
    var two = /\b(\w{2})/g; // Regex, matches two characters
    var one = /\b(\w{1})/g; // Regex, matches one character

    var create = function () {
      // 1 word
      if (count === 1) {
        if (words.length <= 3) return words; // If the word is under 3 return it
        return words.match(four).join(""); // If 4+, grab the first 4 characters
      }
      // 2 Words; geat the first two characters of each word
      if (count === 2) return words.match(two).join("");

      // 3/5+ Words; get the first characters then two characters from each word
      if (count === 3 || count >= 5) {
        var hold = words.match(two);
        return hold[0].match(one) + hold[1].match(one) + hold[2].match(two);
      }
      // 4 Words; get the first character from each word (i.e abbreviation)
      if (count === 4) return words.match(one).join("");
    }

    return create().toUpperCase();
  }
};
