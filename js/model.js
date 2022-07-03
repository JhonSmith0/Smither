import { COLUMNS, ROWS } from "./config.js";
import words from "../public/words.js";

export const table = {
  rowIndex: 0, // Walk to sides
  columnIndex: 0, // Walk up and down
  guessWord: "",
  data: Array.from({ length: COLUMNS }, () =>
    Array.from({ length: ROWS }, () => "")
  ),
  reset() {
    this.rowIndex = 0;
    this.columnIndex = 0;
    this.end = false;
    this.data = Array.from({ length: COLUMNS }, () =>
      Array.from({ length: ROWS }, () => "")
    );
    this.generateWord();
  },

  generateWord() {
    const i = Math.ceil(Math.random() * (words.length - 1));
    const word = words[i];
    this.guessWord = word;
    return this.guessWord;
  },

  get currentWord() {
    return this.data[this.columnIndex].join("");
  },
};

export function insertLetter(letter) {
  if (table.end) return;
  const { data, rowIndex, columnIndex } = table;
  data[columnIndex][rowIndex] = letter;

  ++table.rowIndex >= COLUMNS && --table.rowIndex;
}

export function remove() {
  const { data, rowIndex, columnIndex } = table;
  data[columnIndex][rowIndex] = "";

  --table.rowIndex < 0 && ++table.rowIndex;
}

export function rightArrow() {
  ++table.rowIndex >= COLUMNS && (table.rowIndex = 0);
}

export function leftArrow() {
  --table.rowIndex < 0 && (table.rowIndex = COLUMNS - 1);
}

export function nextLine() {
  const word = table.currentWord;
  if (word.length < COLUMNS) return;

  table.rowIndex = 0;

  table.end = checkWord(word);
  if (++table.columnIndex >= ROWS) {
    --table.columnIndex;
    table.end = true;
  }
}

export function checkWord(word) {
  return word === table.guessWord;
}
