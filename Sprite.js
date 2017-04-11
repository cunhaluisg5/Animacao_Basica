function Sprite(){
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.vx = 0;
  this.vy = 0;
  this.vang = 0;
  this.vm = 0;
  this.width = 10;
  this.height = 10;
  this.color = "black";

  this.mover = function(dt){
    this.angle = this.angle + this.vang*dt;
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
  }
  this.moverAng = function(dt){
    this.angle = this.angle + this.vang*dt;
    this.vx = this.vm*Math.cos(this.angle*Math.PI/180);
    this.vy = this.vm*Math.sin(this.angle*Math.PI/180);
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
  }

  this.desenhar = function(ctx){
    ctx.save(); //save() guarda o estado atual do canvas, os dados guardados podem ser recuperados com o restore()
    ctx.translate(this.x,this.y); //translate() é um método é usado para mover o canvas e sua origem para um ponto diferente do grid.
    ctx.rotate((this.angle+90) *Math.PI/180); //rotate() é usado para rotacionar o canvas em torno da origem atual.
    //Rotaciona o canvas no sentido horário em torno da origem atual com o ângulo angle em radianos.
    ctx.fillStyle = this.color;
    //ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    ctx.beginPath(); //beginPath() inicia um novo caminho (path), esvaziando a lista de sub-caminhos (sub-paths). Use esse método quando você quiser criar um novo path.
    //O beginPath() método começa um caminho, ou redefine o caminho atual. 
    ctx.moveTo(0, -this.height/2); //moveTo() move o ponto inicial de um novo sub-caminho (sub-path) para as coordenadas (x, y).
    //O moveTo() método move o caminho para o ponto especificado na tela, sem a criação de uma linha. 
    ctx.lineTo(this.width/2, this.height/2); //lineTo() conecta o último ponto do sub-caminho (sub-path) para as coordenadas x, y, através de uma linha (mas na realidade não a desenha).
    //O lineTo() método adiciona um novo ponto e cria uma linha a partir desse ponto até o último ponto especificado na tela (este método não desenhou a linha). 
    ctx.lineTo(-this.width/2, this.height/2);
    ctx.closePath(); //closePath() faz o ponto da caneta (pen) mover-se de volta para o início do sub-caminho (sub-path) atual. Tenta adicionar uma nova linha (mas não a desenha realmente) que conecta o ponto atual até o ponto inicial. Se a região (shape) já estiver fechada, ou tem somente um ponto na tela, esta função não funciona.
    //O closePath() método cria um caminho a partir do ponto atual de volta ao ponto de partida. 
    ctx.fill(); //fill() preenche um dado path ou o path atual com o estilo atual de preenchimento usando uma regra de controle diferente de zero, ou uma regra par-ímpar.
    //O fill() método preenche o desenho atual (caminho). A cor padrão é preto.
    ctx.stroke(); //stroke() contorna um dado path ou o path atual com o estilo atual de traçado usando uma regra de controle diferente de zero.
    //O stroke() método realmente desenha o caminho que você definiu com todos aqueles moveTo() e lineTo() métodos. A cor padrão é preto.
    ctx.strokeStyle = "grey"; //Os strokeStyle conjuntos de propriedades ou retorna a cor, gradiente ou padrão usado para golpes.
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height); //strokeRect() desenha um retângulo na posição (x, y), que possui uma largura (width) w e uma altura (height) h, e não tem nenhum preenchimento (estilo stroke).
    ctx.restore(); //restore() restaura para o estado do canvas mais recente.
  };

  this.colidiuCom = function(alvo){
    if(this.y+this.height/2 < alvo.y-alvo.height/2) return false;
    if(this.y-this.height/2 > alvo.y+alvo.height/2) return false;
    if(this.x+this.width/2 < alvo.x-alvo.width/2) return false;
    if(this.x-this.width/2 > alvo.x+alvo.width/2) return false;
    return true;

  }

  this.repelir = function(alvo){
    var dx = this.x-alvo.x;
    var dy = this.y-alvo.y;
    var raio = Math.sqrt( //A função Math.sqrt () retorna a raiz quadrada de um número.
      Math.pow(dx,2)+ //Math.pow() retorna a base elevada ao expoente.
      Math.pow(dy,2)
    );
    var dim = Math.max(this.width, this.height, alvo.width, alvo.height); //Math.max() retorna o maior número de um ou mais números.
    if(raio > dim) return;
    this.x += 20*dim*dx/(raio*raio)*dt;
    this.y += 20*dim*dy/(raio*raio)*dt;
  }

  this.perseguir = function (alvo) {
    var dx = (alvo.x - this.x);
    var dy = (alvo.y - this.y);
    var dist = Math.sqrt(dx*dx+dy*dy);
    this.vx = this.vm*dx/(dist);
    this.vy = this.vm*dy/(dist);
  }
  this.perseguirAng = function(alvo){
    var dX = alvo.x - this.x;
    var dY = alvo.y - this.y;
    var dist = Math.sqrt(dX*dX+dY*dY);
    dX = dX/dist;
    dY = dY/dist;
    dA = Math.acos(dX); //Math.acos() retorna o arco cosseno (em radianos de um numero.
    var tX = Math.cos(this.angle*Math.PI/180); //Math.cos() retorna o cosseno de um número.
    var tY = Math.sin(this.angle*Math.PI/180); //Math.sin() retorna o seno de um número
    var prod = dX*tX + dY*tY;
    if(dA>this.angle){
      this.vang = -180*(1 - prod);
    } else {
      this.vang = 180*(1 - prod);
    }
  }

  this.desenharImg = function (ctx){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate((this.angle+90) *Math.PI/180);

    ctx.drawImage(this.img, //O drawImage() método desenha uma imagem, lona, ou vídeo para a tela. 
    //O drawImage() método também pode desenhar partes de uma imagem, e / ou aumentar / reduzir o tamanho da imagem. 
      this.clip.x, this.clip.y, this.clip.w, this.clip.h,
      -this.width/2, -this.height/2, this.width, this.height);
    ctx.strokeStyle = "grey";
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
    ctx.restore();
  }
}