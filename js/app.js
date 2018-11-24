
 let numberChances = 0;
 let myNodelist = [];
 let selectedCard = '';
 let firstCardclass = '';
 let secondCardclass = '';
 let firstCardIcon = '';
 let secondCardIcon = '';
 let firstCard = '';
 let secondCard = '';
 let firstCardId = '';
 let secondCardId = '';
 let iconList = [];
 let sortleIcons = [];
 let matchSecond = '';
 let numeroJogada = 0;
 let numeroJogadas = document.querySelector('.moves');
 numeroJogadas.textContent = '0';
 let icones = document.querySelectorAll('.deck');
 //console.log(icones);
 //console.log(icones[0].children[0].lastElementChild.className);
 
// Recebe o clique do mouse e vira a carta
let evento = document.getElementById('deck');

let listener = function(event) {

    if(( event.target.id !== 'deck' ) && (event.target.tagName !== 'I' )) {
        console.log(event);
        numberChances ++; 
        verifyMove(event);                                                                        
    }
}

evento.addEventListener('click', listener, true);

/*************************************************************************************************/

function verifyMove(event) {

    if(numberChances == 1){       

        if(event.target.className !== "card match") {        //pega o nome da classe do primeiro item

            console.log(numberChances);
            firstCardIcon = event.target.lastElementChild.className; // pega o primeiro ícone clicado
            console.log(firstCardIcon);
            firstCardId = event.target.id;
            console.log(firstCardId);
            firstCardclass = event.target.className;

            event.target.className = 'card open show';              //vira a carta
            
            console.log('Selecionou a primeira carta...');
            
        } else{
            numberChances = 0;
        }
    }

    if(numberChances == 2){

        if(event.target.className !== "card match"){        //pega o nome da classe do segundo item

            console.log(numberChances);

            secondCardId = event.target.id;

            if(firstCardId !== secondCardId){

                secondCardIcon = event.target.lastElementChild.className; // pega o segundo ícone clicado
                console.log(secondCardIcon);
        
                console.log(secondCardId);
                secondCardclass = event.target.className;

                event.target.className = 'card open show';      //vira a carta

                console.log('Selecionou a segunda carta...');
                verificaCardIguais(); 
            } else{
                numberChances = 1;
            }
                             
        } else{
            numberChances = 1;
        }
                
    }

}

/*************************************************************************************************/
// Aciona o botão de restar, virando todas as cartas
document.getElementById("restart").addEventListener("click", function(event) {

    reseta(event);

}, true );

/*************************************************************************************************/
// FAZER USANDO SOMENTE JAVA SCRIPT PARA MANIPULAR O DOM
function verificaCardIguais() {        

    evento.removeEventListener('click', listener, true);

    if(firstCardIcon == secondCardIcon){
        console.log('Ícones iguais...');
        $('#' + firstCardId).removeClass( "card open show" ).addClass( "card match" );
        $('#' + secondCardId).removeClass( "card open show" ).addClass( "card match" );

        evento.addEventListener('click', listener, true);
        
        // document.getElementById(firstCardId).parentElement.className('card match');
    } else{
        $('#' + firstCardId).removeClass( "card open show" ).addClass( "card erro" );
        $('#' + secondCardId).removeClass( "card open show" ).addClass( "card erro " );
        

        setTimeout(function(){
            $('#' + firstCardId).removeClass( "card erro" ).addClass( "card" );
            $('#' + secondCardId).removeClass( "card erro" ).addClass( "card " );

            evento.addEventListener('click', listener, true);

         }, 1000);
        
    }
    numeroJogada ++;
    numberChances = 0;
    console.log('Número de jogada --->  ' + numeroJogada);    
    numeroJogadas.textContent = numeroJogada;    
                
}

/*************************************************************************************************/

//icones[0].children[0].lastElementChild.className = "fa fa-leaf";

function getIcones(icones) {
    
    for(let index = 0; index <= 15; index ++) {

        iconList[index] = [icones[0].children[index].lastElementChild.className];

    }
    console.log(iconList);
}

/*************************************************************************************************/

//icones[0].children[0].lastElementChild.className = "fa fa-leaf";

function changeIcones(array) {
    
    for(let index = 0; index <= 15; index ++) {

        icones[0].children[index].lastElementChild.className = array[index];

    }    
}

/*************************************************************************************************/

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }    

    return array; 
}

/*************************************************************************************************/

//Renicia o jogo
function reseta() {

    let myNodelist = document.getElementsByClassName("card");

    for(let i = 0; i <=15; i++){
        myNodelist[i].className = 'card';
    }

    numeroJogada = 0;
    numeroJogadas.textContent = numeroJogada;

    getIcones(icones);

    sortleIcons = shuffle(iconList);

    changeIcones(sortleIcons);
}

/*************************************************************************************************/

reseta(event);

getIcones(icones);

sortleIcons = shuffle(iconList);

console.log(sortleIcons);

changeIcones(sortleIcons);

  /*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */