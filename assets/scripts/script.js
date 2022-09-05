'use strict';

// Recup des elements du DOM
// - Selection des formes
const selectForm = document.getElementById('select-form');
const btnForm = document.getElementById('btn-form');
// - Calcul
const labelVal1 = document.getElementById('label-val1');
const inputVal1 = document.getElementById('input-val1');
const inputVal2 = document.getElementById('input-val2');
const labelVal2 = document.getElementById('label-val2');
const btnCalc = document.getElementById('btn-calc');
// - Resultat
const displayResult = document.getElementById('display-result');
// - Zone (Utiliser pour masqué les elements)
const zoneCalc = document.getElementById('zone-calc');
const zoneVal1 = document.getElementById('zone-val1');
const zoneVal2 = document.getElementById('zone-val2');


// Traitement de la selection de la forme
let formSelected;
btnForm.addEventListener('click', () => {
    if (selectForm.value === '') {
        return; // On quite l'event du bouton !!!
    }

    // Affichage de la zone de calcul
    zoneCalc.classList.remove('masquer');

    // Gestion de la zone de saisie
    zoneVal2.classList.remove('masquer');
    switch (selectForm.value) {
        case '1':
            formSelected = 'rectangle';
            labelVal1.innerText = 'Hauteur';
            labelVal2.innerText = 'Largeur';
            break;
        case '2':
            formSelected = 'triangle rectangle';
            labelVal1.innerText = 'Base';
            labelVal2.innerText = 'Hauteur';
            break;
        case '3':
            formSelected = 'carre';
            labelVal1.innerText = 'Coté';
            zoneVal2.classList.add('masquer');
            break;
        case '4':
            formSelected = 'cercle';
            labelVal1.innerText = 'Rayon';
            zoneVal2.classList.add('masquer');
            break;
    }
});

// Calcul de l'aire et du périmetre
btnCalc.addEventListener('click', () => {
    // Récuperation des valeurs
    const val1 = parseFloat(inputVal1.value);
    const val2 = parseFloat(inputVal2.value);

    // Réaliser le calcul
    let perimetre;
    let aire;
    let description;

    switch (formSelected) {
        case 'rectangle':
            // Calcul... 
            perimetre = (val1 + val2) * 2;
            aire = val1 * val2;
            // Affichage
            description = `Pour un rectangle de ${val1} et ${val2}`;
            break;

        case 'carre':
            // Calcul...
            perimetre = val1 * 4;
            aire = val1 * val1; //Alternative :  Math.pow(val1, 2)  |  val1 ** 2
            // Affichage
            description = `Pour un carré de ${val1} de coté`;
            break;

        case 'triangle rectangle':
            // Calcul...
            const coteTriangle = Math.sqrt((val1 ** 2) + (val2 ** 2));
            perimetre = coteTriangle + val1 + val2;
            aire = (val1 * val2) / 2;
            // Affichage
            description = `Pour un triangle rectangle de ${val1} de base et ${val2} de hauteur`;
            break;

        case 'cercle' : 
            // Calcul...
            perimetre = 2 * Math.PI * val1;
            aire = (val1 ** 2) * Math.PI;
            // Affichage
            description = `Pour un cercle de rayon de ${val1}`; 
            break;
    }

    // Modification du DOM pour afficher le resultat
    displayResult.innerText = `${description} : Périmetre ${perimetre} / Aire ${aire}`;

});