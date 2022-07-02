class _ {
  _parent = document.querySelector(".keyboard");
  constructor() {}

  init() {
    this._parent.innerHTML = this.generateHTML();
  }

  generateHTML() {
    return `
    <div class="options-btn">
        <button class="btn delete" data-key="backspace">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button class="btn confirm" data-key="enter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    <div class="keyboard-line">
    <button class="key" data-key="Q">Q</button>
    <button class="key" data-key="W">W</button>
    <button class="key" data-key="E">E</button>
    <button class="key" data-key="R">R</button>
    <button class="key" data-key="T">T</button>
    <button class="key" data-key="Y">Y</button>
    <button class="key" data-key="U">U</button>
    <button class="key" data-key="I">I</button>
    <button class="key" data-key="O">O</button>
    <button class="key" data-key="P">P</button>
  </div>
  <div class="keyboard-line">
    <button class="key" data-key="A">A</button>
    <button class="key" data-key="S">S</button>
    <button class="key" data-key="D">D</button>
    <button class="key" data-key="F">F</button>
    <button class="key" data-key="G">G</button>
    <button class="key" data-key="H">H</button>
    <button class="key" data-key="J">J</button>
    <button class="key" data-key="K">K</button>
    <button class="key" data-key="L">L</button>
  </div>
  <div class="keyboard-line">
    <button class="key" data-key="Z">Z</button>
    <button class="key" data-key="X">X</button>
    <button class="key" data-key="C">C</button>
    <button class="key" data-key="V">V</button>
    <button class="key" data-key="B">B</button>
    <button class="key" data-key="N">N</button>
    <button class="key" data-key="M">M</button>
  </div>`;
  }

  handleEvent(e) {
    const letter =
      e.key?.toLowerCase() ??
      e.target.closest("button")?.dataset.key?.toLowerCase();

    letter && this.handler(letter);
  }

  addHandlerKey(handler) {
    this.handler = handler;
    document.addEventListener("keydown", this.handleEvent.bind(this));
    this._parent.addEventListener("click", this.handleEvent.bind(this));
  }
}

export default new _();
