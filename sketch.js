const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
//facilitar a sua vida
const Body = Matter.Body;

var engine, world, ground;
var solo, parado;
var cenario;
var torre, torreIMG;

var angulo = 15;

//CRIAR A MATRIZ DE BALAS VAZIA
var balas = [];
var navios = [];

var barcoSpriteSheet;
var dadosJSON;
var barcoAnimacao = [];
var barcoSpriteSheetQ;
var dadosJSONQ;
var barcoAnimacaoQ = [];

function preload(){
    //carrega a imagem do fundo
    cenario = loadImage("fundo.gif");
    //carregar os arquivos necessários
    barcoSpriteSheet = loadImage("./boat/boat.png");
    dadosJSON = loadJSON("./boat/boat.json");
    
    barcoSpriteSheetQ = loadImage("./boat/brokenBoat.png");
    dadosJSONQ = loadJSON("./boat/brokenBoat.json");
}


function setup() {
    canvas = createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;

    parado = { isStatic: true };

    solo = Bodies.rectangle(width/2, height-2, width*2, 15, parado);
    World.add(world, solo);

    angleMode(DEGREES);
    //cria um objeto da classe Torre
    torre = new Torre(160, 350,150,310);
    canhao = new Canhao(180, 125, 130, 100,angulo);

    var frames = dadosJSON.frames;
    //percorrer a matriz de frames
    for(var i = 0; i < frames.length; i++){
        //facilitar a vida de novo..
        var pos = frames[i].position;
        //recortar a imagem
        var img = barcoSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        //adicionar o frame na matriz
        barcoAnimacao.push(img);
    }
    
    var f = dadosJSONQ.frames;
    //percorrer a matriz de frames
    for(var i = 0; i < f.length; i++){
        //facilitar a vida de novo..
        var pos = f[i].position;
        //recortar a imagem
        var img = barcoSpriteSheetQ.get(pos.x, pos.y, pos.w, pos.h);
        //adicionar o frame na matriz
        barcoAnimacaoQ.push(img);
    }


    rectMode(CENTER);
    imageMode (CENTER)
}

function draw() {
    Engine.update(engine);
    background("cyan");
    //coloca uma imagem no meio do jogo
    image(cenario, width/2, height/2, width, height)

    fill("green")
    rect(solo.position.x, solo.position.y, width, 15);

    //mostra o canhao
    canhao.show();    
    //mostra a torre
    torre.show();
    mostrarNavios()
    for(var i = 0; i < balas.length; i++ ){
        if(balas[i] !== undefined){
            //mostrar a bala
            balas[i].show();

            if(balas[i].body.position.y > height-50 || balas[i].body.position.x >= width){
                balas[i].remove(i)
            }
            colidiu(i);
        }         
    }
  
}
//aciona os códigos quando qualquer tecla é apertada
function keyPressed(){
    //checa se a tecla apertada é espaço
    if(keyCode==32){
        //cria o objeto bala
        bala = new Bala(180,125,15);
        //chama o método shoot da classe
        bala.shoot();
        //adiciona a bala na matriz
        balas.push(bala);
    }
}

function mostrarNavios(){
    if(navios.length>0){
        if(navios[navios.length-1] == undefined || navios[navios.length-1].body.position.x < 900){
            navio = new Navio(width-50, height-50, 85);
            navios.push(navio)
        } 
        for(var i = 0; i < navios.length; i++ ){
            if(navios[i] !== undefined){
                //mostrar a bala
                navios[i].show();
                navios[i].animar();
                Body.setVelocity(navios[i].body, {x:-1, y:0})
                //checar se colidiu com a torre
                
            }         
        }
    }else{
        navio = new Navio(width-50, height-50, 85);
        navios.push(navio)
    }
}

function colidiu(i){
    //percorre a matriz de navios
    for(var n = 0; n < navios.length; n++){
        //checar se o navio e se a bala existem
        if(balas[i]!== undefined && navios[n] !== undefined){
            //guarda na memória o resultado da função
            var colisao = Matter.SAT.collides(balas[i].body, navios[n].body);
            //checa se houve a colisao
            if(colisao.collided == true){
               
                //chamar o método remove() da classe
                balas[i].remove(i);
                navios[n].remove(n)
            }

        }
    }
}
