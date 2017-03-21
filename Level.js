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
    var texto = "Level: " + this.number + " Enemies: " +this.enemies;
    ctx.fillText(texto, 100, 20);
    ctx.strokeText(texto, 100, 20);
  }

  this.mover = function(dt){
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].mover(dt);
    }
  }

  this.inicia = function(){
    for (var i = 0; i < this.maxEnemies; i++) {
      var novoInimigo =  new Sprite();
      novoInimigo.x = 200;
      novoInimigo.y = 50+i*20;
      novoInimigo.color = "red";
      this.enemies.push(novoInimigo);
    }
  }
}