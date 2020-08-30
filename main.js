import Jogador from "./Classes/Jogador.js";

$(document).ready(() => {
	const ctx = document.getElementById("canvas").getContext("2d");
	ctx.imageSmoothingEnabled = false;
	$("#canvas").width(window.innerWidth -5);
	$("#canvas").height(window.innerHeight - 5);
	
	var jogador = new Jogador(ctx, "boy.png", 64, 16);
	var coop = new Jogador(ctx, "boy.png", 64, 16);

	const gameLoop = () => {
		ctx.clearRect(0, 0, $("#canvas").width(), $("#canvas").height());
		
		var testex		= 128;
		jogador.x			= testex;
		coop.x				= testex;
		coop.y				= 48;
		coop.animDirX = -1;
		
		
		jogador.draw();
		coop.draw();
		requestAnimationFrame(gameLoop);
	}
	requestAnimationFrame(gameLoop);
	
});