const player1 = new Player("","X");
const player2 = new Player("","O");
let actualplayer = player1;
let turno= 1;
const tabuleiro= null;

class Player {
  constructor (name,symbol) {
      this.name = name;
      this.symbol = symbol;
  }
}

function addNewPlayers() {
  player1.name = document.querySelector('input[name="player1"]').value;
  player2.name = document.querySelector('input[name="player2"]').value;
  document.querySelector("h2").innerHTML= "É a vez do player "+actualplayer.name;
  document.querySelector("h3").innerHTML= "Turno "+turno;
}

function switchPlayer () {
  if (actualplayer == player1){
    actualplayer = player2;
  } else {
    actualplayer = player1;
  }
  turno += 1;
}

class Tabuleiro {
  constructor (tipotab) {
      this.tipotab = tipotab;
      this.jogadas = new Array(tipotab*tipotab);
      this.winner = winnermoves(tipotab);
  }
}

function winnermoves(tipotab){
  let linha = [];
  let total = [];
  let diferenca;

  for (let i = 0; i < tipotab; i++){
    diferenca = i * tipotab;
    for (let j = diferenca; j < diferenca + tipotab; j++) {
      linha.push(j);
    }
    total.push(linha);
    linha = [];
  }
  for (let i = 0; i < tipotab; i++) {
    for (let j = 0; j < tipotab; j++) { 
      linha.push(j*tipotab+i);
    }
    total.push(linha);
    linha = [];
  }
  for (let i = 0; i < tipotab; i++) { 
    linha.push(i*(tipotab+1));
  }
  total.push(linha);
  linha = [];
  for (let j = tipotab-1; j < (tipotab*tipotab)-1; j+=tipotab-1) { 
    console.log(j);
  }
  total.push(linha);
  linha = [];
  return total;
}

function iniciar3x3() {
  tabuleiro= new Tabuleiro(3);
  let html="";
  html+=`
    <table>
      <tr>
        <td id="l1c1-3x3"><button onclick="play(this, 0)"></button></td> 
        <td id="l1c2-3x3"><button onclick="play(this, 1)"></button></td>
        <td id="l1c3-3x3"><button onclick="play(this, 2)"></button></td>
      </tr>
      <tr>
        <td id="l2c1-3x3"><button onclick="play(this, 3)"></button></td>
        <td id="l2c2-3x3"><button onclick="play(this, 4)"></button></td> 
        <td id="l2c3-3x3"><button onclick="play(this, 5)"></button></td>
      </tr>
      <tr>
        <td id="l3c1-3x3"><button onclick="play(this, 6)"></button></td>
        <td id="l3c2-3x3"><button onclick="play(this, 7)"></button></td>
        <td id="l3c3-3x3"><button onclick="play(this, 8)"></button></td>
      </tr>
    </table>`;
  document.querySelector(".board").innerHTML=html;
}

function iniciar4x4() {
  tabuleiro= new Tabuleiro(3);
  let html="";
  html+=` 
    <table>
      <tr>
        <td id="l1c1-4x4"><button onclick="play(this, 0)"></button></td> 
        <td id="l1c2-4x4"><button onclick="play(this, 1)"></button></td>
        <td id="l1c3-4x4"><button onclick="play(this, 2)"></button></td>
        <td id="l1c4-4x4"><button onclick="play(this, 3)"></button></td>
      </tr>
      <tr>
        <td id="l2c1-4x4"><button onclick="play(this, 4)"></button></td>
        <td id="l2c2-4x4"><button onclick="play(this, 5)"></button></td> 
        <td id="l2c3-4x4"><button onclick="play(this, 6)"></button></td>
        <td id="l2c4-4x4"><button onclick="play(this, 7)"></button></td>
      </tr>
      <tr>
        <td id="l3c1-4x4"><button onclick="play(this, 8)"></button></td>
        <td id="l3c2-4x4"><button onclick="play(this, 9)"></button></td>
        <td id="l3c3-4x4"><button onclick="play(this, 10)"></button></td>
        <td id="l3c4-4x4"><button onclick="play(this, 11)"></button></td>
      </tr>
      <tr>
      <td id="l4c1-4x4"><button onclick="play(this, 12)"></button></td>
      <td id="l4c2-4x4"><button onclick="play(this, 13)"></button></td>
      <td id="l4c3-4x4"><button onclick="play(this, 14)"></button></td>
      <td id="l4c4-4x4"><button onclick="play(this, 15)"></button></td>
    </tr>
    </table>`;
  document.querySelector(".board").innerHTML=html;
}

function play (element, position) {
  if (element.innerText === ""){
    element.innerText = actualplayer.symbol;
    tabuleiro.jogadas[position]= actualplayer.symbol;
    switchPlayer();
    /*função winGame*/
  }
  document.querySelector ("h2").innerHTML = "É a vez do player " + actualplayer.name;
  document.querySelector ("h3").innerHTML = "Turno " + turno;
}

function winGame () {
  for (win of tabuleiro.winner) {
    if (tabuleiro.jogadas [win[0]] === currentPlayer && jogo3x3 [win[1]] === currentPlayer && jogo3x3 [win[2]] === currentPlayer){
      turno= 0;
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
      tie();
    }
  }
}

/* TPC: Fazer função winGame e descobrir como omitir as divs, eventualmente pensar como podemos fazer o tabuleiro de forma dinamica

Tenho de conseguir colocar na função winGame o tipotab e fazer com que o if contemple o tipo tab... como fazer isso?

- Ter uma função que faça reset ao jogo -> Lembrar que a variável jogo3x3 ou jogo 4x4 não deu reset, mesmo que nós tenhamos dado reset ao board! O tabuleiro só tem
a parte HTML, mas não tem a estrutura JS que nos diz quem ganhou ou não!

- Aprender a omitir coisas (conseguimos omitir as divs no nosso javascript, por isso não precisamos de as eliminar no html como tinha antes -> https://www.w3schools.com/jsref/prop_style_visibility.asp)

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
*/