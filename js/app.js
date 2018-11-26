 let numberChances = 0;
 let myNodelist = [];
 let firstCardIcon = '';
 let secondCardIcon = '';
 let firstCardId = '';
 let secondCardId = '';
 let iconList = [];
 let sortleIcons = [];
 let numeroJogada = 0;
 let acerto = 0;
 let segundos = 0;
 let minutos = 0;
 let tempo;
 let getEstrelas = document.querySelectorAll('i');
 let quantidadeEstrelas = 5;
 let event = {};

 theLabel = document.getElementById("time");
 let acertos = document.querySelector('.acertos');
 acertos.textContent = '0   Acerto' ;

 let numeroJogadas = document.querySelector('.moves');
 numeroJogadas.textContent = '0   Movimento' ;

 let icones = document.querySelectorAll('.deck');
 //console.log(icones);
 //console.log(icones[0].children[0].lastElementChild.className);
 
// Recebe o clique do mouse e vira a carta
let evento = document.getElementById('deck');

/*************************************************************************************************/

let listener = function(event) {

    if(( event.target.id !== 'deck' ) && (event.target.tagName !== 'I' )) {
        // console.log(event);
        numberChances ++; 
        verifyMove(event);                                                                        
    }
}

evento.addEventListener('click', listener, true);

/*************************************************************************************************/
// Verifica a movimentação das cartas
function verifyMove(event) {

    if(numberChances == 1){       

        if(event.target.className !== "card match") {        //pega o nome da classe do primeiro item

            // console.log(numberChances);
            firstCardIcon = event.target.lastElementChild.className; // pega o primeiro ícone clicado
            // console.log(firstCardIcon);
            firstCardId = event.target.id;
            // console.log(firstCardId);
            firstCardclass = event.target.className;

            event.target.className = 'card open show';              //vira a carta
            
            // console.log('Selecionou a primeira carta...');
            
        } else{
            numberChances = 0;
        }
    }

    if(numberChances == 2){

        if(event.target.className !== "card match"){        //pega o nome da classe do segundo item

            // console.log(numberChances);

            secondCardId = event.target.id;

            if(firstCardId !== secondCardId){

                secondCardIcon = event.target.lastElementChild.className; // pega o segundo ícone clicado
                // console.log(secondCardIcon);
        
                // console.log(secondCardId);
                secondCardclass = event.target.className;

                event.target.className = 'card open show';      //vira a carta

                // console.log('Selecionou a segunda carta...');
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

// Aciona o botão de cose e fecha o Modal
document.getElementById("close").addEventListener("click", function(event) {

    closeModal(event);
    reseta(event);
    resetaEstrelas();

}, true );

/*************************************************************************************************/

// Verifica se as cartas selecionadas são iguais
function verificaCardIguais() {
    
    // document.querySelector('.movesModal').textContent = 'Você fez ' + numeroJogada + ' Movimentos ... ';

    evento.removeEventListener('click', listener, true);

    numeroJogada ++;
    numberChances = 0;
    
    verficaEstrelas();

    // console.log('Número de jogada --->  ' + numeroJogada);
    
    if( numeroJogada > 1){
        numeroJogadas.textContent = numeroJogada + ' Movimentos';
    }
    else{
        numeroJogadas.textContent = numeroJogada + ' Movimento';    
    }

    if(firstCardIcon == secondCardIcon){
        console.log('Ícones iguais...');
        $('#' + firstCardId).removeClass( "card open show" ).addClass( "card match" );
        $('#' + secondCardId).removeClass( "card open show" ).addClass( "card match" );

        evento.addEventListener('click', listener, true);

        acerto ++;

        console.log('Número de acertos --->  ' + acerto );

        if( acerto > 1){
            document.querySelector('.acertos').textContent = acerto + ' Acertos' ;

            if(acerto == 8) {

                clearInterval(tempo);

                $('.modalDialog').addClass( "modalDialogOpen" ); //Abre tela Modal
                
                document.querySelector('.movesModal').textContent = 'Você fez  ' + numeroJogada + ' Movimentos ... ';
                document.querySelector('.timeModal').textContent = ',gastou  ' + minutos +' min : ' + segundos + ' segs ...';
                
                if( quantidadeEstrelas > 1){
                    document.querySelector('.estrelaModal').textContent = ',ganhou  ' + quantidadeEstrelas + ' estrelas ...';
                } else {
                    document.querySelector('.estrelaModal').textContent = ',ganhou  ' + quantidadeEstrelas + ' estrela ...';
                }                
            }
        }
        else{
            document.querySelector('.acertos').textContent = acerto + ' Acerto' ;
        }
        
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
                
}

/*************************************************************************************************/

//icones[0].children[0].lastElementChild.className = "fa fa-leaf";

function getIcones(icones) {
    
    for(let index = 0; index <= 15; index ++) {

        iconList[index] = [icones[0].children[index].lastElementChild.className];
    }
    // console.log(iconList);
}

/*************************************************************************************************/

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
    numberChances = 0;
    numeroJogadas.textContent = numeroJogada + ' Movimento';

    getIcones(icones);

    sortleIcons = shuffle(iconList);

    changeIcones(sortleIcons);

    segundos = 0;
    minutos = 0;

    acerto = 0;
    document.querySelector('.acertos').textContent = acerto + ' Acerto' ;

    theLabel.innerHTML = minutos +' min : ' + segundos + ' seg';
    clearInterval(tempo);
    contaTempo();
    resetaEstrelas();
    
}

/*************************************************************************************************/
function contaTempo() {

    tempo = setInterval(function(){
        
        theLabel.innerHTML = minutos +' min : ' + segundos + ' seg';
        if(segundos == 59){
            segundos = 0;
            minutos ++;
        }
        segundos ++;
    }, 1000);

} 

/*************************************************************************************************/
// Fecha o Modal
function closeModal() {

    $('.modalDialog').removeClass( "modalDialogOpen" ).addClass( "modalDialog" );
    acerto = 0;
    document.querySelector('.acertos').textContent = acerto + ' Acerto' ;
    resetaEstrelas();

}

/*************************************************************************************************/
//Verifica a quantidade de estrelas
function verficaEstrelas() {

    // 4 estrelas
    if(  numeroJogada == 12 ){
        getEstrelas[quantidadeEstrelas - 1].className = "fa fa-star-o";
        quantidadeEstrelas --;
    }

    // 3 estrelas
    if(  numeroJogada == 15 ){
        getEstrelas[quantidadeEstrelas - 1].className = "fa fa-star-o";
        quantidadeEstrelas --;
    }

    // 2 estrelas
    if(  numeroJogada == 18 ){
        getEstrelas[quantidadeEstrelas - 1].className = "fa fa-star-o";
        quantidadeEstrelas --;
    }

    // 1 estrelas
    if(  numeroJogada == 21 ){
        getEstrelas[quantidadeEstrelas - 1].className = "fa fa-star-o";
        quantidadeEstrelas --;
    }

    // 0 estrelas
    if(  numeroJogada == 24 ){
        getEstrelas[quantidadeEstrelas - 1].className = "fa fa-star-o";
        quantidadeEstrelas --;
    }

    // console.log( getEstrelas[quantidadeEstrelas - 1].className ); // retirar a estrela

    console.log( 'quantidade de estrelas ' + quantidadeEstrelas ); // retirar a estrela

    // getEstrelas[quantidadeEstrelas - 1].className = "fa fa-star-o";

    // quantidadeEstrelas --;
}

/*************************************************************************************************/

function resetaEstrelas(){

    quantidadeEstrelas = 5;

    while(quantidadeEstrelas >= 1) {

        getEstrelas[quantidadeEstrelas - 1].className = "fa fa-star";

        quantidadeEstrelas --;
        
    }

    quantidadeEstrelas = 5;

}

contaTempo();

reseta(event);

getIcones(icones);

sortleIcons = shuffle(iconList);

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