import { COLUMNS, ROWS } from "./config.js";

export const table = {
  rowIndex: 0, // Walk to sides
  columnIndex: 0, // Walk up and down
  guessWord: "JHONS".toLowerCase(),
  data: Array.from({ length: COLUMNS }, () =>
    Array.from({ length: ROWS }, () => "")
  ),
};

export function insertLetter(letter) {
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
  table.rowIndex = 0;
  ++table.columnIndex >= ROWS && --table.columnIndex;
}
