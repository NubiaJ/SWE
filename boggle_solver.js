/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */


var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['O', 'N', 'T', 'A']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

exports.findAllSolutions = function (grid, dictionary) {
  let solutionsSet = new Array();
  let solutions = [];

  if (grid == null || dictionary == null) { 
    return solutions;
  }

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].length != grid.length) {
      return solutions;
    }
  }

  convertToLowerCase(grid, dictionary)
  let trie = new Set(dictionary);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      let visited = new Array(grid.length).fill(false).map(() => new Array(grid.length).fill(false));
      let word = [];
  findWords(word, grid, trie, x, y, visited, solutionsSet);
    }
  }
  solutions = Array.from(solutionsSet);
  return solutions;
}

function findWords(word, grid, trie, y, x, visited, solutionsSet) { //this is the recursive call
  const adjacent_lookup = [[-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1]];

//given a word and grid[y][x] and visited[y][x]
// it already visited grid [y][x]

  if (y < 0 || y >= grid.length || x < 0 || x >= grid.length || visited[y][x] == true)
  return;

  word += grid[y][x]; 

  if (isPrefix(trie, word)) {
    visited[y][x] = true;

    if (isWord(trie, word)) {
      solutionsSet.push(word);
    }

    for (let i = 0; i < 8; i++) {
      findWords(word, grid, trie, y + adjacent_lookup[i][0], x + adjacent_lookup[i][1], visited, solutionsSet);
    }
  }

visited[y][x] = false;

  }

//will return true if prefix is found in the trie
function isPrefix(trie, word) { //O(N) operation

  for (let tword of trie) {

  if (tword.substr(0, word.length) == word) {
    return true;
    }
  }
return false;
}

//returns true if word is found in the trie
function isWord(trie, word) {
  for (let tword of trie) {

  if (tword == word && word.length >= 3) {
    return true;
    }
  }
return false;
}

function convertToLowerCase(grid, dictionary) {
  for (let x = 0; x < grid.length; x++) {
    for (let i = 0; i < grid[x].length; i++) {
      grid[x][i] = grid[x][i].toLowerCase();
    }
  }
  for (let x = 0; x < dictionary.length; x++) {
    dictionary[x] = dictionary[x].toLowerCase();
  }

}

console.log(exports.findAllSolutions(grid, dictionary));













