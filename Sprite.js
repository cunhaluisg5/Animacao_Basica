function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.vm = 50;
  this.width = 10;
  this.height = 10;
  this.color = "black";

  this.mover = function(dt){
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
  }

  this.desenhar = function(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  };

  this.colidiuCom = function(alvo){
    if(this.y+this.height < alvo.y) return false;
    if(this.y > alvo.y+alvo.height) return false;
    if(this.x+this.width < alvo.x) return false;
    if(this.x > alvo.x+alvo.width) return false;
    return true;

  }

  this.repelir = function(alvo){
    var dx = this.x-alvo.x;
    var dy = this.y-alvo.y;
    var raio = Math.sqrt(
      Math.pow(dx,2)+
      Math.pow(dy,2)
    );
    var dim = Math.max(this.width, this.height);
    if(raio > dim) return;
    this.vx += 20*dim*dx/(raio*raio);
    this.vy += 20*dim*dy/(raio*raio);
  }

  this.perseguir = function (alvo) {
    var dx = (alvo.x - this.x);
    var dy = (alvo.y - this.y);
    var dist = Math.sqrt(dx*dx+dy*dy);
    this.vx = this.vm*dx/(dist);
    this.vy = this.vm*dy/(dist);

  }
}