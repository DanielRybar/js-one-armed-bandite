let confirmBtn;
let firstRec;
let secondRec;
let thirdRec;
let processBtn;
let formik;
let givenMoney;
let errorMessage;
let informMoney;
let colors;
let lostOrIncrease;
let colorFirst;
let colorSecond;
let colorThird;
let profit = 0;
let myMoney = 0;

const init = () => {
    confirmBtn = document.getElementById("confirmBtn");
    firstRec = document.getElementById("first");
    secondRec = document.getElementById("second");
    thirdRec = document.getElementById("third");
    processBtn = document.getElementById("process");
    formik = document.getElementsByTagName("form")[0];
    givenMoney = document.getElementById("givenMoney");
    errorMessage = document.getElementById("errorMessage");
    informMoney = document.getElementById("vklad");
    lostOrIncrease = document.getElementById("actualMoneyLostOrIncrease");
    colorFirst = document.getElementById("color1");
    colorSecond = document.getElementById("color2");
    colorThird = document.getElementById("color3");

    confirmBtn.disabled = true;
    processBtn.disabled = true;

    processBtn.addEventListener("click", () => {
        lostOrIncrease.innerHTML = "";
        randomlyFillRectangle(firstRec, secondRec, thirdRec);
        if(firstRec.style.fill === secondRec.style.fill === thirdRec.style.fill)
        {
            profit = 1000;
            myMoney = Number(myMoney) +  Number(profit);
            lostOrIncrease.innerHTML = "Získal jsi: " + profit + " (tři stejné barvy)";
        }
        else if(firstRec.style.fill !== secondRec.style.fill && secondRec.style.fill !== thirdRec.style.fill && firstRec.style.fill !== thirdRec.style.fill)
        {
            profit = 500;
            myMoney = Number(myMoney) +  Number(profit);
            lostOrIncrease.innerHTML = "Získal jsi: " + profit + " (tři naprosto různé barvy)";
        }
        else if((firstRec.style.fill === secondRec.style.fill) || (secondRec.style.fill === thirdRec.style.fill))
        {
            //console.log(firstRec.style.fill);
            profit = 200;
            myMoney = Number(myMoney) +  Number(profit);
            lostOrIncrease.innerHTML = "Získal jsi: " + profit + " (dvě stejné barvy vedle sebe)";
        }
        else 
        {
            profit = -200;
            myMoney = Number(myMoney) +  Number(profit);
            lostOrIncrease.innerHTML = "Nezískal jsi nic a přišel jsi o 200 Kč";
        }
        //console.log(Number(myMoney));
        informMoney.innerHTML = "Vklad: " + myMoney;
        colorFirst.innerHTML = firstRec.style.fill;
        colorSecond.innerHTML = secondRec.style.fill;
        colorThird.innerHTML = thirdRec.style.fill;

    });

    confirmBtn.addEventListener("click", (e) => {
        e.preventDefault();
        myMoney = givenMoney.value;
        informMoney.innerHTML = "Vklad: " + myMoney;
        processBtn.disabled = false;
    });
    formik.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    givenMoney.addEventListener("change", (e) => {
        validateInput(e, confirmBtn);
    });
    givenMoney.addEventListener("input", (e) => {
        validateInput(e, confirmBtn);
    });
    givenMoney.addEventListener("paste", (e) => {
        validateInput(e, confirmBtn);
    });
    givenMoney.addEventListener("keypress", (e) => {
        validateInput(e, confirmBtn);
    });
}

const validateInput = (event, btn) => {
    if(event.target.value === "" || Number(event.target.value) > 100000 || Number(event.target.value) < 500)
    {
        event.target.style.backgroundColor = "2px solid crimson";
        errorMessage.innerHTML = '<div class="alert alert-danger" role="alert">Chyba v zadávání! (minimální vklad je 500 a maximální vklad 100 000 Kč)</div>';
        btn.disabled = true;
    }
    else 
    {
        event.target.style.border = "2px solid green";
        errorMessage.innerHTML = "";
        btn.disabled = false;
    }
}

const randomlyFillRectangle = (first, second, third) => {
    colors = ["lightBlue", "green", "cyan", "magenta", "red", "black", "coral", "chocolate", 
    "deepPink", "gray", "orchid", "olive", "crimson", "darkGoldenRod", "gainsboro", "indigo", "mediumSeaGreen"];
    let colorsLength = colors.length;
    first.style.fill = colors[generateColor(colorsLength)];
    second.style.fill = colors[generateColor(colorsLength)];
    third.style.fill = colors[generateColor(colorsLength)];
}

const generateColor = (length) => {
    return Math.floor(Math.random() * length);
}

window.addEventListener("DOMContentLoaded", init);