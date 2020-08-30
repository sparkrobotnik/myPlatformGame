export default class Entidade {
	constructor(_ctx, _img, _imgWidth, _imgHeight){
		this.ctx				= _ctx;
		this.acao				= "";
		
		// Fisicas
		this.plataforma	= false;
		this.friccao		= 0;
		this.grav				= 0;
		this.x					= 0;
		this.y					= 0;
		this.xveloc			= 0;
		this.yveloc			= 0;
		
		// Animacao
		this.spriteSheet= new Image(_imgWidth, _imgHeight);
		this.spriteSheet.src = _img;
		this.animacao		= "";
		this.animVel		= 0;
		this.animDirX		= 1;
		this.frame			= 0;
		this.fComeco		= 0;
		this.fLoop			= 0;
		this.fEnd				= 0;
	}
	
	update(){
		console.log("update!");
	}
	
	draw(){
		let _frameX=0, _frameY=0, _x=this.x;
		this.ctx.save();
		
		if(this.animDirX == -1){
			this.ctx.scale(-1, 1);
			_x = -(this.x + 48);
		}
		this.ctx.drawImage(this.spriteSheet, _frameX, _frameY, 16, 16, _x,this.y, 48, 48);
		
		this.ctx.restore();
	}
}