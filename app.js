const billElement = document.querySelector(".input");
const numberPersonElement = document.querySelector(".input1");
const btnElement = document.querySelectorAll(".btn");
const btnCustomElement = document.querySelector(".btn2");
const btnResetElement = document.querySelector(".reset-btn");
const tipAmountElement = document.querySelector(".chiffre");
const tipAmountElement1 = document.querySelector(".chiffre1");
let montantFacture = 0;
let pourboirePourcentage = 0;
let nombrePersonnes = 1; 


function calculerEtAfficherPourboire() {
    if (nombrePersonnes > 0) {
        const montantPourboire = (montantFacture * pourboirePourcentage) / 100;
        const pourboireParPersonne = montantPourboire / nombrePersonnes;
        const totalParPersonne = (montantFacture + montantPourboire) / nombrePersonnes;

        tipAmountElement.textContent = (`$${pourboireParPersonne.toFixed(2)}`); 
        tipAmountElement1.textContent = (`$${totalParPersonne.toFixed(2)}`); 
    } else {
        console.log("Le nombre de personnes doit être supérieur à 0.");
    }
}

billElement.addEventListener('input', () => {
    montantFacture = Number(billElement.value);
    calculerEtAfficherPourboire();
});

for (const button of btnElement) {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        for (const btn of btnElement) {
            btn.classList.remove("btn-back");
        }

        button.classList.add("btn-back");
        btnCustomElement.value = "";
        pourboirePourcentage = Number(button.innerHTML);

        calculerEtAfficherPourboire();
    });
}

btnCustomElement.addEventListener('input', () => {
    if (btnCustomElement.value > 100) {
        console.log('Veuillez entrer une valeur inférieure à 100%');
        btnCustomElement.value = "";
    } else {
        pourboirePourcentage = Number(btnCustomElement.value);
        console.log("Pourcentage de pourboire personnalisé :", pourboirePourcentage);

        for (const btn of btnElement) {
            btn.classList.remove("btn-back");
        }

        calculerEtAfficherPourboire();
    }
});

numberPersonElement.addEventListener('input', () => {
    nombrePersonnes = Math.max(1, Number(numberPersonElement.value)); 
    console.log("Nombre de personnes :", nombrePersonnes);
    calculerEtAfficherPourboire();
});

btnResetElement.addEventListener('click', () => {
    billElement.value = "";
    btnCustomElement.value = "";
    numberPersonElement.value = "";
    montantFacture = 0;
    pourboirePourcentage = 0;
    nombrePersonnes = 1;

    for (const btn of btnElement) {
        btn.classList.remove("btn-back");
    }

    tipAmountElement.innerHTML = "$0.00";
    tipAmountElement1.innerHTML = "$0.00";
});
