import { ROWS, COLUMNS } from "../config.js";
class _ {
  _element = document.querySelector("main");
  _letters;
  _row = 0;
  constructor() {
    this.init();
  }

  init() {
    this._element.style.gridTemplateColumns = `repeat(${COLUMNS}, 1fr)`;

    this._element.innerHTML = Array.from(
      { length: ROWS * COLUMNS },
      (_) => `<div class="letter-input"></div>`
    ).join("");

    this._letters = [...this._element.querySelectorAll(".letter-input")];
    this.nextLine();
  }

  insert(letter, index) {
    const i = index ?? this._letters.indexOf(this.atual);
    const box = this._letters[i];
    box.textContent = letter;
  }

  get atual() {
    return document.querySelector(".atual");
  }

  get next() {
    if (this.max) return this.atual;
    return this.atual?.nextElementSibling;
  }

  get prev() {
    return this.atual?.previousElementSibling;
  }

  push(letter) {
    // atual => blocked
    // proximo => atual

    const next = this.next ?? this.atual;
    if (!next) return;

    this.atual.textContent = letter;
    this.atual.classList.add("blocked");
    this.atual.classList.remove("free");
    this.atual.classList.remove("atual");

    next.classList.add("atual");
    next.classList.remove("free");
    next.classList.remove("blocked");
  }

  delete() {
    // atual = free
    // prev = atual

    const prev = this.prev ?? this.atual;
    const atual = this.atual;
    if (!atual) return;

    atual.textContent = "";
    atual.classList.add("free");
    atual.classList.remove("blocked");
    atual.classList.remove("atual");

    prev.classList.add("atual");
    prev.classList.remove("blocked");
    prev.classList.remove("free");
  }

  confirm() {
    const fstone = this.fstOne;
    const word = fstone
      .map((e) => e.textContent)
      .join("")
      .toLowerCase();
    if (word.length !== this.guessWord.length) return;

    [...word].forEach((letter, i) => {
      let cl = "incorrect";
      if (this.guessWord[i] === letter) cl = "correct";
      else if (this.guessWord.includes(letter)) cl = "almost";

      fstone[i].classList.add(cl);
    });

    this.nextLine();
  }

  nextLine() {
    if (!this._row >= ROWS) return;
    this.fstOne.forEach((e) => {
      e.classList.remove("atual");
      e.classList.remove("free");
      e.classList.remove("blocked");
    });

    this._row++;
    const fstone = this.fstOne;
    if (!fstone.length) return;

    fstone.forEach((e) => e.classList.add("free"));
    fstone[0].classList.add("atual");
    fstone.at(-1).classList.add("max");
  }

  get fstOne() {
    const start = this._row * COLUMNS - COLUMNS;
    const fstone = this._letters.slice(start, start + COLUMNS);
    return fstone;
  }

  get max() {
    return this.atual?.classList.contains("max");
  }
}

export default new _();
