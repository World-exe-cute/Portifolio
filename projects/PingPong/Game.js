//variaveis usadas e constantemente modificadas pelo jogo.
//localização da barra
var CountLeftBar1 = 37;
var CountLeftBar2 = 42;
//localização da bolinha
var BallMovX = 42;
var BallMovY = 89;
//direcao da bolinha
var BallDirectionX = "Left";
var BallDirectionY = "Top";
//impede do jogo ser executado mais de uma vez.
var IterationBlock = 0;
//verifica qual o lado do bloco a bola ira encostar.
var blockIdTest = 0;
//uma função que vai mover o jogo todo.
function MoveBar() {
  if (IterationBlock == 0) {
    IterationBlock = 1;
    var BarraEsq = document.getElementById("BarraEsq");
    var BarraDir = document.getElementById("BarraDir");
    var ParedeEsq = document.getElementById("ParedeEsq");
    var ParedeDir = document.getElementById("ParedeDir");
    var ParedeTeto = document.getElementById("ParedeTeto");
    var deadZone = document.getElementById("DeadZone");
    var Ball = document.getElementById("Ball");
    //pega o tamanho total do elemento.
    var BarraHitBoxEsq = BarraEsq.getBoundingClientRect();
    var ParedeHitBoxEsq = ParedeEsq.getBoundingClientRect();
    var ParedeHitBoxDir = ParedeDir.getBoundingClientRect();
    var ParedeHitBoxTeto = ParedeTeto.getBoundingClientRect();
    var deadZoneHitBox = deadZone.getBoundingClientRect();
    //porcentagem das paredes fixas
    let ParedePercentDir = (ParedeHitBoxDir.left * 100) / window.innerWidth;
    let ParedePercentEsq = (ParedeHitBoxEsq.left * 100) / window.innerWidth;
    let ParedePercentTop = (ParedeHitBoxTeto.top * 100) / window.innerHeight;
    let deadZonePercent = (deadZoneHitBox.top * 100) / window.innerHeight;

    let ParedeMatchDir = Math.trunc(ParedePercentDir);
    let ParedeMatchEsq = Math.trunc(ParedePercentEsq);
    let ParedeMatchTop = Math.trunc(ParedePercentTop);
    let deadZoneMatch = Math.trunc(deadZonePercent);
    //pega um array com todos os ID de Blocos;
    let blocos = document.querySelectorAll(".Block");
    //arrays vazios que serao preenchidos a seguir.
    var blockArrayX = [];
    var blockArrayY = [];
    //vai receber ID e class de cada bloco e colocar no array certo.
    for (var B = 0; B < 30; B++) {
      let blockAtualX = blocos[B].id;
      let blockAtualY = blocos[B].classList[2];
      blockArrayX.push(blockAtualX);
      blockArrayY.push(blockAtualY);
    }
    //encontra a atual localização do mouse.
    var MousePercentLeft = 0;
    /*window.addEventListener("pointermove", (Local) => {
      x = Local.clientX;
      y = Local.clientY;
      MousePercentLeft = (x * 100) / window.innerWidth;

      //transforma o eixo X e Y em % em relaçao a tela.
      let ParedePercentDir = (ParedeHitBoxDir.left * 100) / window.innerWidth;
      let ParedePercentEsq = (ParedeHitBoxEsq.left * 100) / window.innerWidth;
      //tira os decimais...
      let ParedeMatchDir = Math.trunc(ParedePercentDir);
      let ParedeMatchEsq = Math.trunc(ParedePercentEsq);
      //move a barra na direção do mouse.
      if (CountLeftBar2 + 4 != ParedeMatchDir) {
        if (CountLeftBar1 < MousePercentLeft) {
          CountLeftBar1++;
          CountLeftBar2++;
          BarraEsq.style.left = CountLeftBar1 + "%";
          BarraDir.style.left = CountLeftBar2 + "%";
        }
      }
      if (CountLeftBar1 - 1 != ParedeMatchEsq) {
        if (CountLeftBar1 > MousePercentLeft) {
          CountLeftBar1--;
          CountLeftBar2--;
          BarraEsq.style.left = CountLeftBar1 + "%";
          BarraDir.style.left = CountLeftBar2 + "%";
        }
      }
    });*/
    //move a barra a cada iteração na diretao do mouse.

    //mantem o movimento constante da bola.
    setInterval(() => {
      x = Local.clientX;
      y = Local.clientY;
      MousePercentLeft = (x * 100) / window.innerWidth;

      //transforma o eixo X e Y em % em relaçao a tela.
      let ParedePercentDir = (ParedeHitBoxDir.left * 100) / window.innerWidth;
      let ParedePercentEsq = (ParedeHitBoxEsq.left * 100) / window.innerWidth;
      //tira os decimais...
      let ParedeMatchDir = Math.trunc(ParedePercentDir);
      let ParedeMatchEsq = Math.trunc(ParedePercentEsq);
      //move a barra na direção do mouse.
      if (CountLeftBar2 + 4 != ParedeMatchDir) {
        if (CountLeftBar1 < MousePercentLeft) {
          CountLeftBar1++;
          CountLeftBar2++;
          BarraEsq.style.left = CountLeftBar1 + "%";
          BarraDir.style.left = CountLeftBar2 + "%";
        }
      }
      if (CountLeftBar1 - 1 != ParedeMatchEsq) {
        if (CountLeftBar1 > MousePercentLeft) {
          CountLeftBar1--;
          CountLeftBar2--;
          BarraEsq.style.left = CountLeftBar1 + "%";
          BarraDir.style.left = CountLeftBar2 + "%";
        }
      }

      let BarraPercentEsqY = (BarraHitBoxEsq.top * 100) / window.innerHeight;
      let BarraMathLeftY = Math.trunc(BarraPercentEsqY);
      //procura o atual eixo X da bolinha
      for (var Width = 0; Width <= 5; Width++) {
        let blockTextX = "Block" + BallMovY + "/" + (BallMovX - Width);
        let blockTextY = "B" + BallMovY + "/" + (BallMovX + Width);
        let blockFilterX = blockArrayX.find((a) => a == blockTextX);
        let blockFilterY = blockArrayY.find((b) => b == blockTextY);
        //procura o eixo Y da bolinha
        if (Width <= 2) {
          var blockTextYLeft1 = "Block" + (BallMovY + Width) + "/" + BallMovX;
          var blockTextYDir1 = "B" + (BallMovY - Width) + "/" + BallMovX;
          var blockFilterYLeft = blockArrayX.find((c) => c == blockTextYLeft1);
          var blockFilterYDir = blockArrayY.find((d) => d == blockTextYDir1);
        }
        //verifica se os eixos X e Y encontraram uma caixa e muda a variavel
        //tambem altera a cor ou deleta o bloco junto com os arrays.
        if (
          blockFilterX != undefined &&
          document.getElementById(blockFilterX)
        ) {
          Width = 6;
          blockIdTest = 1;
          var BlockId1 = document.getElementById(blockFilterX);
          if (BlockId1.style.background == "red") {
            BlockId1.remove();
            let blockDel1 = blockArrayX.indexOf(blockFilterX);
            console.log(blockDel1);
            blockArrayX.splice(blockDel1, 1);
            blockArrayY.splice(blockDel1, 1);
          } else {
            BlockId1.style.background = "red";
          }
        } else if (
          blockFilterY != undefined &&
          document.getElementsByClassName(blockFilterY)
        ) {
          Width = 6;
          blockIdTest = 2;
          var BlockId2 = document.getElementsByClassName(blockFilterY);
          if (BlockId2[0].style.background == "red") {
            BlockId2[0].remove();
            let blockDel2 = blockArrayY.indexOf(blockFilterY);
            console.log(blockDel2);
            blockArrayX.splice(blockDel2, 1);
            blockArrayY.splice(blockDel2, 1);
          } else {
            BlockId2[0].style.background = "red";
          }
        } else if (
          blockFilterYLeft != undefined &&
          document.getElementById(blockFilterYLeft)
        ) {
          Width = 6;
          blockIdTest = 3;
          var BlockId3 = document.getElementById(blockFilterYLeft);
          if (BlockId3.style.background == "red") {
            BlockId3.remove();
            let blockDel3 = blockArrayX.indexOf(blockFilterYLeft);
            console.log(blockDel3);
            blockArrayX.splice(blockDel3, 1);
            blockArrayY.splice(blockDel3, 1);
          } else {
            BlockId3.style.background = "red";
          }
        } else if (
          blockFilterYDir != undefined &&
          document.getElementsByClassName(blockFilterYDir)
        ) {
          Width = 6;
          blockIdTest = 4;
          var BlockId4 = document.getElementsByClassName(blockFilterYDir);
          if (BlockId4[0].style.background == "red") {
            BlockId4[0].remove();
            let blockDel4 = blockArrayY.indexOf(blockFilterYDir);
            console.log(blockDel4);
            blockArrayX.splice(blockDel4, 1);
            blockArrayY.splice(blockDel4, 1);
          } else {
            BlockId4[0].style.background = "red";
          }
        } else {
          blockIdTest = 0;
        }
      }
      //aqui muda as variaveis conforme a parede.
      if (BallMovX == ParedeMatchEsq) {
        BallDirectionX = "Right";
        BallMovX++;
      } else if (BallMovX == ParedeMatchDir) {
        BallDirectionX = "Left";
        BallMovX--;
      } else if (BallMovY == ParedeMatchTop) {
        BallDirectionY = "Bottom";
        BallMovY++;
      } else if (blockIdTest == 1) {
        if (BallDirectionY == "Top") {
          BallMovY++;
          BallDirectionY = "Bottom";
          blockIdTest = 0;
        }
      } else if (blockIdTest == 2) {
        if (BallDirectionY == "Bottom") {
          BallMovY--;
          BallDirectionY = "Top";
          blockIdTest = 0;
        }
      } else if (blockIdTest == 3) {
        if (BallDirectionX == "Right") {
          BallMovX--;
          BallDirectionX = "Left";
          blockIdTest = 0;
        }
      } else if (blockIdTest == 4) {
        if (BallDirectionX == "Left") {
          BallMovX++;
          BallDirectionX = "Right";
          blockIdTest = 0;
        }
      } else {
        //aqui mantem a bola em movimento
        if (BallDirectionX == "Left") {
          BallMovX--;
        } else if (BallDirectionX == "Right") {
          BallMovX++;
        }
        if (BallDirectionY == "Top") {
          BallMovY--;
        } else if (BallDirectionY == "Bottom") {
          BallMovY++;
        }
      }
      //hitBox do lado esquerdo barra
      if (BallMovY == BarraMathLeftY) {
        BallMovY++;
        for (var Test1 = 0; Test1 < 6; Test1++) {
          let BarraSoma1 = CountLeftBar1 + Test1;
          if (BallMovX == BarraSoma1) {
            BallDirectionY = "Top";
            BallDirectionX = "Left";
            BallMovY--;
          }
        }
        //hitBox do lado direito da barra
        for (var Test2 = 0; Test2 < 6; Test2++) {
          let BarraSoma2 = CountLeftBar2 + Test2;
          if (BallMovX == BarraSoma2) {
            BallDirectionY = "Top";
            BallDirectionX = "Right";
            BallMovY--;
          }
        }
      }
      //por fim da entrada na nova localização da bola.
      Ball.style.left = BallMovX + "%";
      Ball.style.top = BallMovY + "%";
      //alert de fim de jogo e reinicio.
      if (BallMovY == deadZoneMatch) {
        alert("Fim de jogo.");
        location.reload();
      } else if (blockArrayX == []) {
        //nunca consegui ganhar KKKK
        alert("Voce ganhou!");
      }
    }, 35);
  } else {
    return;
  }
}
