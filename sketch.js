let imgOriginal;
let imgGray;
let imgRuido;
let porcentagemRuido = 0.2;
let filtroAtual =1;
async function setup() {
  imgOriginal = await loadImage("assets/Raptor.png");
  imgGray = await loadImage("assets/Raptor.png");
  imgGray.filter(GRAY);
  createCanvas(1000, 1250);
}

function draw() {
  background(240);

  fill(0);
  textSize(16);
  text('CONTROLES DOS FILTROS',10,25);
  text('1 - Imagem Original',10,50);
  text('2 - Tons de Cinza',10,75);
  text('3 - Ruído(20%)',10,100);
  text('4 - Tons Vermelhos',10,125);
  text('5 - Tons Amarelos',10,150);

  
  Filtros();
}

function Filtros(){
  if(filtroAtual=='1'){
    image(imgOriginal,0,170);
  }
  if(filtroAtual == '2'){
    image(imgGray,0,170);
  }
  if(filtroAtual == '3'){
    image(imgRuido,0,170);
  }
  if(filtroAtual == '4'){
    tint(255,0,0);
    image(imgOriginal,0,170);
    noTint();
  }
  if(filtroAtual == '5'){
    tint(255,255,0);
    image(imgOriginal,0,170);
    noTint();
  }
}

//função a parte para  o ruido
function aplicarRuido(imagem,porcentagem){
  imagem.loadPixels();
  let totalPixels = imagem.width * imagem.height;

  let quantidadeRuido = Math.floor(totalPixels * porcentagem);

  let indices = [];

  //lista com os indices dos pixels
  for(let i =0; i<totalPixels;i++){
    indices.push(i);
  }

  //seleciona os pixels aleatorios sem repetir
  for(let i = 0;i<quantidadeRuido;i++){
    let sorteio = floor(random(i,totalPixels));

    [indices[i],indices[sorteio]] = [indices[sorteio],indices[i]];

    let posicao = indices[i] *4;

    //define se o pixel será preto ou branco
    let valor = random() <0.5 ? 0: 255;

    imagem.pixels[posicao] = valor;
    imagem.pixels[posicao+1] = valor;
    imagem.pixels[posicao+2] = valor;
  }
  imagem.updatePixels();
}


function keyPressed(){
  if(key == '1'){
    filtroAtual = 1;
  }
  if(key == '2'){
    filtroAtual = 2;
  }
  if(key == '3'){
    imgRuido = imgOriginal.get();
    aplicarRuido(imgRuido,porcentagemRuido);
    filtroAtual = 3;
  }
  if(key == '4'){
    filtroAtual = 4;
  }
  if(key == '5'){
    filtroAtual = 5;
  }
}