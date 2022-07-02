import { ROWS, COLUMNS } from "./config.js";
import alf from "./alf.js";
import popUpView from "./view/popUpView.js";
import tableView from "./view/tableView.js";

class App {
  optionsConteiner = document.querySelector(".options-btn");
  deleteBtn = document.querySelector(".delete");
  keyboard = document.querySelector(".keyboard");

  guessWord = "JHONS".toLowerCase();

  atual;

  constructor() {
    tableView.guessWord = this.guessWord;

    this.keyboard.addEventListener("click", this.handleKeyboardClick);
    this.optionsConteiner.addEventListener("click", this.handleOptionsClick);
    document.addEventListener("keyup", this.handleKeyBoard);
  }

  handleKeyBoard = (e) => {
    const key = e.key.toLowerCase();

    if (key === "backspace") return tableView.delete();
    if (key === "enter") return tableView.confirm();
    if (alf.includes(key)) return tableView.push(key);
  };

  handleKeyboardClick = (e) => {
    const target = e.target.closest(".key");
    if (!target) return;

    const letter = target.textContent;
    tableView.push(letter);
  };

  handleOptionsClick = (e) => {
    const target = e.target.closest(".btn");
    if (!target) return;

    target.classList.contains("delete")
      ? tableView.delete()
      : tableView.confirm(this.guessWord);
  };
}

new App();
