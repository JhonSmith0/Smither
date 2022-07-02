import { COLUMNS } from "../config.js";

class _ {
  _parent = document.querySelector("main");
  _letters = [];
  _Matrix = [];

  constructor() {
    this._parent.style.gridTemplateColumns = `repeat(${COLUMNS}, 1fr)`;
  }

  init(table) {
    this.table = table;
    this._parent.innerHTML = this.generateHTML();
    this.splitLetters();
    this.update();
  }

  generateHTML() {
    return this.table.data
      .flat(2)
      .map((e) => `<div class="letter-input"></div>`)
      .join("");
  }

  splitLetters() {
    this._letters = [...document.querySelectorAll(".letter-input")];

    const splited = [];
    for (let i = 1; i < COLUMNS + 1; i++) {
      const arr = this._letters.slice(i * COLUMNS - COLUMNS, i * COLUMNS);
      splited.push(arr);
    }

    this._Matrix = splited;
    return splited;
  }

  update() {
    const { rowIndex, columnIndex, data } = this.table;
    const column = data[columnIndex];
    const matrix = this._Matrix[columnIndex];

    column.forEach((letter, index) => {
      matrix[index].textContent = letter;
    });

    document.querySelector(".atual")?.classList.remove("atual");
    matrix[rowIndex]?.classList.add("atual");
  }

  evaluate() {
    const word = this.table.data[this.table.columnIndex];
    const matrix = this._Matrix[this.table.columnIndex];
    const { guessWord } = this.table;

    [...word].forEach((letter, index) => {
      let class_ = "incorrect";

      if (guessWord[index] === letter) class_ = "correct";
      else if (guessWord.includes(letter)) class_ = "almost";

      matrix[index].classList.add(class_);
    });
  }
}

export default new _();
