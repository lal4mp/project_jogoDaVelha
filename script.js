let positions = document.querySelectorAll("img");
let msg_player = document.querySelector("#msg-player");
let btn_start = document.querySelector("#btn-start");
let btn_restart = document.querySelector("#btn-restart");

let arrayPlayer1 = [];
let arrayPlayer2 = [];
let arrayTotal = [];

// Iniciar jogo
let gameStatus = false;
let turn = 'Player 1';

btn_start.addEventListener('click', () => {
        msg_player.textContent = 'Partida Iniciada - ' + turn;
        gameStatus = true
        btn_start.classList.add('btn-actions2');
        btn_restart.classList.remove('btn-actions2');
        btn_restart.classList.add('btn-actions');
    });

// Reiniciar jogo
function restart(){
    gameStatus = false;
    msg_player.textContent = '';
    turn = 'Player 1';
    btn_start.classList.remove('btn-actions2');
    btn_start.classList.add('btn-actions');
    btn_restart.classList.remove('btn-actions');
    btn_restart.classList.add('btn-actions2');

    positions.forEach(function(pos){
        pos.src = 'images/img-branca.png';
    });
    arrayPlayer1 = [];
    arrayPlayer2 = [];
    arrayTotal = [];
}
btn_restart.addEventListener('click', restart);

// Jogadas
function play(pos){
    let idPosition = pos.target.id;
    if(arrayPlayer1.includes(idPosition) || arrayPlayer2.includes(idPosition)){
        alert('Posição já marcada');
    }
    else{
        if(turn === 'Player 1'){
            arrayPlayer1.push(idPosition);
            arrayTotal.push(idPosition);
            pos.target.src = 'images/img-bola.png';
            checkForWin(arrayPlayer1, 1);
        }
        else{
            arrayPlayer2.push(idPosition);
            arrayTotal.push(idPosition);
            pos.target.src = 'images/img-x.png';
            checkForWin(arrayPlayer2, 2);
        }
    }
}
positions.forEach(pos => {
        pos.addEventListener('click', (pos) => {
            if(gameStatus){
                play(pos);
            }
            else{
                alert("Você deve iniciar a partida");
            }
        });
    });

// Resultado
function checkForWin(array, player){
    if(arrayTotal.includes('p1') && arrayTotal.includes('p2') && arrayTotal.includes('p3') && arrayTotal.includes('p4') && arrayTotal.includes('p5') && arrayTotal.includes('p6') && arrayTotal.includes('p7') && arrayTotal.includes('p8') && arrayTotal.includes('p9')
    ){
        msg_player.textContent = 'Jogo Finalizado - Deu Velha';
        gameStatus = false;
    }
    else if(
        (array.includes('p1') && array.includes('p2') && array.includes('p3')) ||
        (array.includes('p4') && array.includes('p5') && array.includes('p6')) ||
        (array.includes('p7') && array.includes('p8') && array.includes('p9')) ||
        (array.includes('p1') && array.includes('p4') && array.includes('p7')) ||
        (array.includes('p2') && array.includes('p5') && array.includes('p8')) ||
        (array.includes('p3') && array.includes('p6') && array.includes('p9')) ||
        (array.includes('p1') && array.includes('p5') && array.includes('p9')) ||
        (array.includes('p3') && array.includes('p5') && array.includes('p7'))
    ){
        msg_player.textContent = 'Jogo Finalizado - Vitória do Player ' + player;
        gameStatus = false;
    }
    else{
        if(player === 1){
            turn = 'Player 2';
            msg_player.textContent = turn;
        }
        else{
            turn = 'Player 1';
            msg_player.textContent = turn;
        }
    }
}