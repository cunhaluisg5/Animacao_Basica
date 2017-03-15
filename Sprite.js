function Sprite(){
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.vm = 150;

  this.mover = function(dt){
    this.x = this.x + this.vx*dt;
    this.y = this.y + this.vy*dt;
  }

  this.desenhar = function(ctx){
    ctx.fillRect(this.x, this.y, 10, 10);
  };
}