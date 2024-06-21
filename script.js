let positions = document.querySelectorAll(".img_positions");
let tabuleiro = document.querySelector(".div_tabuleiro")
let resultados = document.querySelector(".div_resultados");
let placar = document.querySelector(".div_placar");
let msg_player = document.querySelector("#msg-player");
let btn_start = document.querySelector("#btn-start");
let btn_restart = document.querySelector("#btn-restart");
let btn_end = document.querySelector("#btn-end");

let arrayTotal = [];
let arrayPlayer1 = [];
let name_player1;
let vic_player1 = 0;
let name_player2;
let arrayPlayer2 = [];
let vic_player2 = 0;


// Iniciar jogo
gameStatus = true;
let turn = 'Player 1';
msg_player.innerHTML = turn + ' <img src="images/img-bola.png" id="img_player">';
resultados.classList.add('display_none');

/*btn_start.addEventListener('click', () => {
        window.location.href = 'gamePage.html';
        msg_player.textContent = turn;
        gameStatus = true;
        name_player1 = document.querySelector("#name-player1").value;
        name_player2 = document.querySelector("#name-player2").value;
    });*/

// Nova partida
function newMatch(){
    gameStatus = true;
    btn_restart.textContent = 'Nova Partida';
    btn_end.textContent = 'Finaizar Jogo';
    resultados.classList.add('display_none');
    tabuleiro.classList.remove('display_none');
    placar.classList.remove('display_none');

    turn = 'Player 1';
    msg_player.innerHTML = turn + ' <img src="images/img-bola.png" id="img_player">';
    arrayPlayer1 = [];
    arrayPlayer2 = [];
    arrayTotal = [];
    positions.forEach(function(pos){
        pos.src = 'images/img-branca.png';
    });
}
btn_restart.addEventListener('click', newMatch);

// Finalizar partida
function endGame(){
    gameStatus = false;
    msg_player.textContent = '';
    btn_restart.textContent = 'Novo Jogo';
    btn_end.textContent = 'Voltar Página Incial';
    resultados.classList.remove('display_none');
    tabuleiro.classList.add('display_none');
    placar.classList.add('display_none');

    document.querySelector("#result_player1").textContent = 'Player 1: ' + vic_player1 + ' vitórias';
    document.querySelector("#result_player2").textContent = 'Player 2: ' + vic_player2 + ' vitórias';
    if(vic_player1 > vic_player2){
        document.querySelector("#result_final").textContent = "Player 1 é vitorioso";
    }
    else if(vic_player1 < vic_player2){
        document.querySelector("#result_final").textContent = "Player 2 é vitorioso";
    }
    else{
        document.querySelector("#result_final").textContent = "Empate";
    }

    vic_player1 = 0;
    document.querySelector("#player1 p").textContent = vic_player1;
    vic_player2 = 0;
    document.querySelector("#player2 p").textContent = vic_player2;
    turn = 'Player 1';
    arrayPlayer1 = [];
    arrayPlayer2 = [];
    arrayTotal = [];
}
if(gameStatus){
    btn_end.addEventListener('click', endGame);
}
else{
    btn_end.addEventListener('click', () => {window.location.href = 'loginPage.html'});
}

// Partidas
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
            document.querySelector("#player2 p").textContent = vic_player2;
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
        msg_player.innerHTML = 'Jogo Finalizado <br> Deu Velha';
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
        msg_player.innerHTML = 'Jogo Finalizado <br> Vitória do Player ' + player;
        gameStatus = false;
        if(player === 1){
            vic_player1++;
            document.querySelector("#player1 p").textContent = vic_player1;
        }
        else{
            vic_player2++;
            document.querySelector("#player2 p").textContent = vic_player2;
        }
    }
    else{
        if(player === 1){
            turn = 'Player 2';
            msg_player.innerHTML = turn + ' <img src="images/img-x.png" id="img_player">';
        }
        else{
            turn = 'Player 1';
            msg_player.innerHTML = turn + ' <img src="images/img-bola.png" id="img_player">';
        }
    }
}