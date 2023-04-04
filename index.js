document.querySelector(".board").style.display = "none";
document.querySelector(".resultado").style.display = "none";
document.querySelector(".totalres").style.display = "none";

class Player {
  constructor (name,symbol,result) {
      this.name = name;
      this.symbol = symbol;
      this.result = result;
  }
}

class Tabuleiro {
  constructor (tipotab) {
      this.tipotab = tipotab;
      this.jogadas = new Array(tipotab*tipotab);
      this.winner = winnermoves(tipotab);
  }
}

const player1 = new Player("","X",0);
const player2 = new Player("","O",0);
let actualplayer = player1;
let turno= 1;
let tabuleiro= null;

function addNewPlayers() {
  player1.name = document.querySelector('input[name="player1"]').value;
  player2.name = document.querySelector('input[name="player2"]').value;
  document.querySelector("h2").innerHTML= "É a vez do player "+actualplayer.name+ " ["+ actualplayer.symbol +"]";
  document.querySelector("h3").innerHTML= "Turno "+turno;
  totalResult();
}

function totalResult() {
  document.querySelector(".totalres").style.display = "block";
  let html="";
  html+=` 
  <p><span style="color: rgb(0, 120, 180); font-weight: bold">Resultados:</span></p>
  <p>${player1.name} [${player1.symbol}] = ${player1.result}</p>
  <p>${player2.name} [${player2.symbol}] = ${player2.result}</p>
  </div>`;
  document.querySelector(".totalres").innerHTML=html;
}

function defineTab (tab) {
  tabuleiro = new Tabuleiro(tab);
}

function winnermoves(tipotab){
  let linha = [];
  let poswin = [];
  let diferenca;

  for (let i = 0; i < tipotab; i++){
    diferenca = i * tipotab;
    for (let j = diferenca; j < diferenca + tipotab; j++) {
      linha.push(j);
    }
    poswin.push(linha);
    linha = [];
  }
  for (let i = 0; i < tipotab; i++) {
    for (let j = 0; j < tipotab; j++) { 
      linha.push(j*tipotab+i);
    }
    poswin.push(linha);
    linha = [];
  }
  for (let i = 0; i < tipotab; i++) { 
    linha.push(i*(tipotab+1));
  }
  poswin.push(linha);
  linha = [];
  for (let i = tipotab-1; i < (tipotab*tipotab)-1; i+=tipotab-1) { 
    linha.push(i);
  }
  poswin.push(linha);
  linha = [];
  return poswin;
}

function switchPlayer () {
  if (actualplayer == player1){
    actualplayer = player2;
  } else {
    actualplayer = player1;
  }
  turno += 1;
}

function iniciar() {
  document.querySelector(".intro").style.display = "none";
  winnermoves();
  document.querySelector(".board").style.display = "flex";
  let html = "<table>";
  for (let i = 0; i < tabuleiro.tipotab; i++) {
    html += "<tr>";
    for (let j = 0; j < tabuleiro.tipotab; j++) {
      html += `<td id="l${i + 1}c${j + 1}-${tabuleiro.tipotab}x${tabuleiro.tipotab}"><button onclick="play(this, ${i * tabuleiro.tipotab + j})"></button></td>`;
    }
    html += "</tr>";
  }
  html += "</table>";
  document.querySelector(".board").innerHTML = html;
}

function play (element, position) {
  if (element.innerText === ""){
    element.innerText = actualplayer.symbol;
    tabuleiro.jogadas[position]= actualplayer.symbol;
    tie();
    winGame ();
    switchPlayer();
  }
  document.querySelector ("h2").innerHTML = "É a vez do player "+actualplayer.name+ " ["+ actualplayer.symbol +"]";
  document.querySelector ("h3").innerHTML = "Turno " + turno;
}

function winGame () {
  let w=0;
  for (win of tabuleiro.winner) {
    for (i=0; i<win.length; i++) {
      if (tabuleiro.jogadas [win[i]] === actualplayer.symbol){
        w++;
      }
      else {
        w=0;
      }
    }
    if (w===win.length) {
      document.querySelector(".board").style.display = "none";
      document.querySelector(".players").style.display = "none";
      document.querySelector(".resultado").style.display="block";
      turno= 0;
      let html="";
      html+=` 
        <p>Ganhou o jogador <b>${actualplayer.name} [${actualplayer.symbol}]</b></p>
        <div class="chooseAfterGame">
          <button id="playAgain" type="button" onclick="playAgain()">Jogar novamente</button>
          <button id="restart" type="button" onclick=window.location.reload()>Restart</button>
        </div>`;
      document.querySelector(".resultado").innerHTML=html;
      w=0;
      actualplayer.result+=1;
      totalResult();
      return
    }
  }
}

function tie() {
  if (turno === tabuleiro.jogadas.length) {
    document.querySelector(".board").style.display = "none";
    document.querySelector(".players").style.display = "none";
    document.querySelector(".resultado").style.display="block";
    turno= 0;
    let html="";
    html+=` 
      <p><b>Empate!</b></p>
      <div class="chooseAfterGame">
        <button id="playAgain" type="button" onclick="playAgain()">Jogar novamente</button>
        <button id="restart" type="button" onclick=window.location.reload()>Restart</button>
      </div>`;
    document.querySelector(".resultado").innerHTML=html;
  }
}

function playAgain (){
  defineTab (tabuleiro.tipotab);
  iniciar();
  document.querySelector(".players").style.display = "block";
  document.querySelector(".resultado").style.display="none";
}