// Cliquei na letra ele vai adicionar no primeiro index livre e mudar para blocked
// Cliquei em apagar ele vai remover a letra e mudar o index para livre
// Caso nao tenha livre ele coloca no ultimo block

import { ROWS, COLUMNS } from "./config.js";
import alf from "./alf.js";

class App {
  ROWS = ROWS;
  COLUMNS = COLUMNS;
  elemento = document.querySelector("main");
  keyboard = document.querySelector(".keyboard");

  optionsConteiner = document.querySelector(".options-btn");
  deleteBtn = document.querySelector(".delete");

  palavra = "JHONS".toLowerCase();

  atual;

  constructor() {
    this.keyboard.addEventListener("click", this.handleKeyboardClick);
    this.optionsConteiner.addEventListener("click", this.handleOptionsClick);

    document.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase();
      if (key === "backspace") {
        this.delete();
      } else if (key === "enter") {
        this.confirm();
      } else if (alf.includes(key)) {
        this.inserir(key);
      }
    });
  }

  inserir(letter) {
    const box = document.querySelector(".atual");
    const next = box.nextElementSibling;

    if (!box) return;
    box.textContent = letter;
    box.classList.remove("free");
    box.classList.add("blocked");
    box.classList.remove("atual");

    next?.classList.contains("free")
      ? next.classList.add("atual")
      : box.classList.add("atual");
  }

  handleKeyboardClick = (e) => {
    const target = e.target.closest(".key");
    if (!target) return;

    const letter = target.textContent;

    this.inserir(letter);
  };

  handleOptionsClick = (e) => {
    const target = e.target.closest(".btn");
    if (!target) return;

    target.classList.contains("delete") ? this.delete() : this.confirm();
  };

  delete() {
    const box = document.querySelector(".atual");
    const prev = box.previousElementSibling;
    if (!box) return;

    box.textContent = "";
    box.classList.add("free");
    box.classList.remove("blocked");
    box.classList.remove("atual");

    prev?.classList.contains("blocked")
      ? prev.classList.add("atual")
      : box.classList.add("atual");
  }

  confirm() {
    // Logica da palavra
    const blockeds = [...document.querySelectorAll(".blocked")];
    const word = blockeds
      .map((e) => e.textContent)
      .join("")
      .toLowerCase();

    if (word.length - this.ROWS) return;

    // Dando classes alternativas baseadas na pos da palavra
    [...word].forEach((letter, i) => {
      let _class = "red";

      if (this.palavra[i] === letter) _class = "green";
      else if (this.palavra.includes(letter)) _class = "yellow";

      // Elemento
      blockeds[i].classList.add(_class);
    });

    if (word === this.palavra) return;

    this.nextLine();
  }

  nextLine() {
    const lettersInput = [...document.querySelectorAll(".letter-input")];
    const blockeds = [...document.querySelectorAll(".blocked")];
    const last = blockeds.at(-1);
    const i = lettersInput.indexOf(last);

    console.log(i, this.ROWS * this.COLUMNS);
    if (i < 0) return;
    if (i + 1 < this.ROWS) return;
    if (i + 1 >= this.ROWS * this.COLUMNS) return;

    document.querySelector(".atual")?.classList.remove("atual");
    blockeds.forEach((b) => b.classList.remove("blocked"));

    const nextOnes = lettersInput.slice(i + 1, i + 1 + this.ROWS);
    nextOnes[0]?.classList.add("atual");
    nextOnes.forEach((e) => e.classList.add("free"));

    console.log(i);
  }
}

new App();
