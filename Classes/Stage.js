import Util 		from "./Util.js";
import Jogador	from "./Jogador.js";

export default class Stage {
	constructor(_arquivoJSON){
		this.tileset;
		this.tilesetMap = [];
		this.tilesetLargura;
		this.tilesetAltura;
		this.grade = [];
		this.colunas;
		this.linhas;
		this.entidades = [];
		
		// carregar fase predefinida
		this.carregar(_arquivoJSON);
	}
	
	carregar(_arquivoJSON){
		$.getJSON(_arquivoJSON, (resultado) => {
			// definir recurso(imagem/sprite) a ser usado
			this.tilesetLargura	= resultado.tilesetLargura;
			this.tilesetAltura	= resultado.tilesetAltura;
			this.tileset				= new Image(this.tilesetLargura, this.tilesetAltura);
			this.tileset.src		= resultado.tileset;
			
			// definir dimensoes da fase em linhas e colunas
			this.colunas				= resultado.colunas;
			this.linhas 				= resultado.linhas;
			
			// mapeando tileset
			for(let y = 0; y < this.tilesetAltura; y += 16){
				for(let x = 0; x < this.tilesetLargura; x += 16){
					this.tilesetMap.push({x: x, y: y});
				}
			}
			
			// criando espaço vazio
			for(let i = 0; i < this.colunas; i ++){ this.grade.push([]); }
			this.grade.forEach((coluna) => {
				for(let i = 0; i < this.linhas; i ++){
					coluna.push({tile:-1, solido:false});
				}
			});
			
			// carregando layouts
			resultado.tiles.forEach((layout) => {
				// carregando layout atual
				let xComeco = layout[0];
				let yComeco = layout[1];
				let xFinal	= Util.clamp(xComeco + layout[2], 0, this.colunas);
				let yFinal	= Util.clamp(yComeco + layout[3], 0, this.linhas);
				let tile		= layout[4];
				let solido	= layout[5];
				
				// definindo layout
				for(let x = xComeco; x < xFinal; x ++){
					for(let y = yComeco; y < yFinal; y ++){
						this.grade[x][y].tile = tile;
						this.grade[x][y].solido = solido;
					}
				}
				
				// adicionar jogador
				this.adicionar_entidade(new Jogador("Recursos/Sprites/boy.png", resultado.jogador.x, resultado.jogador.y));
			});
		});
	}
	
	adicionar_entidade(_entidade){
		this.entidades.push(_entidade);
	}
	
	update(){
		this.entidades.forEach((entidade) => entidade.update(this.grade));
	}
	
	draw(_ctx, _escala){
		let _tileTamanho	= 16 * _escala;
		
		for(let x = 0; x < this.colunas; x ++){
			for(let y = 0; y < this.linhas; y ++){
				if(this.grade[x][y].tile != -1){
					_ctx.drawImage(this.tileset, this.tilesetMap[ this.grade[x][y].tile ].x, this.tilesetMap[ this.grade[x][y].tile ].y, 16, 16, _tileTamanho * x, _tileTamanho * y, _tileTamanho, _tileTamanho);
				}
			}
		}
		
		this.entidades.forEach((entidade) => entidade.draw(_ctx, _escala));
	}
}