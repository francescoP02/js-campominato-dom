// Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.


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
        domElement.addEventListener("click", function() {
            this.classList.add("active");
        });
    
        // appendo questo elemnto al contenitore
        gridContainer.append(domElement);
    
    }
});



/**
 * Description
 * @param {any} gridSize -> grandezza array
 * @returns {any} -> array con i numeri della griglia
 */
function generateGridNumbers(gridSize) {
    // creare l'array
    const gridArray = [];

    // Creao i numeri random tramite while 
    for (let i = 1; i <= gridSize; i++) {
        gridArray.push(i);
    }

    return gridArray;
}

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


