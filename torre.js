//cria um protótipo de objeto
class Torre{
    //constructor define o que acontece quando o objeto é criado
    constructor(x,y,largura, altura){
        //define que está parado
        var parado = {isStatic:true};
        //atribui um corpo ao objeto da classe Torre
        this.body = Bodies.rectangle(x,y,largura, altura, parado);
        World.add(world, this.body);
        //atribui a propriedade imagem
        this.imagem = loadImage("torre.png");
        //atribui a propriedade largura e a propriedade altura
        this.largura = largura;
        this.altura = altura;
    }
    //método que mostra o corpo
    show(){
        //muda as configurações
        push ();
        //posiciona a imagem pelo centro
        imageMode (CENTER);
        //guarda a posição do corpo em pos
        var pos = this.body.position;
        //coloca a imagem
        image (this.imagem, pos.x, pos.y, this.largura, this.altura);
        //volta para as configurações antigas
        pop ()
    }

}