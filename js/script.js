// Cliquei na letra ele vai adicionar no primeiro index livre e mudar para blocked
// Cliquei em apagar ele vai remover a letra e mudar o index para livre
// Caso nao tenha livre ele coloca no ultimo block

class App {
  alfabeto = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  rows = 5;
  columns = 5;
  elemento = document.querySelector("main");
  keyboard = document.querySelector(".keyboard");

  optionsConteiner = document.querySelector(".options-btn");
  deleteBtn = document.querySelector(".delete");

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
      } else if (this.alfabeto.includes(key)) {
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
    this.nextLine();
  }

  nextLine() {
    const lettersInput = [...document.querySelectorAll(".letter-input")];
    const blockeds = [...document.querySelectorAll(".blocked")];
    const last = blockeds.at(-1);
    const i = lettersInput.indexOf(last);

    console.log(i, this.rows * this.columns);
    if (i < 0) return;
    if (i + 1 < this.rows) return;
    if (i + 1 >= this.rows * this.columns) return;

    document.querySelector(".atual")?.classList.remove("atual");
    blockeds.forEach((b) => b.classList.remove("blocked"));

    const nextOnes = lettersInput.slice(i + 1, i + 1 + this.rows);
    nextOnes[0]?.classList.add("atual");
    nextOnes.forEach((e) => e.classList.add("free"));

    console.log(i);
  }
}

new App();
