export default class Stage {
	constructor(tSrc, tWidth, tHeight, sColunas, sLinhas){
		this.tileset			= new Image(tWidth, tHeight);
		this.tileset.src	= tSrc;
		this.grid					= [];
		this.colunas			= sColunas;
		this.linhas				= sLinhas;
	}
	
	draw(){
		console.log("drawing stage!");
	}
}