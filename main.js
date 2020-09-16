import Util			from "./Classes/Util.js";
import Stage		from "./Classes/Stage.js";
import Paleta		from "./Classes/Paleta.js";
import Gamepad	from "./Classes/Gamepad.js";

// o jogo inicia depois de toda a pagina ter carregado
$(document).ready(() => {
	// escala dos graficos do jogo
	var escala = 3;
	var pausa = false;
	Gamepad.iniciar();
	
	// variaveis para contagem de fps
	var secondsPassed = 0, oldTimeStamp = 0, fps = 0;
	
	// definir o contexto para exibir/desenhar os graficos na tela
	const ctx = document.getElementById("canvas").getContext("2d");
	
	// impede que os pixels saiam borrados, mantendo o aspecto 
	// da pixel art
	ctx.imageSmoothingEnabled = false;
	
	// definir as dimensoes do canvas/tela do jogo
	if(window.innerHeight < 360){
		ctx.canvas.height = window.innerHeight	- 2;
		ctx.canvas.width	= window.innerWidth 	- 2;
	}
	
	// instancia uma fase onde todos as entidades vão interagir.
	// carrega layout da fase, jogador, inimigos, etc apartir de
	// um arquivo .json
	var stage = new Stage("Recursos/Fases/fase01.json");
	
	// funcao onde o jogo inteiro é executado
	const gameLoop = (timeStamp) => {
		
		// limpa a tela para o proximo frame ser desenhado
		ctx.fillStyle = Paleta.azul;
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		// renderiza e atualiza a fase
		Gamepad.update();
		stage.update();
		stage.draw(ctx, escala);
		
		// calcular fps
		secondsPassed = (timeStamp - oldTimeStamp) / 1000;
		oldTimeStamp = timeStamp;
		fps = Util.clamp(Math.floor(1 / secondsPassed), 0, 60);
		
		// exibir fps
		ctx.fillStyle = "white";
		ctx.fillRect(0, ctx.canvas.height - 15, 50, 15);
		ctx.font = '15px Arial';
		ctx.fillStyle = 'black';
		ctx.fillText("FPS: " + fps, 0, ctx.canvas.height);
		
		// espera a disponibilidade para executar o proximo frame
		requestAnimationFrame(gameLoop);
		
	}
	
	// esperar a disponibilidade para executar o primeiro frame
	requestAnimationFrame(gameLoop);
});