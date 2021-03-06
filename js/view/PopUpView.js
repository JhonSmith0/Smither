class _ {
  _parent = document.querySelector(".popup");
  _overlay = document.querySelector(".overlay");
  constructor() {}

  show() {
    document.body.classList.add("open");
  }
  hidde() {
    document.body.classList.remove("open");
    this._parent.innerHTML = "";
  }

  render(msg, word) {
    this._parent.innerHTML = `<h2 class="popup-title title border-bottom">${msg}</h2>
    <div class="word-conteiner">
      ${[...word]
        .map((letter) => `<div class="word-letter">${letter}</div>`)
        .join("")}
    </div>
    <div class="options-btn">
      <button class="btn delete">Sair</button>
      <button class="btn confirm">Continuar</button>
    </div>`;
  }

  handlerClick = (e) => {
    const button = e.target.closest("button");
  };

  addHandlerClick(handler) {
    this.handler = handler;

    this._overlay.addEventListener("click", this.hidde);
    this._parent.addEventListener("click", (e) => {
      const button = e.target.closest("button");

      button && this.hidde();
      button?.classList.contains("confirm") && this.handler();
    });
  }
}

export default new _();
