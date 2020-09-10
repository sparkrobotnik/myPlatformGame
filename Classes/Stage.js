import Util from "./Util.js";

export default class Stage {
	constructor(_jsonFile){
		this.tileset;
		this.grid	= [];
		this.colunas;
		this.linhas;
		this.width = 0;
		this.height = 0;
		this.carregado = false;
		this.load(_jsonFile);
	}
	
	load(_jsonFile){
		$.getJSON(_jsonFile, (result) => {
			// definir recurso(imagem/sprite) a ser usado
			this.tileset			= new Image(result.tilesetWidth, result.tilesetHeight);
			this.tileset.src	= result.tileset;
			// definir dimensoes da fase em linhas e colunas
			this.colunas			= result.colunas;
			this.linhas 			= result.linhas;
			// dimensoes da fase em pixels
			this.width				= this.colunas * 16;
			this.height				= this.height * 16;
			
			for(let i = 0; i < this.colunas; i ++){ this.grid.push([]); }
			this.grid.forEach((coluna) => {
				for(let i = 0; i < this.linhas; i ++){
					coluna.push({tile:-1, solid:false});
				}
			});
			
			
		});
	}
	
	update(){
		
	}
	
	draw(_ctx, _gameScale){
		let _tileSize = 16 * _gameScale;
		
		for(let x = 0; x < this.colunas; x ++){
			for(let y = 0; y < this.linhas; y ++){
				if(this.grid[x][y].tile != -1){
					_ctx.drawImage(this.tileset, Math.floor((this.grid[x][y].tile * 16) % this.tileset.width), Math.floor((this.grid[x][y].tile * 16) / this.tileset.width) * 16, 16, 16, _tileSize * x, _tileSize * y, _tileSize, _tileSize);
				}
			}
		}
	}
}