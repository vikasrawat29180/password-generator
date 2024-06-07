const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%^&*()_=+-><.,/:;|{[}]~`";

let password = "";
let passwordLength = 10;
let checkCount = 0;
//circle krna hai grey
sliderHandle();
function sliderHandle() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumber() {
  return getRandomInteger(0, 9);
}
function getLowerCase() {
  return String.fromCharCode(getRandomInteger(97, 123));
}
function getUpperCase() {
  return String.fromCharCode(getRandomInteger(65, 91));
}
function getSymbols() {
  const randomNum = getRandomNumber(0, symbols.length);

  return symbols.charAt(randomNum);
}
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSymbol = false;

  if (uppercaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (numbersCheck.checked) hasNum = true;
  if (symbolCheck.checked) hasSymbol = true;

  if (hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8) {
    setIndicator("0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSymbol) &&
    passwordLength >= 6
  ) {
    setIndicator("$ff0");
  } else {
    setIndicator("#ff0");
  }

}
  async function copyContent() {
    try {
      await navigator.clipboard.writeText(passwordDisplay.value);
      copyMsg.innerText = "copied";
    } catch (e) {
      copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
      copyMsg.classList.remove("active");
    }, 2000);
  }
function shufflePassword(array){
// //Fisher Yates method
for (let i = array.length - 1; i > 0; i--) {
    // find out random j
    const j = Math.floor(Math.random() * (i + 1));
    // swap 2 numbers
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  // array.forEach((el) => (str += el));
  str = array.join("");
  return str;


}
allcheckbox.forEach((checkbox)=> {
    
    checkbox.addEventListener('change',handleCheckBoxChange)
    
});




 function handleCheckBoxChange(){
checkCount=0;
allcheckbox.forEach( (checkbox)=>{
if(checkbox.checked){
    checkCount++;
}

})
//special edge case
if(passwordLength<checkCount){
    passwordLength=checkCount;
    sliderHandle()
}

}








  inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    sliderHandle();
  });

  
  copyBtn.addEventListener('click',()=>{
      if(passwordDisplay.value){
          copyContent();
        }
        
    })


 generateBtn.addEventListener('click',()=>{


if(checkCount<=0)return;

if(passwordLength<checkCount){
    passwordLength=checkCount
    sliderHandle();
}

password="";
// cechked checkboxes  input acc:
console.log("starting th ejourney")

// if(uppercaseCheck.checked){
//     password+=getUpperCase();
// }
// if(lowercaseCheck.checked){
//     password+=getLowerCase();
// }

// if(symbolCheck.checked){
//     password+=getSymbols();
// }

// if(numbersCheck.checked){
//     password+=getRandomInteger();
// }

let funcArr=[];
 
if(uppercaseCheck.checked){
    funcArr.push(getUpperCase);

}
if(lowercaseCheck.checked){
    funcArr.push(getLowerCase);
    
}
if(symbolCheck.checked){
    funcArr.push(getSymbols);
    
}
if(numbersCheck.checked){
    funcArr.push(getRandomNumber);
    
}
//compl addition done
for(let i=0;i<funcArr.length;i++){
    password+=funcArr[i]();
    console.log("complusory add done")
}

//remaining addition
for(let i=0;i<passwordLength-funcArr.length;i++){
    let rdmIndex=getRandomInteger(0,funcArr.length);
 password+=funcArr[rdmIndex]();
 console.log("remain add done")

}
//shuffle password
password=shufflePassword(Array.from(password));


passwordDisplay.value=password;
console.log("ui add done")
//calculate strength
calcStrength();



    })
    // generateButton.addEventListener('click', generatePassword);