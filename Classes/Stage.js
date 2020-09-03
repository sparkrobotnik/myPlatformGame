export default class Stage {
	constructor(_ctx, _tSrc, _tWidth, _tHeight, _sColunas, _sLinhas){
		this.ctx					= _ctx;
		this.tileset			= new Image(_tWidth, _tHeight);
		this.tileset.src	= _tSrc;
		this.grid					= [];
		this.colunas			= _sColunas;
		this.linhas				= _sLinhas;
		this.loaded				= false;
		
		for(let i = 0; i < _sColunas; i ++){ this.grid.push([]); }
		this.grid.forEach((coluna) => {
			for(let i = 0; i < _sLinhas; i ++){
				coluna.push({tile:0, solid:false});
			}
		});
	}
	
	load(_jsonFile){
		
	}
	
	draw(_gameScale){
		let _tileSize = 16 * _gameScale;
		
		for(let x = 0; x < this.colunas; x ++){
			for(let y = 0; y < this.linhas; y ++){
				if(this.grid[x][y].tile != -1){
					this.ctx.drawImage(this.tileset, 0, 0, 16, 16, _tileSize * x, _tileSize * y, _tileSize, _tileSize);
				}
			}
		}
	}
}