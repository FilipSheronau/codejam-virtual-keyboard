class Keyboard {
  constructor() {
    this.arrKeysRus = [
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
    ];
    this.arrKeysEng = [
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
    ];    
    this.layout = this.arrKeysRus;
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
    this.layout.forEach((item,ind)=>{
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
}

const keyboard = new Keyboard();

let promise = new Promise((resolve,reject) => {
  return keyboard.addhtml() ? resolve() : reject()  
});
promise.then(() => { keyboard.addKeyBoard() })
.catch(() => { throw new Error('ошибка создания Html') })
