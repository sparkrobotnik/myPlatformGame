import Jogador	from "./Classes/Jogador.js";
import Stage		from "./Classes/Stage.js";
import Paleta		from "./Classes/Paleta.js";

// o jogo inicia depois de toda a pagina ter carregado
$(document).ready(() => {
	// escala dos graficos do jogo
	var gameScale = 3;
	
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
	
	
	// instancia o objeto do jogador
	var jogador = new Jogador(ctx, "Recursos/Sprites/boy.png", 64, 16);
	
	// para renderizar e atualizar, todas as entidade/objetos ficam
	// dentro deste array e adiciona o jogador para esse array
	var entidades = [];
	entidades.push(jogador);
	
	// instancia uma fase onde todos as entidades vão interagir
	var stage = new Stage("Recursos/Sprites/tileset_teste.png", 16, 16, 14, 6);
	stage.carregar("Recursos/Fases/fase01.json");
	
	// funcao onde o jogo inteiro é executado
	const gameLoop = (timeStamp) => {
		// limpa a tela para o proximo frame ser desenhado
		ctx.fillStyle = Paleta.azul;
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		// renderiza a fase
		stage.draw(ctx, gameScale);
		
		// atualiza e "desenha" todas as entidades no canvas/tela
		entidades.forEach((entidade) => {
			entidade.draw(gameScale);
			let resposta = entidade.update(1, stage.grid);
		});
		
		// calcular fps
		secondsPassed = (timeStamp - oldTimeStamp) / 1000;
		oldTimeStamp = timeStamp;
		fps = Math.round(1 / secondsPassed);
		
		// exibir fps
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 50, 15);
		ctx.font = '15px Arial';
		ctx.fillStyle = 'black';
		ctx.fillText("FPS: " + fps, 0, 15);
		
		// espera a disponibilidade para executar o proximo frame
		requestAnimationFrame(gameLoop);
	}
	
	// esperar a disponibilidade para executar o primeiro frame
	requestAnimationFrame(gameLoop);
});