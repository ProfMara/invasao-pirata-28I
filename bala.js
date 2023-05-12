class Bala{
    constructor(x,y, raio){
        var parado = {isStatic:true}
        //atribui um corpo ao objeto da classe CANHAO
        this.body = Bodies.circle(x,y,raio, parado);
        World.add(world, this.body);
        this.imagem = loadImage("bala.png");
        this.raio = raio;
        this.trajetoria = [];
        
    }
    remove(i){
        //adicionar um delay de 1,5s
        //adicionar um intervalo de tempo
        //manda o computador esperar para executar outra função
        setTimeout(()=>{
            //tirar o corpo do mundo
            World.remove(world, balas[i].body)
            //deletar o objeto da matriz
            delete balas[i];
        }, 1500 );
    
    }
    
    shoot(){
        //pegar o ângulo do canhão
        var angulo = canhao.angulo - 28;
        //converter para radiano
        angulo *= 3.14/180;
        //converter para vetor
        var v = p5.Vector.fromAngle(angulo);
        //converter para graus
        v.mult(90/3.14);
        //deixa móvel
        Body.setStatic(this.body, false);
        //define a velocidade
        Body.setVelocity(this.body, {x: v.x , y: v.y})
    }
    show(){
        push ();
        //posiciona a imagem pelo centro
        imageMode (CENTER);
        //guarda a posição do corpo em pos
        var pos = this.body.position;
        //coloca a imagem
        image (this.imagem, pos.x, pos.y, this.raio*2, this.raio*2);
        //volta para as configurações antigas
        pop ()
        //checa se a bala tem velocidade e checar se a bala já saiu do canhão
        if(this.body.velocity.x >0 && pos.x > 100){
            //cria uma matriz com as posições da bala
            var position = [pos.x, pos.y];
            //adiciona na matriz trajetoria
            this.trajetoria.push(position);
        }
        //iterar ou percorrer a matriz trajetoria
        for(var i = 0; i < this.trajetoria.length; i++){
            image (this.imagem, this.trajetoria[i][0],this.trajetoria[i][1], 5,5);
        }
    }
}