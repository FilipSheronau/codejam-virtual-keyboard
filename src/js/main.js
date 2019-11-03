class Keyboard {
  constructor() {
    this.layout = {
      'rus': [
        ['Backquote','ё'],
        ['Digit1','1','!'],
        ['Digit2','2','\u0022'],
        ['Digit3','3','№'],
        ['Digit4','4',';'],
        ['Digit5','5','%'],
        ['Digit6','6','^'],
        ['Digit7','7','&'],
        ['Digit8','8','*'],
        ['Digit9','9','('],
        ['Digit0','0',')'],
        ['Minus','-','_'],
        ['Equal','=','+'],
        ['Backspace','Backspace'],
        ['Tab','Tab'],
        ['KeyQ','й'],
        ['KeyW','ц'],
        ['KeyE','у'],
        ['KeyR','к'],
        ['KeyT','е'],
        ['KeyY','н'],
        ['KeyU','г'],
        ['KeyI','ш'],
        ['KeyO','щ'],
        ['KeyP','з'],
        ['BracketLeft','х'],
        ['BracketRight','ъ'],
        ['Backslash','\\','/'],
        ['Delete','Del'],
        ['CapsLock','CapsLock'],
        ['KeyA','ф'],
        ['KeyS','ы'],
        ['KeyD','в'],
        ['KeyF','а'],
        ['KeyG','п'],
        ['KeyH','р'],
        ['KeyJ','о'],
        ['KeyK','л'],
        ['KeyL','д'],
        ['Semicolon','ж'],
        ['Quote','э'],
        ['Enter','ENTER'],
        ['ShiftLeft','Shift'],
        ['KeyZ','я'],
        ['KeyX','ч'],
        ['KeyC','с'],
        ['KeyV','м'],
        ['KeyB','и'],
        ['KeyN','т'],
        ['KeyM','ь'],
        ['Comma','б'],
        ['Period','ю'],
        ['Slash','/'],
        ['ArrowUp','\u25B2'],
        ['ShiftRight','Shift'],
        ['ControlLeft','Ctrl'],
        ['AltLeft','Alt'],
        ['Space',' '],
        ['AltRight','Alt'],
        ['ControlRight','Ctrl'],
        ['ArrowLeft','\u25C4'],
        ['ArrowDown','\u25BC'],
        ['ArrowRight','\u25BA']
      ],
      'eng': [
        ['Backquote','\u0060','\u007E'],
        ['Digit1','1','!'],
        ['Digit2','2','@'],
        ['Digit3','3','#'],
        ['Digit4','4','$'],
        ['Digit5','5','%'],
        ['Digit6','6',':'],
        ['Digit7','7','?'],
        ['Digit8','8','*'],
        ['Digit9','9','('],
        ['Digit0','0',')'],
        ['Minus','-','_'],
        ['Equal','=','+'],
        ['Backspace','Backspace'],
        ['Tab','Tab'],
        ['KeyQ','q'],
        ['KeyW','w'],
        ['KeyE','e'],
        ['KeyR','r'],
        ['KeyT','t'],
        ['KeyY','y'],
        ['KeyU','u'],
        ['KeyI','i'],
        ['KeyO','o'],
        ['KeyP','p'],
        ['BracketLeft','['],
        ['BracketRight',']'],
        ['Backslash','\\','/'],
        ['Delete','Del'],
        ['CapsLock','CapsLock'],
        ['KeyA','a'],
        ['KeyS','s'],
        ['KeyD','d'],
        ['KeyF','f'],
        ['KeyG','g'],
        ['KeyH','h'],
        ['KeyJ','j'],
        ['KeyK','k'],
        ['KeyL','l'],
        ['Semicolon',';'],
        ['Quote','\u0027'],
        ['Enter','ENTER'],
        ['ShiftLeft','Shift'],
        ['KeyZ','z'],
        ['KeyX','x'],
        ['KeyC','c'],
        ['KeyV','v'],
        ['KeyB','b'],
        ['KeyN','n'],
        ['KeyM','m'],
        ['Comma',','],
        ['Period','.'],
        ['Slash','/'],
        ['ArrowUp','\u25B2'],
        ['ShiftRight','Shift'],
        ['ControlLeft','Ctrl'],
        ['AltLeft','Alt'],
        ['Space',' '],
        ['AltRight','Alt'],
        ['ControlRight','Ctrl'],
        ['ArrowLeft','\u25C4'],
        ['ArrowDown','\u25BC'],
        ['ArrowRight','\u25BA']
      ]
    }
    this.lang = 'eng';    
    this.partString = '';
    this.caps = false;
    this.buffer = [];
  }

  addhtml() {
    //add wrapper
    let mainWrapper = document.createElement('div');
    mainWrapper.className = 'mainWrapper';
    document.body.append(mainWrapper);
    
    //add textarea
    let textareaEl = document.createElement('textarea');
    textareaEl.className = 'textareaEl';
    textareaEl.setAttribute('rows', '10');    
    textareaEl.setAttribute('cols', '117');
    textareaEl.setAttribute('disabled', 'disabled');    
    document.querySelector('.mainWrapper').append(textareaEl);
    return true;
  }  

  addKeyBoard() {
    //add keys container
    let keysContainer = document.createElement('div');
    keysContainer.className = 'keysContainer';
    document.querySelector('.mainWrapper').append(keysContainer);
    
    //add keys
    this.layout[this.lang].forEach((item,ind)=>{
      let divKey = document.createElement('div');
      divKey.setAttribute('data-key',item[0]);      
      divKey.classList.add('buttonClass');
      let regexp = /^[a-zа-я]$/i;
      if (this.caps && regexp.test(item[1])) {        
        divKey.classList.add('caps');
      }
      divKey.classList.add(`key-${ind}`);
      document.querySelector('.keysContainer').append(divKey);

      //add first keys span
      let span = document.createElement('span');
      span.innerHTML = item[1];
      span.classList.add('main');        
      document.querySelector(`.key-${ind}`).append(span);
      
      //add second keys span      
      if (item[2]) {
        let spanSec = document.createElement('span');
        spanSec.innerHTML = item[2];
        spanSec.classList.add('edition');
        document.querySelector(`.key-${ind}`).append(spanSec);        
      }      
    });
    return true;    
  }
  //caps toggle
  updateCaps() {
    this.layout[this.lang].forEach((item)=>{
      let regexp = /^[a-zа-я]$/i;
      if (regexp.test(item[1])) {        
        document.querySelector(`.buttonClass[data-key=${item[0]}]`).classList.toggle('caps');
      }
    });
    this.caps = !this.caps;
  }
  //language toggle
  updatelayout() {
    this.lang = this.lang == 'rus' ? 'eng' : 'rus';
    this.setLayoutStorage(this.lang)
    this.layout[this.lang].forEach((item) => {
      let elem = document.querySelector(`.buttonClass[data-key=${item[0]}]`);      
      elem.querySelector('.main').innerHTML = item[1];      
      if (item[2]) {
        if(elem.querySelector('.edition') == null) {
          let spanEd = document.createElement('span');          
          spanEd.classList.add('edition');
          elem.append(spanEd);
        } 
        elem.querySelector('.edition').innerHTML = item[2];       
      }
      else {
        if(elem.querySelector('.edition') != null) {
          elem.querySelector('.edition').remove()
        }
      }
    })
  }

  addEvents() {
    //mousedown
    document.querySelector('.keysContainer').addEventListener("mousedown",(event) => {      
      if (event.target.classList.contains("buttonClass")) {
        this.keysFilter(event.target,false) ;
      }
      else if (event.target.classList.contains("main") || event.target.classList.contains("edition")) {
        this.keysFilter(event.target.parentElement,false);
      }
    });
    //mouseup
    document.querySelector('.keysContainer').addEventListener("mouseup",(event) => {      
      if (event.target.classList.contains("buttonClass")) {
        this.keysFilter(event.target,true);
      }
      else if (event.target.classList.contains("main") || event.target.classList.contains("edition")) {
        this.keysFilter(event.target.parentElement,true);
      }
    });
    //keydown
    document.addEventListener("keydown",(event) => {
      document.querySelector(`.buttonClass[data-key=${event.code}]`).classList.add('act');
      this.keysFilter(document.querySelector(`.buttonClass[data-key=${event.code}]`),false);      
    });
    //keyup
    document.addEventListener("keyup",(event) => {
      document.querySelector(`.buttonClass[data-key=${event.code}]`).classList.remove('act');
      this.keysFilter(document.querySelector(`.buttonClass[data-key=${event.code}]`),true);
    });
  }

  keysFilter(value,up) {    
    let pattern = ['Backspace','Delete','Tab','CapsLock','Enter','ShiftLeft','ShiftRight','ControlLeft','AltLeft','ControlRight','AltRight'];    
    if (pattern.indexOf(value.getAttribute('data-key')) == -1 && !up) {
      this.capsHandling(value,true)
    }
    else if(up) {      
      this.keysUpHandling(value);
    }
    else {      
      this.capsHandling(value,false);
    }    
  }

  capsHandling(value,print) {    
    if (!this.caps && print) {
      this.printValue(value.querySelector('.main').innerHTML);
    }
    else if (this.caps && print) {
      if (value.querySelector('.edition')) {
        this.printValue(value.querySelector('.edition').innerHTML);
      }
      else {
        this.printValue(value.querySelector('.main').innerHTML.toUpperCase());
      }
    }
    else {      
      this.keysHandling(value)
    }
  }

  keysHandling(value) {    
    if (this.buffer.indexOf(value.querySelector('.main').innerHTML) == -1) {      
      this.buffer.push(value.querySelector('.main').innerHTML);
    }
    switch(value.querySelector('.main').innerHTML) {
      case 'Backspace':        
        this.partString = this.partString.substr(0,this.partString.length-1);
        document.querySelector('.textareaEl').innerHTML = this.partString;
        break;
      case 'CapsLock':
        this.updateCaps();
        break;
      case 'Shift':
        if (this.buffer.indexOf('Alt') != -1) {
          this.updatelayout();
        }
        this.updateCaps();
        break;
      case 'Alt':
        if (this.buffer.indexOf('Shift') != -1) {
          this.updatelayout();
        }        
        break;
    }    
  }    
  
  keysUpHandling(value) {
    switch(value.querySelector('.main').innerHTML) {
      case 'Shift':        
        this.updateCaps();
        break;      
    }
    if(this.buffer.indexOf(value.querySelector('.main').innerHTML) != -1) {
      this.buffer.splice(this.buffer.indexOf(value.querySelector('.main').innerHTML),1);
    }    
  }

  setLayoutStorage(value) {
    if (value) {
      localStorage.removeItem('lang')
      localStorage.setItem('lang', `${value}`); 
    }
    else {
      if (!localStorage.getItem('lang')) {        
        localStorage.removeItem('lang')
        localStorage.setItem('lang', `${this.lang}`);      
      }
      else {      
        this.lang = localStorage.getItem('lang');
      }
    }    
    return true;
  }

  printValue(value) {
    this.partString = this.partString + value;
    document.querySelector('.textareaEl').innerHTML = this.partString;    
  }
}

const keyboard = new Keyboard();

let promise = new Promise((resolve,reject) => {
  return keyboard.addhtml() ? resolve() : reject()  
});
promise.then(() => { keyboard.setLayoutStorage() })
.then(() => { keyboard.addKeyBoard() })
.then(() => { keyboard.addEvents() })
.catch(() => { throw new Error('ошибка создания Html') })
