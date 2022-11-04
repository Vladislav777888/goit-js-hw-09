class ColorSwitcher {
  constructor({ refs: { startBtn, stopBtn } }, timerId) {
    this.startBtn = startBtn;
    this.stopBtn = stopBtn;
    this.timerId = timerId;
  }

  addListeners() {
    this.startBtn.addEventListener('click', this.onStartBtn.bind(this));
    this.stopBtn.addEventListener('click', this.onStopBtn.bind(this));
  }

  setAttribute() {
    this.stopBtn.setAttribute('disabled', 'disabled');
  }

  onStartBtn(evt) {
    evt.target.setAttribute('disabled', 'disabled');
    this.stopBtn.removeAttribute('disabled');

    this.timerId = setInterval(() => {
      document.body.style.backgroundColor = this.getRandomHexColor();
    }, 1000);
  }

  onStopBtn(evt) {
    clearInterval(this.timerId);
    evt.target.setAttribute('disabled', 'disabled');
    this.startBtn.removeAttribute('disabled');
  }

  getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  init() {
    this.addListeners();
    this.setAttribute();
  }
}

const settings = {
  refs: {
    startBtn: document.querySelector('[data-start'),
    stopBtn: document.querySelector('[data-stop'),
  },
  timerId: null,
};

new ColorSwitcher(settings).init();
// ==============================================================================
// const refs = {
//   startBtn: document.querySelector('[data-start'),
//   stopBtn: document.querySelector('[data-stop'),
// };
// let timerId = null;

// refs.startBtn.addEventListener('click', onStartBtn);
// refs.stopBtn.addEventListener('click', onStopBtn);
// refs.stopBtn.setAttribute('disabled', 'disabled');

// function onStartBtn(evt) {
//   evt.target.setAttribute('disabled', 'disabled');
//   refs.stopBtn.removeAttribute('disabled');

//   timerId = setInterval(() => {
//     document.body.style.backgroundColor = getRandomHexColor();
//   }, 1000);
// }

// function onStopBtn(evt) {
//   clearInterval(timerId);
//   evt.target.setAttribute('disabled', 'disabled');
//   refs.startBtn.removeAttribute('disabled');
// }

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
