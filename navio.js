class Navio{
    constructor(x,y,raio){
        //adiciona a prop corpo no objeto
        this.body = Bodies.circle(x,y,raio);
        //adiciona esse corpo no mundo
        World.add(world, this.body);
        //adiciona a prop imagem
        this.imagem = loadImage("navio.png");
        this.r = raio;
        this.animacao = barcoAnimacao;
        this.speed = 0;
    }
    remove(n){
       this.animacao = barcoAnimacaoQ;
       this.r = 150;
        //adicionar um delay de 1,5s
        //adicionar um intervalo de tempo
        //manda o computador esperar para executar outra função
        setTimeout(()=>{
            //tirar o corpo do mundo
            World.remove(world, navios[n].body)
            //deletar o objeto da matriz
            delete navios[n];
        }, 1500 );
    
    }
    
    animar(){
        this.speed +=0.05;
    }

    show(){
        //facilita sua vida
        var pos = this.body.position;
        var indice = Math.floor( this.speed % this.animacao.length )

        //atualizar as configurações
        push ();
        //posiciona as imagens pelo centro
        imageMode (CENTER);
        //coloca a imagem
        image (this.animacao[indice], pos.x, pos.y, this.r*2, this.r*2)

        //voltar para as configurações antigas
        pop ()
    }
}