const player = ['X', 'O'];
let currentPlayer = player [0];
let turno="";
let contagemturno= 1;
let player1 = "";
let player2 = "";

const jogo3x3=['', '', '', '', '', '', '', '', ''];
let winnermoves3x3=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

/* Tenho de meter estas variáveis com for!!!!*/

const jogo4x4=['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
let winnermoves4x4=[
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

function addNewPlayers() {
  player1 = document.querySelector('input[name="jogador1"]').value;
  player2 = document.querySelector('input[name="jogador2"]').value;
  turno = player1 + " [X]";
  document.querySelector ("h2").innerHTML = "É a vez do player " +turno;
  document.querySelector ("h3").innerHTML = "Turno " + contagemturno;
}

function SwitchPlayer () {
  if (currentPlayer === player[0]){
    turno = player2 + " [O]";
    contagemturno += 1;
    currentPlayer= player[1];
  } else {
    turno = player1 + " [X]";
    contagemturno += 1;
    currentPlayer = player[0];
  }
}

function iniciar3x3() {
  let html="";
  html+=`
    <table>
      <tr>
        <td id="l1c1-3x3"><button onclick="play3x3(this, 0)"></button></td> 
        <td id="l1c2-3x3"><button onclick="play3x3(this, 1)"></button></td>
        <td id="l1c3-3x3"><button onclick="play3x3(this, 2)"></button></td>
      </tr>
      <tr>
        <td id="l2c1-3x3"><button onclick="play3x3(this, 3)"></button></td>
        <td id="l2c2-3x3"><button onclick="play3x3(this, 4)"></button></td> 
        <td id="l2c3-3x3"><button onclick="play3x3(this, 5)"></button></td>
      </tr>
      <tr>
        <td id="l3c1-3x3"><button onclick="play3x3(this, 6)"></button></td>
        <td id="l3c2-3x3"><button onclick="play3x3(this, 7)"></button></td>
        <td id="l3c3-3x3"><button onclick="play3x3(this, 8)"></button></td>
      </tr>
    </table>`;
  document.querySelector(".board").innerHTML=html;
}

function iniciar4x4() {
  modoJogo=4;
  let html="";
  html+=` 
    <table>
      <tr>
        <td id="l1c1-4x4"><button onclick="play4x4(this, 0)"></button></td> 
        <td id="l1c2-4x4"><button onclick="play4x4(this, 1)"></button></td>
        <td id="l1c3-4x4"><button onclick="play4x4(this, 2)"></button></td>
        <td id="l1c4-4x4"><button onclick="play4x4(this, 3)"></button></td>
      </tr>
      <tr>
        <td id="l2c1-4x4"><button onclick="play4x4(this, 4)"></button></td>
        <td id="l2c2-4x4"><button onclick="play4x4(this, 5)"></button></td> 
        <td id="l2c3-4x4"><button onclick="play4x4(this, 6)"></button></td>
        <td id="l2c4-4x4"><button onclick="play4x4(this, 7)"></button></td>
      </tr>
      <tr>
        <td id="l3c1-4x4"><button onclick="play4x4(this, 8)"></button></td>
        <td id="l3c2-4x4"><button onclick="play4x4(this, 9)"></button></td>
        <td id="l3c3-4x4"><button onclick="play4x4(this, 10)"></button></td>
        <td id="l3c4-4x4"><button onclick="play4x4(this, 11)"></button></td>
      </tr>
      <tr>
      <td id="l4c1-4x4"><button onclick="play4x4(this, 12)"></button></td>
      <td id="l4c2-4x4"><button onclick="play4x4(this, 13)"></button></td>
      <td id="l4c3-4x4"><button onclick="play4x4(this, 14)"></button></td>
      <td id="l4c4-4x4"><button onclick="play4x4(this, 15)"></button></td>
    </tr>
    </table>`;
  document.querySelector(".board").innerHTML=html;
}

function play3x3 (element, position) {
  if (element.innerText === ""){
    element.innerText = currentPlayer;
    jogo3x3 [position] = currentPlayer;
    winner3x3();
    SwitchPlayer();
  }
  document.querySelector ("h2").innerHTML = "É a vez do player " + turno;
  document.querySelector ("h3").innerHTML = "Turno " + contagemturno;
}

function play4x4 (element, position) {
  if (element.innerText === ""){
    element.innerText = currentPlayer;
    jogo4x4 [position] = currentPlayer;
    winner4x4 ();
    SwitchPlayer ();
  }
  document.querySelector ("h2").innerHTML = "É a vez do player " + turno;
  document.querySelector ("h3").innerHTML = "Turno " + contagemturno;
}

function winner3x3 () {
  for (win of winnermoves3x3) {
    if (jogo3x3 [win[0]] === currentPlayer && jogo3x3 [win[1]] === currentPlayer && jogo3x3 [win[2]] === currentPlayer){
      contagemturno= 0;
      let html="";
      html+=` 
        <p>Ganhou o jogador <b>${turno}</b></p>
        <div class="chooseAfterGame">
          <button id="playAgain" type="button" onclick="iniciar3x3()">Play again</button>
          <button id="restart" type="button" onclick=window.location.reload()>Restart</button>
        </div>`;
      document.querySelector(".resultado").innerHTML=html;
      return
    }
    else {
      tie3x3();
    }
  }
}

function winner4x4 () {
  for (win of winnermoves4x4) {
    if (jogo4x4 [win[0]] === currentPlayer && jogo4x4 [win[1]] === currentPlayer && jogo4x4 [win[2]] === currentPlayer && jogo4x4 [win[3]]=== currentPlayer){
      contagemturno= 0;
      let html="";
      html+=` 
        <p>Ganhou o jogador <b>${turno}</b></p>
        <div class="chooseAfterGame">
          <button id="playAgain" type="button" onclick="iniciar4x4()">Play again</button>
          <button id="restart" type="button" onclick=window.location.reload()>Restart</button>
        </div>`;
      document.querySelector(".resultado").innerHTML=html;
    }
    else {
      tie4x4();
    }
  }
}

function tie3x3() {
  if (contagemturno >= jogo3x3.length) {
    contagemturno= 0;
    let html="";
    html+=` 
      <p><b>Empate!</b></p>
      <div class="chooseAfterGame">
        <button id="playAgain" type="button" onclick="iniciar3x3()">Play again</button>
        <button id="restart" type="button" onclick=window.location.reload()>Restart</button>
      </div>`;
    document.querySelector(".resultado").innerHTML=html;
  }
}

function tie4x4() {
  if (contagemturno >= jogo4x4.length) {
    contagemturno= 0;
    let html="";
    html+=` 
      <p><b>Empate!</b></p>
      <div class="chooseAfterGame">
        <button id="playAgain" type="button" onclick="iniciar4x4()">Play again</button>
        <button id="restart" type="button" onclick=window.location.reload()>Restart</button>
      </div>`;
    document.querySelector(".resultado").innerHTML=html;
  }
}

/*

- Ter uma função que faça reset ao jogo -> Lembrar que a variável jogo3x3 ou jogo 4x4 não deu reset, mesmo que nós tenhamos dado reset ao board! O tabuleiro só tem
a parte HTML, mas não tem a estrutura JS que nos diz quem ganhou ou não!

- As funções estão duplicadas e temos de pensar como com apenas uma função conseguiriamos fazer o board, o winner e etc.... (a função tem de receber a variável
  que queremos, tabuleiro 3x3, 4x4, etc etc...)

- Aprender a omitir coisas (conseguimos omitir as divs no nosso javascript, por isso não precisamos de as eliminar no html como tinha antes -> https://www.w3schools.com/jsref/prop_style_visibility.asp)



let modoJogo=3;

- 3 -> as primeiras 3 sao incrementadas um a um (horizontais)
    -> as segundas 3 são incrementadas 3 a 3	(verticais)
    -> a incrementada 3+1
    -> a incrementada 3-1

- 4 -> as primeiras 4 sao incrementadas um a um (horizontais)
    -> as segundas 4 são incrementadas 4 a 4	(verticais)
    -> a incrementada 4+1
    -> a incrementada 4-1

*/