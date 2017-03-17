function Level(){
	this.enemies = 1;
	this.number = 1;

	this.desenhar = function(ctx){
		ctx.fillStyle = "yellow";
		ctx.strokeStyle = "black"; //Contornar de preto
		ctx.font = "1em Arial Black"; //Tamanho da fonte
		var texto = "Level:"+ this.number + " Enemies:" +this.enemies;
		ctx.fillText(texto, 100, 20);
		ctx.strokeText(texto, 100, 20);
	}
}

