/*
 Given an array of sentences making up a body of text,
 output a concordance of words that appear in the text.
 If the same word appears multiple times on a line it should
 list the line only once.
*/
function concordance(data) {
  const result = {};

  data.forEach((line, index) => {
    line.toLowerCase().split(/[\s.,';]/).filter(word => word.length > 0)
    .forEach((word) => {
      if(!result[word]) {
        result[word] = new Set();
      }
      result[word].add(index);
    });
  });

  for(let word in result) {
    result[word] = Array.from(result[word]);
  }
  return result;
}


module.exports = concordance;

//time complexity = 0(n^2) exponential OR O(n)
//space complexity - 0(n) linear space

