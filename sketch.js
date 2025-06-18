let xJogador = [];

let yJogador = [];

let jogador = ["😎", "❤️", "👽", "🚘"];

let teclas = ["a", "s", "d", "f"];

let quantidade = jogador.length;

let venceu = false;

let botaoReset;

let velocidade = [];

function setup() {

  createCanvas(400, 400);

  textAlign(CENTER, CENTER);

  textSize(48);

  for (let i = 0; i < quantidade; i++) {

    xJogador[i] = 10;

    yJogador[i] = 75 + i * 75;

    velocidade[i] = 0;

  }

  botaoReset = createButton('🔁 Jogar novamente');

  botaoReset.position(120, height + 10);

  botaoReset.mousePressed(resetarJogo);

  botaoReset.hide();

  botaoReset.style('font-size', '18px');

  botaoReset.style('padding', '10px');

  botaoReset.style('background-color', '#7CFC00');

  botaoReset.style('border-radius', '10px');

  botaoReset.style('border', 'none');

}

function draw() {

  if (!venceu) {

    desenhaCenario();

    desenhaLinhaDeChegada();

    desenhaJogadores();

    desenhaHUD();

    atualizarMovimento();

  }

}

function desenhaCenario() {

  background(100, 200, 100); // grama

  fill(120);

  rect(0, 60, width, 300); // asfalto

  stroke(255);

  strokeWeight(2);

  for (let i = 0; i < 6; i++) {

    line(0, 75 + i * 75, width, 75 + i * 75); // faixas da pista

  }

  noStroke();

}

function desenhaJogadores() {

  for (let i = 0; i < quantidade; i++) {

    fill(0, 0, 0, 100); // sombra

    text(jogador[i], xJogador[i] + 3, yJogador[i] + 3);

    fill(255);

    text(jogador[i], xJogador[i], yJogador[i]);

  }

}

function desenhaLinhaDeChegada() {

  for (let y = 60; y <= 360; y += 20) {

    fill("white");

    rect(350, y, 10, 10);

    fill("black");

    rect(360, y, 10, 10);

  }

}

function desenhaHUD() {

  fill(255);

  textSize(18);

  text("Jogadores: " + quantidade, width / 2, 20);

  text("Teclado: A S D F ou clique no jogador!", width / 2, 40);

}

function keyPressed() {

  for (let i = 0; i < quantidade; i++) {

    if (key.toLowerCase() === teclas[i]) {

      velocidade[i] += 2;

    }

  }

}

function mousePressed() {

  for (let i = 0; i < quantidade; i++) {

    if (

      mouseY > yJogador[i] - 30 &&

      mouseY < yJogador[i] + 30

    ) {

      velocidade[i] += 2;

    }

  }

}

function touchStarted() {

  mousePressed();

}

function atualizarMovimento() {

  for (let i = 0; i < quantidade; i++) {

    if (velocidade[i] > 0) {

      xJogador[i] += velocidade[i];

      velocidade[i] *= 0.95; // desaceleração suave

    }

    if (xJogador[i] > 350 && !venceu) {

      venceu = true;

      background(255, 255, 150);

      textSize(44);

      fill(0);

      text(jogador[i] + " venceu!", width / 2, height / 2);

      botaoReset.show();

      noLoop();

    }

  }

}

function resetarJogo() {

  for (let i = 0; i < quantidade; i++) {

    xJogador[i] = 10;

    velocidade[i] = 0;

  }

  venceu = false;

  loop();

  botaoReset.hide();

}