import Jogador from "./Classes/Jogador.js";

// o jogo inicia depois de toda a pagina ter carregado
$(document).ready(() => {
	
	// definir o contexto para exibir/desenhar os graficos na tela
	const ctx = document.getElementById("canvas").getContext("2d");
	
	// impede que os pixels saiam borrados, mantendo o aspecto 
	// da pixel art
	ctx.imageSmoothingEnabled = false;
	
	// definir as dimensoes do canvas/tela do jogo
	$("#canvas").width(window.innerWidth -5);
	$("#canvas").height(window.innerHeight - 5);
	
	// instancia o objeto do jogador
	var jogador = new Jogador(ctx, "Recursos/Sprites/boy.png", 64, 16);
	
	// para renderizar e atualizar, todas as entidade/objetos ficam
	// dentro deste array e adiciona o jogador para esse array
	var entidades = [];
	entidades.push(jogador);
	
	// funcao onde o jogo inteiro é executado
	const gameLoop = () => {
		// limpa a tela para o proximo frame ser desenhado
		ctx.clearRect(0, 0, $("#canvas").width(), 360);
		
		// atualiza e "desenha" todas as entidades no array
		entidades.forEach((entidade) => {
			entidade.draw();
			entidade.update();
		});
		
		// espera a disponibilidade para executar o proximo frame
		requestAnimationFrame(gameLoop);
	}
	
	// esperar a disponibilidade para executar o primeiro frame
	requestAnimationFrame(gameLoop);
	
});