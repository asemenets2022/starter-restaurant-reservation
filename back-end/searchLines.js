/*
  Given:
    a linked list of words
    a concordance
    the original data set
  Return:  
    an array of all sentences containing words in the list
*/
function searchLines(words, concordance, data) {
//   // convert words from a linked list to a regular array
//   words= words.asArray();
//   // create a set. as before we're using a set because it excludes duplicates
//   const lines = new Set();
//   for(let word of words){ // for each word
//     const conc = concordance[word]; // loop up the word's concordance
//     if(!conc){ // if the word isn't in our concordance return an empty array and exit early
//       return[];
//     }
//     for(let lineNum of conc){ // for each line number a word appears on
//       lines.add(data[lineNum]); // look up that line in data and add that string to the lines set
//     }
//   }
//   // again the tests are expecting this function to return a regular array
//   return Array.from(lines) // convert the set 'lines' into an array
// }

//time complexity - O(n) words * concordance
//space complexity - O(n) linear 

const wordsValues = wordsValuesFunc(words);

const lines = new Set();
 
for (let word of wordsValues) {
  const concValue = concordance[word];
  if(!concValue) {
    return [];
  }
  for (let lineNumber of concValue) {
    lines.add(data[lineNumber]);
  }
}
return Array.from(lines);
}


function wordsValuesFunc(words) {
  let current = words.head;
  let array = [];
  while(current) {
    array.push(current.value);
    current = current.next;
  }
  return array;
}

module.exports = searchLines;
