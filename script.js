let positions = document.querySelectorAll(".positions");
let tabuleiro = document.querySelector(".div_tabuleiro")
let resultados = document.querySelector(".div_resultados");
let placar = document.querySelector(".div_placar");
let msg_player = document.querySelector("#msg_player");
let btn_start = document.querySelector("#btn_start");
let btn_restart = document.querySelector("#btn_restart");
let btn_end = document.querySelector("#btn_end");

let gameStatus;
let partidaStatus;
let turn;
let arrayTotal = [];
let arrayPlayer1 = [];
let name_player1;
let vic_player1 = 0;
let name_player2;
let arrayPlayer2 = [];
let vic_player2 = 0;

// Iniciar jogo
name_player1 = localStorage.getItem('name_player1');
name_player2 = localStorage.getItem('name_player2');
turn = localStorage.getItem('turn');

if(turn === 'Player 1'){
    msg_player.innerHTML = name_player1;
}
else{
    msg_player.innerHTML = name_player2;
}
document.getElementById("name_p1").textContent = name_player1;
document.getElementById("name_p2").textContent = name_player2;
gameStatus = true;
partidaStatus = true;
resultados.classList.add('display_none');

// Nova partida
function newMatch(){
    gameStatus = true;
    partidaStatus = true;
    btn_restart.textContent = 'Nova Partida';
    btn_end.textContent = 'Finalizar Jogo';
    resultados.classList.add('display_none');
    tabuleiro.classList.remove('display_none');
    placar.classList.remove('display_none');

    if(turn == 'Player 1'){
        msg_player.innerHTML = name_player1;
    }
    else{
        msg_player.innerHTML = name_player2;
    }
    arrayPlayer1 = [];
    arrayPlayer2 = [];
    arrayTotal = [];
    positions.forEach(function(pos){
        pos.querySelector('img').src = 'images/img-branca.png';
    });
}
btn_restart.addEventListener('click', newMatch);

// Finalizar jogo
function endGame(){
    gameStatus = false;
    partidaStatus = false;
    msg_player.textContent = '';
    btn_restart.textContent = 'Novo Jogo';
    btn_end.textContent = 'Voltar Página Incial';
    resultados.classList.remove('display_none');
    tabuleiro.classList.add('display_none');
    placar.classList.add('display_none');

    document.querySelector("#result_player1").textContent = name_player1 + ': ' + vic_player1 + ' vitórias';
    document.querySelector("#result_player2").textContent = name_player2 + ': ' + vic_player2 + ' vitórias';
    if(vic_player1 > vic_player2){
        document.querySelector("#result_final").textContent = name_player1 + " é o(a) vencedor(a)";
    }
    else if(vic_player1 < vic_player2){
        document.querySelector("#result_final").textContent = name_player2 + " é o(a) vencedor(a)";
    }
    else{
        document.querySelector("#result_final").textContent = "Empate";
    }

    vic_player1 = 0;
    document.querySelector("#scores1").textContent = vic_player1;
    vic_player2 = 0;
    document.querySelector("#scores2").textContent = vic_player2;
    turn = 'Player 1';
    arrayPlayer1 = [];
    arrayPlayer2 = [];
    arrayTotal = [];
}
btn_end.addEventListener('click', function(){
        if(gameStatus == true){
            endGame();
        }
        else{
            localStorage.clear();
            window.location.href='index.html';
        }
    });

// Partidas
function play(pos){
    let idPosition = pos.currentTarget.id;
    if(arrayPlayer1.includes(idPosition) || arrayPlayer2.includes(idPosition)){
        alert('Posição já marcada');
    }
    else{
        if(turn === 'Player 1'){
            arrayPlayer1.push(idPosition);
            arrayTotal.push(idPosition);
            pos.currentTarget.querySelector('img').src = 'images/img-bola.png';
            checkForWin(arrayPlayer1, 1);
        }
        else{
            arrayPlayer2.push(idPosition);
            arrayTotal.push(idPosition);
            pos.currentTarget.querySelector('img').src = 'images/img-x.png';
            checkForWin(arrayPlayer2, 2);
        }
    }
}
positions.forEach(pos => {
        pos.addEventListener('click', (pos) => {
            if(partidaStatus){
                play(pos);
            }
            else{
                alert("Você deve iniciar a partida");
            }
        });
    });

// Resultado
function checkForWin(array, player){
    // Vitória de um dos players
    if(
        (array.includes('p1') && array.includes('p2') && array.includes('p3')) ||
        (array.includes('p4') && array.includes('p5') && array.includes('p6')) ||
        (array.includes('p7') && array.includes('p8') && array.includes('p9')) ||
        (array.includes('p1') && array.includes('p4') && array.includes('p7')) ||
        (array.includes('p2') && array.includes('p5') && array.includes('p8')) ||
        (array.includes('p3') && array.includes('p6') && array.includes('p9')) ||
        (array.includes('p1') && array.includes('p5') && array.includes('p9')) ||
        (array.includes('p3') && array.includes('p5') && array.includes('p7'))
    ){
        partidaStatus = false;
        if(player === 1){
            msg_player.innerHTML = 'Partida Finalizada <br> Vitória de ' + name_player1;
            vic_player1++;
            document.querySelector("#scores1").textContent = vic_player1;
            turn = 'Player 1';
        }
        else{
            msg_player.innerHTML = 'Partida Finalizada <br> Vitória de ' + name_player2;
            vic_player2++;
            document.querySelector("#scores2").textContent = vic_player2;
            turn = 'Player 2';
        }
    }
    // Partida deu velha
    else if(arrayTotal.includes('p1') && arrayTotal.includes('p2') && arrayTotal.includes('p3') && arrayTotal.includes('p4') && arrayTotal.includes('p5') && arrayTotal.includes('p6') && arrayTotal.includes('p7') && arrayTotal.includes('p8') && arrayTotal.includes('p9')
    ){
        partidaStatus = false;
        msg_player.innerHTML = 'Partida Finalizada <br> Deu Velha';
    }
    // Partida continua
    else{
        if(player === 1){
            turn = 'Player 2';
            msg_player.innerHTML = name_player2;
        }
        else{
            turn = 'Player 1';
            msg_player.innerHTML = name_player1;
        }
    }
}