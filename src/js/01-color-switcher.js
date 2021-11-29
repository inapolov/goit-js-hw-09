

const startEl = document.querySelector('button[data-start]');
const stopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector("body");
let switchColor = null;
let hasStarted = false;
stopEl.disabled=true;

startEl.addEventListener("click", colorSwitcherStart);

stopEl.addEventListener("click",colorSwitcherStop)

function colorSwitcherStart() {    
    if (hasStarted) {        
        return;
    };
    hasStarted = true;
    startEl.disabled = true;
    stopEl.disabled = false;
        switchColor = setInterval(() => {   
        
        bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
        
    }, 1000);
    
};

function colorSwitcherStop() {
    clearInterval(switchColor);
    hasStarted = false;
    startEl.disabled = false;
    stopEl.disabled=true;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
