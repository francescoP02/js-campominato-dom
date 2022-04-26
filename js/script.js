// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// ****
// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// **BONUS:**
// 1 - L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// **2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****3- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


// 1. Tramite il play button attivo lo script

document.getElementById("play-btn").addEventListener("click", function() {

    // Prelevo il valore del form per la difficoltà del livello
    const userDifficulty = document.getElementById("user-difficulty").value;
    console.log(userDifficulty);

    // In base al valore definisco il numero di celle
    if (userDifficulty == "easy") {
        gridSize = 100;
    } else if (userDifficulty == "medium") {
        gridSize = 81;
    } else {
        gridSize = 49;
    }

    // Creo un array di numeri casuali non ripetuti in cui verrano posizionate le "bombe"
    const bombsNumber = 16;
    const bombsArray = generateUniqueRndNumbers(bombsNumber, gridSize);
    console.log(bombsArray);

    // Ogni volta che clicco su una cella che non risulta essere una bombsArray, viene inserita in un array di celle sicure
    const safeCells = [];
    console.log(safeCells);

    const winNumbers = gridSize - bombsNumber;
    console.log(winNumbers);

    // Creo la griglia
    const gridArray = generateGridNumbers(gridSize);
    console.log(gridArray);
    
    
    // 2. Per ogni numero creo un grid item
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";
    
    for (let i = 0; i < gridArray.length; i++) {
    
        const gridNumber = gridArray[i];
    
        const domElement = generateGridItem(gridNumber)
    
        // aggiungo all'elmento appena creato la gestione del click
        domElement.addEventListener("click", handleCellClick);
    
        // appendo questo elemnto al contenitore
        gridContainer.append(domElement);
    
    }

    function handleCellClick() {
        // Prelevo il numero all'interno dello span dell'elemento cliccato
        const clickedNumber = parseInt(this.querySelector('span').textContent);
        
        // Se il numero è presente nel bombsArray, viene colorato di rosso e il gioco finisce
        if ( bombsArray.includes(clickedNumber) ) {
            this.classList.add("bomb");
    
            endGame(safeCells.length, "lose")
        }
        // Se il numero non è una bombsArray, il gioco prosegue e viene inserito nell'array delle safeCells
        else {
            this.classList.add("active");

            safeCells.push(clickedNumber);
            console.log(safeCells);

            if (safeCells.length === winNumbers) {
                endGame(safeCells, "win")
            } 

            // Rendo la cella non cliccabile
            this.style.pointerEvents = "none";
        }
    }

    // FUNCTION ENDGAME
    function endGame(safeNumbersQuantity, winLose) {

        const userDifficulty = document.getElementById("user-difficulty").value;
        if (userDifficulty == "easy") {
            const gridItems = document.getElementsByClassName("grid-item");

            for (let i = 0; i < gridItems.length; i++) {
                const thisItem = gridItems[i];
                thisItem.style.pointerEvents = "none";
            }
        }
         else if (userDifficulty == "medium") {
            const gridItems = document.getElementsByClassName ("grid-item-2");

            for (let i = 0; i < gridItems.length; i++) {
                const thisItem = gridItems[i];
                thisItem.style.pointerEvents = "none";
            }
        }
         else {
            const gridItems = document.getElementsByClassName("grid-item-3");

            for (let i = 0; i < gridItems.length; i++) {
                const thisItem = gridItems[i];
                thisItem.style.pointerEvents = "none";
            }
        }


        // Seleziona l'elemento HTML con id "result"
        const resultTitle = document.getElementById("result");
        let resultMessage;

        // In base all'esito del gioco, scrive due diversi tipi di risultati
        if (winLose === "lose") {
            resultMessage = `Hai perso! Hai indovinato ${safeNumbersQuantity} numeri` ;
        } 
        else {
            resultMessage =`HAI VINTO, COMPLIMENTI!`;
        }
        resultTitle.innerHTML = resultMessage;
        resultTitle.classList.remove("d-none");
    }

    // Nel caso in cui resettiamo il GeolocationCoordinates, anche la scritta sparisce
    const resultTitle = document.getElementById("result");
    resultTitle.classList.add("d-none");
});


// GRID FUNCTION

/**
 * Description
 * @param {any} gridSize -> grandezza array
 * @returns {any} -> array con i numeri della griglia
 */
function generateGridNumbers(gridSize) {
    // creare l'array
    const gridArray = [];

    // Creo i numeri random tramite while 
    for (let i = 1; i <= gridSize; i++) {
        gridArray.push(i);
    }

    return gridArray;
}

// BOMB FUNCTION


// DOM FUNCTIONS
/**
 * Description La funzione che genera l'elmento html con numero all'interno
 * @param {any} number -> il numero che dobbiamo inserire all'interno dell'elemnto html
 * @returns {any} -> l'elemento html (il mio div)
 */
 function generateGridItem(number) {
    // creo un elemnto html
    const newElement = document.createElement("div");

    // aggiungo lo span con il numero
    newElement.innerHTML = `<span>${number}</span>`

    // assegno la classe grid-item in base al livello di difficoltà
    const userDifficulty = document.getElementById("user-difficulty").value;
    if (userDifficulty == "easy") {
        newElement.classList.add("grid-item");
    }
     else if (userDifficulty == "medium") {
        newElement.classList.add("grid-item-2");
    }
     else {
        newElement.classList.add("grid-item-3");
    }

    // ritorno elemnto
    return newElement;

}

// FUNCTION RND NUMBERS

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * Description: La funzione che genera numeri random non ripetuti
 * @param {any} numberQuantity -> quantità di numeri da generare
 * @param {any} maxLimit -> il limite massimo di range di numeri
 * @returns {any} -> array di numeri random non ripetuti
 */
 function generateUniqueRndNumbers(numberQuantity, maxLimit) {
    const numbersArray = [];
    while (numbersArray.length < 16) {
        const randomNumber = getRndInteger(1, maxLimit);
        if ( !numbersArray.includes(randomNumber) ) {
            numbersArray.push(randomNumber);
        }
    }

    return numbersArray;
}


