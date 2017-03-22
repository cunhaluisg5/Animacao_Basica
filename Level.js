function Level(){
  this.enemies = [];
  this.number  = 1;
  this.maxEnemies  = 1;

  this.desenhar = function(ctx){
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].desenhar(ctx);
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
      this.enemies[i].vx = this.enemies[i].vm*(alvo.x - this.enemies[i].x)/200;
      this.enemies[i].vy = this.enemies[i].vm*(alvo.y - this.enemies[i].y)/200;
    }
  }

  this.mover = function(dt){
    for (var i = 0; i < this.enemies.length; i++) {
      for (var j = i+1; j < this.enemies.length; j++) {
        this.enemies[i].repelir(this.enemies[j]);
      }
      this.enemies[i].mover(dt);
    }
  }

  this.iniciar = function(){
    for (var i = 0; i < this.maxEnemies; i++) {
      var novoInimigo =  new Sprite();
      novoInimigo.x = 200 - 100*Math.random();
      novoInimigo.y =  50 + i*20 - 50*Math.random();
      novoInimigo.vm = 70+80*Math.random();
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
}