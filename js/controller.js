import * as model from "./model.js";
import * as configs from "./config.js";
import TableView from "./view/TableView.js";
import KeyboardView from "./view/KeyboardView.js";
import PopUpView from "./view/PopUpView.js";

function handleKey(letter) {
  if (model.table.end) return;
  if (configs.alf.includes(letter)) model.insertLetter(letter);
  if (letter === "backspace") model.remove();
  if (letter === "delete") model.remove();
  if (letter === "arrowleft") model.leftArrow();
  if (letter === "arrowright") model.rightArrow();
  if (letter === "enter") controlNextLine();
  TableView.update();
}

function init() {
  model.table.reset();
  TableView.init(model.table);

  KeyboardView.init();
  KeyboardView.addHandlerKey(handleKey);

  PopUpView.addHandlerClick(controlPopUpClick);
  console.log(model.table.guessWord);
}

function controlPopUpClick() {
  model.table.reset();
  TableView.init(model.table);
}

function controlNextLine() {
  const correct = model.checkWord(model.table.currentWord);
  const msg = correct ? "Parabéns você ganhou!" : "Não foi dessa vez :(";

  if (model.table.currentWord.length < configs.COLUMNS) return;

  TableView.evaluate();
  model.nextLine();

  if (!model.table.end) return;

  PopUpView.render(msg, model.table.guessWord);
  PopUpView.show();
}

init();
