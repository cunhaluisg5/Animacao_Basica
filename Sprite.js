function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.vm = 150;
  this.color = "black";

  this.mover = function(dt){
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
  }

  this.desenhar = function(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 10, 10);
  };

  this.colidiuCom = function(alvo){
    if(this.y+10 < alvo.y) return false;
    if(this.y > alvo.y+10) return false;
    if(this.x+10 < alvo.x) return false;
    if(this.x > alvo.x+10) return false;
    return true;

  }
}