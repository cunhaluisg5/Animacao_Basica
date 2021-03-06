function Level(){
  this.enemies = [];
  this.tiros = [];
  this.obstaculos = [];
  this.number  = 1;
  this.maxEnemies  = 1;
  this.maxObstaculos  = 1;

  this.desenhar = function(ctx){
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].desenharImg(ctx);
    }
    for (var i = 0; i < this.tiros.length; i++) {
      this.tiros[i].desenhar(ctx);
    }
    for (var i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].desenhar(ctx);
    }

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black";
    ctx.font = "1em Arial Black";
    var texto = "Level: " + this.number + " Enemies: " +this.enemies.length;
    ctx.fillText(texto, 100, 20); //fillText () para desenhar texto preencher na tela. A cor do texto padrão é preto. 
    ctx.strokeText(texto, 100, 20); //O strokeText() método desenha o texto (sem preenchimento) na tela. A cor padrão do texto é preto. 
  }

  this.perseguir = function(alvo){
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].perseguir(alvo);
    }
  }
  this.perseguirAng = function(alvo){
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].perseguirAng(alvo);
    }
  }

  this.mover = function(dt){
    for (var i = 0; i < this.enemies.length; i++) {
      for (var j = i+1; j < this.enemies.length; j++) {
        this.enemies[i].repelir(this.enemies[j]);
      }
      for (var j = 0; j < this.obstaculos.length; j++) {
        this.enemies[i].repelir(this.obstaculos[j]);
      }

      this.enemies[i].mover(dt);
    }
    for (var i = 0; i < this.tiros.length; i++) {
      this.tiros[i].mover(dt);
    }
  }
  this.moverAng = function(dt){
    for (var i = 0; i < this.enemies.length; i++) {
      for (var j = i+1; j < this.enemies.length; j++) {
        this.enemies[i].repelir(this.enemies[j]);
      }
      for (var j = 0; j < this.obstaculos.length; j++) {
        this.enemies[i].repelir(this.obstaculos[j]);
      }
      this.enemies[i].moverAng(dt);
    }
    for (var i = 0; i < this.tiros.length; i++) {
      this.tiros[i].moverAng(dt);
    }
  }

  this.repelirObstaculos = function(alvo){
    for(var j =0; j< this.obstaculos.length; j++) {
      alvo.repelir(this.obstaculos[j]);
    }
  }

  this.iniciar = function(){
    for (var i = 0; i < this.maxEnemies; i++) {
      var novoInimigo =  new Sprite();
      novoInimigo.x = 200 - 100*Math.random(); //A função  Math.random() retorna um ponto de flutuação, números pseudo-aleatórios em uma variação [0, 1) ou seja, de 0 (inclusivo) até, mas não incluindo, 1 (exclusivo), que depois você pode dimensionar para a sua variação desejada.
      novoInimigo.y =  50 + i*20 - 50*Math.random();
      novoInimigo.angle = 360*Math.random();
      novoInimigo.vm = 10+30*Math.random();
      novoInimigo.width = novoInimigo.height = 40+10*Math.random();
      novoInimigo.height = novoInimigo.width;
      novoInimigo.color = "red";
      this.enemies.push(novoInimigo); //O método push() adiciona um ou mais elementos ao final de um array e retorna o comprimento desse array.
      novoInimigo.img = imgPC;
      novoInimigo.clip = {x: 257, y: 215, w: 116, h:138};
    }
    for (var i = 0; i < this.maxObstaculos; i++) {
      var novoObstaculo =  new Sprite();
      novoObstaculo.x = 300-300*Math.random();
      novoObstaculo.y = 30+i*110;
      novoObstaculo.height = 80;
      novoObstaculo.width = 60;
      novoObstaculo.angle = -90;
      novoObstaculo.desenhar = desenharBarril;
      this.obstaculos.push(novoObstaculo);
    }
  }

  this.testarColisao = function(alvo){
    for (var i = 0; i < this.enemies.length; i++) {
      if(alvo.colidiuCom(this.enemies[i])){
        this.enemies[i].color = "green";
        alvo.vidas--;
        this.enemies[i].x = 300-600*Math.random();
        this.enemies[i].y = 100-200*Math.random();
      } else {
        this.enemies[i].color = "red";
      }
    }

  }

  this.testarColisaoTiros = function(){
    for (var i = 0; i < this.enemies.length; i++) {
      for (var j = this.tiros.length-1; j>=0; j--) {
        if(this.tiros[j].colidiuCom(this.enemies[i])){
          this.enemies[i].color = "green";
          this.enemies[i].x = 300-600*Math.random();
          this.enemies[i].y = 100-200*Math.random();
          this.tiros[j].x = -2000;
          this.tiros[j].y = -2000;
          this.tiros.splice(j,1); //O método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
        } else {
          this.enemies[i].color = "red";
        }
      }
    }
    for (var j =  this.tiros.length-1;j>=0; j--) {
      if(
        this.tiros[j].x > 1000 || this.tiros[j].x < -1000 ||
        this.tiros[j].y > 1000 || this.tiros[j].y < -1000)
        {
          this.tiros.splice(j,1);
        }
    }
  }

  this.tiro = function(atirador){
      var tiro = new Sprite();
      tiro.x = atirador.x;
      tiro.y = atirador.y;
      tiro.angle = atirador.angle;
      tiro.vm = 200;
      tiro.color = "gold";
      tiro.width = 3;
      tiro.height = 3;
      this.tiros.push(tiro);
  }


}


function desenharBarril(ctx){
  ctx.save();
  ctx.translate(this.x,this.y);
  ctx.rotate((this.angle+90) *Math.PI/180);

  ctx.drawImage(imgBarril, -this.width/2, -this.height/2, this.width, this.height);
  ctx.strokeStyle = "grey";
  ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  ctx.restore();
}