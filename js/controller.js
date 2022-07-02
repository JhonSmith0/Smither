import * as model from "./model.js";
import * as configs from "./config.js";
import TableView from "./view/TableView.js";
import KeyboardView from "./view/KeyboardView.js";

TableView.init(model.table);
KeyboardView.init();

function handleKey(letter) {
  if (letter === "backspace") model.remove();
  if (letter === "enter") {
    if (model.table.rowIndex < configs.COLUMNS - 1) return;
    if (!model.table.data[model.table.columnIndex][configs.COLUMNS - 1]) return;

    TableView.evaluate();
    model.nextLine();
  }

  if (letter === "arrowleft") model.leftArrow();
  if (letter === "arrowright") model.rightArrow();
  if (configs.alf.includes(letter)) model.insertLetter(letter);

  TableView.update();
}

KeyboardView.addHandlerKey(handleKey);
