import layout from '../data/layout.json';

class Keyboard {
  constructor() {
    this.layout = layout;
    this.lang = 'eng';
    this.partString = '';
    this.caps = false;
    this.buffer = [];
    this.indexCursor = 0;
  }

  static addHtml() {
    // add wrapper
    const mainWrapper = document.createElement('div');
    mainWrapper.className = 'mainWrapper';
    document.body.append(mainWrapper);
    // add textarea
    const textareaEl = document.createElement('textarea');
    textareaEl.className = 'textareaEl';
    textareaEl.setAttribute('rows', '10');
    textareaEl.setAttribute('cols', '83');
    // textareaEl.setAttribute('disabled', 'disabled');
    document.querySelector('.mainWrapper').append(textareaEl);
    return true;
  }

  addKeyBoard() {
    // add keys container
    const keysContainer = document.createElement('div');
    keysContainer.className = 'keysContainer';
    document.querySelector('.mainWrapper').append(keysContainer);

    // add keys
    this.layout[this.lang].forEach((item, ind) => {
      const divKey = document.createElement('div');
      divKey.setAttribute('data-key', item[0]);
      divKey.classList.add('buttonClass');
      const regexp = /^[a-zа-я]$/i;
      if (this.caps && regexp.test(item[1])) {
        divKey.classList.add('caps');
      }
      divKey.classList.add(`key-${ind}`);
      document.querySelector('.keysContainer').append(divKey);

      // add first keys span
      const span = document.createElement('span');
      const firstItem = item[1];
      span.innerHTML = firstItem;
      span.classList.add('main');
      document.querySelector(`.key-${ind}`).append(span);

      // add second keys span
      if (item[2]) {
        const spanSec = document.createElement('span');
        const secondItem = item[2];
        spanSec.innerHTML = secondItem;
        spanSec.classList.add('edition');
        document.querySelector(`.key-${ind}`).append(spanSec);
      }
    });
  }

  // caps toggle
  updateCaps() {
    this.layout[this.lang].forEach((item) => {
      const regexp = /^[a-z\][а-я,.;']$/i;
      if (regexp.test(item[1])) {
        document.querySelector(`.buttonClass[data-key=${item[0]}]`).classList.toggle('caps');
      }
    });
    this.caps = !this.caps;
  }

  // language toggle
  updatelayout() {
    this.lang = this.lang === 'rus' ? 'eng' : 'rus';
    this.setLayoutStorage(this.lang);
    this.layout[this.lang].forEach((item) => {
      const elem = document.querySelector(`.buttonClass[data-key=${item[0]}]`);
      const firstItem = item[1];
      elem.querySelector('.main').innerHTML = firstItem;
      if (item[2]) {
        if (elem.querySelector('.edition') == null) {
          const spanEd = document.createElement('span');
          spanEd.classList.add('edition');
          elem.append(spanEd);
        }
        const secondItem = item[2];
        elem.querySelector('.edition').innerHTML = secondItem;
      } else if (elem.querySelector('.edition') != null) {
        elem.querySelector('.edition').remove();
      }
    });
  }

  addEvents() {
    // mousedown
    document.querySelector('.keysContainer').addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('buttonClass')) {
        Keyboard.pushDownAnim(event.target);
        this.keysFilter(event.target, false);
      } else if (event.target.classList.contains('main') || event.target.classList.contains('edition')) {
        Keyboard.pushDownAnim(event.target.parentElement);
        this.keysFilter(event.target.parentElement, false);
      }
    });
    // mouseup
    document.querySelector('.keysContainer').addEventListener('mouseup', (event) => {
      if (event.target.classList.contains('buttonClass')) {
        Keyboard.pushUpAnim(event.target);
        this.keysFilter(event.target, true);
      } else if (event.target.classList.contains('main') || event.target.classList.contains('edition')) {
        Keyboard.pushUpAnim(event.target.parentElement);
        this.keysFilter(event.target.parentElement, true);
      }
      document.querySelector('.textareaEl').focus();
    });
    // keydown
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      Keyboard.pushDownAnim(document.querySelector(`.buttonClass[data-key=${event.code}]`));
      if (this.layout[this.lang].map((item) => item[0]).indexOf(event.code) !== -1) {
        document.querySelector(`.buttonClass[data-key=${event.code}]`).classList.add('act');
        this.keysFilter(document.querySelector(`.buttonClass[data-key=${event.code}]`), false);
      }
      document.querySelector('.textareaEl').focus();
    });
    // keyup
    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      Keyboard.pushUpAnim(document.querySelector(`.buttonClass[data-key=${event.code}]`));
      if (this.layout[this.lang].map((item) => item[0]).indexOf(event.code) !== -1) {
        document.querySelector(`.buttonClass[data-key=${event.code}]`).classList.remove('act');
        this.keysFilter(document.querySelector(`.buttonClass[data-key=${event.code}]`), true);
      }
    });
  }

  keysFilter(value, up) {
    const pattern = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'Delete', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft', 'ControlRight', 'AltRight'];
    if (pattern.indexOf(value.getAttribute('data-key')) === -1 && !up) {
      this.capsHandling(value, true);
    } else if (up) {
      this.keysUpHandling(value);
    } else {
      this.capsHandling(value, false);
    }
  }

  capsHandling(value, print) {
    if (!this.caps && print) {
      this.printValue(value.querySelector('.main').innerHTML);
    } else if (this.caps && print) {
      if (value.querySelector('.edition')) {
        this.printValue(value.querySelector('.edition').innerHTML);
      } else {
        this.printValue(value.querySelector('.main').innerHTML.toUpperCase());
      }
    } else {
      this.keysHandling(value);
    }
  }

  keysHandling(value) {
    if (this.buffer.indexOf(value.querySelector('.main').innerHTML) === -1) {
      this.buffer.push(value.querySelector('.main').innerHTML);
    }
    switch (value.querySelector('.main').innerHTML) {
      case 'Backspace':
        this.indexCursor = document.querySelector('.textareaEl').selectionStart;
        if (this.indexCursor > 0) {
          const tempStr = document.querySelector('.textareaEl').innerHTML;
          this.partString = tempStr.slice(0, this.indexCursor - 1)
           + tempStr.slice(this.indexCursor);
          document.querySelector('.textareaEl').innerHTML = this.partString;
          document.querySelector('.textareaEl').selectionStart = this.indexCursor - 1;
          document.querySelector('.textareaEl').selectionEnd = this.indexCursor - 1;
        }
        break;
      case 'CapsLock':
        this.updateCaps();
        break;
      case 'Shift':
        this.updateCaps();
        break;
      case 'Del':
        this.indexCursor = document.querySelector('.textareaEl').selectionStart;
        if (this.indexCursor < document.querySelector('.textareaEl').innerHTML.length) {
          const tempStr = document.querySelector('.textareaEl').innerHTML;
          this.partString = tempStr.slice(0, this.indexCursor)
           + tempStr.slice(this.indexCursor + 1);
          document.querySelector('.textareaEl').innerHTML = this.partString;
          document.querySelector('.textareaEl').selectionStart = this.indexCursor;
          document.querySelector('.textareaEl').selectionEnd = this.indexCursor;
        }
        break;
      case 'ENTER':
        this.printValue('\n');
        break;
      case 'Tab':
        (() => {
          this.indexCursor = document.querySelector('.textareaEl').selectionStart;
          const tempStr = document.querySelector('.textareaEl').innerHTML;
          this.partString = `${tempStr.slice(0, this.indexCursor)}  ${tempStr.slice(this.indexCursor)}`;
          document.querySelector('.textareaEl').innerHTML = this.partString;
          document.querySelector('.textareaEl').selectionStart = this.indexCursor + 2;
          document.querySelector('.textareaEl').selectionEnd = this.indexCursor + 2;
        })();
        break;
      case '\u25C4':
        this.indexCursor = document.querySelector('.textareaEl').selectionStart;
        if (this.indexCursor > 0) {
          document.querySelector('.textareaEl').selectionStart = this.indexCursor - 1;
          document.querySelector('.textareaEl').selectionEnd = this.indexCursor - 1;
        }
        break;
      case '\u25BA':
        this.indexCursor = document.querySelector('.textareaEl').selectionStart;
        if (this.indexCursor < document.querySelector('.textareaEl').innerHTML.length) {
          document.querySelector('.textareaEl').selectionStart = this.indexCursor + 1;
          document.querySelector('.textareaEl').selectionEnd = this.indexCursor + 1;
        }
        break;
      case '\u25BC':
        (() => {
          this.indexCursor = document.querySelector('.textareaEl').selectionStart;
          const result = document.querySelector('.textareaEl').innerHTML.indexOf('\n', this.indexCursor + 1);
          if (result !== -1) {
            document.querySelector('.textareaEl').selectionStart = result;
            document.querySelector('.textareaEl').selectionEnd = result;
          } else {
            document.querySelector('.textareaEl').selectionStart = document.querySelector('.textareaEl').innerHTML.length;
            document.querySelector('.textareaEl').selectionEnd = document.querySelector('.textareaEl').innerHTML.length;
          }
        })();
        break;
      case '\u25B2':
        (() => {
          this.indexCursor = document.querySelector('.textareaEl').selectionStart;
          const result = document.querySelector('.textareaEl').innerHTML.lastIndexOf('\n', this.indexCursor - 1);
          if (result !== -1) {
            document.querySelector('.textareaEl').selectionStart = result;
            document.querySelector('.textareaEl').selectionEnd = result;
          }
        })();
        break;
      default:
        break;
    }
  }

  keysUpHandling(value) {
    if (this.buffer.indexOf('Alt') !== -1 && this.buffer.indexOf('Shift') !== -1) {
      this.updatelayout();
    }
    switch (value.querySelector('.main').innerHTML) {
      case 'Shift':
        this.updateCaps();
        break;
      default:
        break;
    }
    if (this.buffer.indexOf(value.querySelector('.main').innerHTML) !== -1) {
      this.buffer.splice(this.buffer.indexOf(value.querySelector('.main').innerHTML), 1);
    }
  }

  setLayoutStorage(value) {
    if (value) {
      localStorage.removeItem('lang');
      localStorage.setItem('lang', `${value}`);
    } else if (!localStorage.getItem('lang')) {
      localStorage.removeItem('lang');
      localStorage.setItem('lang', `${this.lang}`);
    } else {
      this.lang = localStorage.getItem('lang');
    }
  }

  printValue(value) {
    this.indexCursor = document.querySelector('.textareaEl').selectionStart;
    const tempStr = document.querySelector('.textareaEl').innerHTML;
    this.partString = tempStr.slice(0, this.indexCursor) + value + tempStr.slice(this.indexCursor);
    document.querySelector('.textareaEl').innerHTML = this.partString;
    document.querySelector('.textareaEl').selectionStart = this.indexCursor + 1;
    document.querySelector('.textareaEl').selectionEnd = this.indexCursor + 1;
  }

  static pushDownAnim(param) {
    const value = param;
    Keyboard.animateButton({
      duration: 100,
      timing: (timeFraction) => timeFraction ** 2,
      draw: (progress) => {
        value.style.top = `-${3 * progress}px`;
        value.style.left = `-${3 * progress}px`;
        value.style.boxShadow = `${4 * progress - 4}px ${4 * progress - 4}px 4px 2px #000000`;
      },
    });
  }

  static pushUpAnim(param) {
    const value = param;
    Keyboard.animateButton({
      duration: 100,
      timing: (timeFraction) => timeFraction ** 2,
      draw: (progress) => {
        value.style.top = `${0 * progress}px`;
        value.style.left = `${0 * progress}px`;
        value.style.boxShadow = `${0 * progress - 4}px ${0 * progress - 4}px 4px 2px #000000`;
      },
    });
  }

  static animateButton(options) {
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
      // timeFraction от 0 до 1
      let timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;
      // текущее состояние анимации
      const progress = options.timing(timeFraction);
      options.draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }
}

const keyboard = new Keyboard();

const LoadMethods = new Promise((resolve, reject) => {
  if (Keyboard.addHtml()) { resolve(); } else { reject(); }
});
LoadMethods.then(() => { keyboard.setLayoutStorage(); })
  .then(() => { keyboard.addKeyBoard(); })
  .then(() => { keyboard.addEvents(); })
  .catch(() => { throw new Error('ошибка создания Html'); });
