function Level(){
  this.enemies = [];
  this.tiros = [];
  this.number  = 1;
  this.maxEnemies  = 1;

  this.desenhar = function(ctx){
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].desenhar(ctx);
    }
    for (var i = 0; i < this.tiros.length; i++) {
      this.tiros[i].desenhar(ctx);
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

  this.mover = function(dt){
    for (var i = 0; i < this.enemies.length; i++) {
      for (var j = i+1; j < this.enemies.length; j++) {
        this.enemies[i].repelir(this.enemies[j]);
      }
      this.enemies[i].mover(dt);
    }
    for (var i = 0; i < this.tiros.length; i++) {
      this.tiros[i].mover(dt);
    }
  }

  this.iniciar = function(){
    for (var i = 0; i < this.maxEnemies; i++) {
      var novoInimigo =  new Sprite();
      novoInimigo.x = 200 - 100*Math.random();
      novoInimigo.y =  50 + i*20 - 50*Math.random();
      novoInimigo.vm = 10+40*Math.random();
      novoInimigo.width = novoInimigo.height = 10+10*Math.random();
      novoInimigo.color = "red";
      this.enemies.push(novoInimigo);
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

  this.tiro = function(x, y, dir){
      var tiro = new Sprite();
      tiro.x = x;
      tiro.y = y;
      tiro.color = "gold";
      tiro.width = 3;
      tiro.height = 3;
      switch (dir) {
        case 1:
          tiro.vx = -200;
        break;
        case 2:
          tiro.vy = -200;
        break;
        case 3:
          tiro.vx = +200;
        break;
        case 4:
          tiro.vy = +200;
        break;
      }
      this.tiros.push(tiro);
  }
}