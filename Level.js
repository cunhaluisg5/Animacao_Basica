function Level(){
  this.enemies = [];
  this.tiros = [];
  this.obstaculos = [];
  this.number  = 1;
  this.maxEnemies  = 1;
  this.maxObstaculos  = 1;

  this.desenhar = function(ctx){
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].desenhar(ctx);
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
    ctx.fillText(texto, 100, 20);
    ctx.strokeText(texto, 100, 20);
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
      novoInimigo.x = 200 - 100*Math.random();
      novoInimigo.y =  50 + i*20 - 50*Math.random();
      novoInimigo.angle = 360*Math.random();
      novoInimigo.vm = 10+30*Math.random();
      novoInimigo.width = novoInimigo.height = 10+10*Math.random();
      novoInimigo.color = "red";
      this.enemies.push(novoInimigo);
    }
    for (var i = 0; i < this.maxObstaculos; i++) {
      var novoObstaculo =  new Sprite();
      novoObstaculo.x = 300;
      novoObstaculo.y = 30+i*50;
      novoObstaculo.height = 30;
      novoObstaculo.width = 30;
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
          this.tiros.splice(j,1);
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