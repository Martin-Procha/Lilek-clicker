let lilky = 0;
let silaKliknuti = 1;
let pasivniPrijem = 0;

let cenaFarmar = 10;
let cenaZahrada = 50;
let cenaPlantaze = 1000;

const ulozenaData = JSON.parse(localStorage.getItem("lilekClickerSave"));
if (ulozenaData) {
    lilky = ulozenaData.lilky;
    silaKliknuti = ulozenaData.silaKliknuti;
    pasivniPrijem = ulozenaData.pasivniPrijem;
    cenaFarmar = ulozenaData.cenaFarmar;
    cenaZahrada = ulozenaData.cenaZahrada;
    cenaPlantaze = ulozenaData.cenaPlantaze;
}

const textSkore = document.getElementById("skore");
const textPasivniPrijem = document.getElementById("pasivni-prijem-text");

const btnLilek = document.getElementById("btn-lilek");
const btnFarmar = document.getElementById("btn-farmar");
const btnZahrada = document.getElementById("btn-zahrada");
const btnPlantaz = document.getElementById("btn-plantaz");
const btnReset = document.getElementById("btn-reset");

function ulozHru() {
    const dataProUlozeni = {
        lilky: lilky,
        silaKliknuti: silaKliknuti,
        pasivniPrijem: pasivniPrijem,
        cenaFarmar: cenaFarmar,
        cenaZahrada: cenaZahrada,
        cenaPlantaze: cenaPlantaze
    };
    localStorage.setItem("lilekClickerSave", JSON.stringify(dataProUlozeni));
}

function aktualizujUI() {
    textSkore.textContent = lilky;
    textPasivniPrijem.textContent = pasivniPrijem;
    
    btnFarmar.textContent = `🧑🏿‍🌾 Najmout Farmáře (Cena: ${cenaFarmar} lilků)`;
    btnZahrada.textContent = `🌲 Koupit Zahradu (Cena: ${cenaZahrada} lilků)`;
    btnPlantaz.textContent = `🏞️ Koupit Plantáž (Cena: ${cenaPlantaze} lilků)`;
}

btnLilek.addEventListener("click", function() {
    lilky += silaKliknuti;
    aktualizujUI();
    ulozHru();
});

btnFarmar.addEventListener("click", function() {
    if (lilky >= cenaFarmar) {
        lilky -= cenaFarmar; 
        silaKliknuti++; 
        cenaFarmar = Math.round(cenaFarmar + 10);
        aktualizujUI();         
        ulozHru();
    } else {
        alert("Nedostatek prostředků na farmáře!");
    }
});

btnZahrada.addEventListener("click", function() {
    if (lilky >= cenaZahrada) {
        lilky -= cenaZahrada;
        pasivniPrijem += 1; 
        cenaZahrada = Math.round(cenaZahrada + 50);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na zahradu!");
    }
});

btnPlantaz.addEventListener("click", function() {
    if (lilky >= cenaPlantaze) {
        lilky -= cenaPlantaze;
        pasivniPrijem += 10; 
        cenaPlantaze = Math.round(cenaPlantaze + 500);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na Plantáž!");
    }
});



setInterval(function() {
    if (pasivniPrijem > 0) {
        lilky += pasivniPrijem;
        aktualizujUI();
        ulozHru();
    }
}, 1000);

aktualizujUI();