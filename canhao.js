//cria um protótipo de objeto
class Canhao{
    //constructor define o que acontece quando o objeto é criado
    constructor(x,y,largura, altura, angulo){
        //define que está parado
        var parado = {isStatic:true};
        //atribui um corpo ao objeto da classe CANHAO
        this.body = Bodies.rectangle(x,y,largura, altura, parado);
        World.add(world, this.body);
        //atribui a propriedade imagem
        this.canhaoBaseImg = loadImage("base.png");
        this.canhaoImg = loadImage("canhao.png");
        //atribui a propriedade largura e a propriedade altura
        this.largura = largura;
        this.altura = altura;
        this.angulo = angulo;
    }
    //método que coloca imagens no corpo invisível
    show(){
        
        if(keyIsDown(LEFT_ARROW)&&this.angulo>=-45){
            this.angulo--;
        }
        if(keyIsDown(RIGHT_ARROW)&&this.angulo<=65){
            this.angulo++;
        }        

        var pos = this.body.position;
        push();
        translate(pos.x, pos.y)
        rotate (this.angulo);
        image(this.canhaoImg, 0, 0, this.largura, this.altura);
        pop();
        image(this.canhaoBaseImg, 170, 130, 200, 200);

    }

}