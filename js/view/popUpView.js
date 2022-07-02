class _ {
  _element = document.querySelector(".popup");
  _overlay = document.querySelector(".overlay");
  constructor() {
    this._element.addEventListener("click", this.handleClick);
    this._overlay.addEventListener("click", this.hidden);
  }

  render(msg, word) {
    this._element.innerHTML = `<h2 class="popup-title title border-bottom">${msg}</h2>
    <div class="word-conteiner">
      ${[...word].map((e) => `<div class="word-letter">${e}</div>`).join("")}
    </div>
    <div class="options-btn">
      <button class="btn delete">Sair</button>
      <button class="btn confirm">Continuar</button>
    </div>`;
  }

  handleClick = (e) => {
    const { target } = e;
    const btn = target.closest("button");
    if (!btn) return;

    this.hidden();

    if (btn.classList.contains("delete")) return this.deleteBtn();
    this.confirmBtn();
  };

  deleteBtn = (e) => {};
  confirmBtn = (e) => {};

  show() {
    document.body.classList.add("open");
  }
  hidden() {
    document.body.classList.remove("open");
  }
}

export default new _();
