import Util from "./Util.js";

export default class Entidade {
	constructor(_img, _imgWidth, _imgHeight){
		this.acao				= "";
		
		// Fisicas
		this.plataforma				= false;
		this.friccao					= 0.;
		this.grav							= 0.1;
		this.x								= 0;
		this.y								= 0;
		this.xveloc						= 0;
		this.yveloc						= 0;
		
		// Animacao
		this.spriteSheet			= new Image(_imgWidth, _imgHeight);
		this.spriteSheet.src	= _img;
		this.animacao					= "";
		this.animVel					= 0;
		this.animDirX					= 1;
		this.frame						= 0;
		this.fComeco					= 0;
		this.fLoop						= 0;
		this.fFinal						= 0;
	}
	
	update(_grade){
		// Colisões com plataformas
		let faseLargura = (_grade.length - 1) * 16;
		let faseAltura = (_grade[0].length - 1) * 16;
		
		if(Util.inRange(this.y, 0, faseAltura - 16) && Util.inRange(this.x, 0, faseLargura)){
			let tilePosicoes = {
				base : {
					esquerda :	_grade[Util.clamp(Math.floor(this.x / 16),				0, _grade.length - 1)][Util.clamp(Math.floor((this.y + 16) / 16) + 1, 0, _grade[0].length - 1)].solid,
					direita : 	_grade[Util.clamp(Math.floor((this.x + 16) / 16), 0, _grade.length - 1)][Util.clamp(Math.floor((this.y + 16) / 16) + 1, 0, _grade[0].length - 1)].solid
				},
				
				topo : {
					esquerda :	_grade[Util.clamp(Math.floor(this.x / 16),				0, _grade.length - 1)][Util.clamp(Math.floor(this.y / 16) - 1, 0, _grade[0].length - 1)].solid,
					direita : 	_grade[Util.clamp(Math.floor((this.x + 16) / 16), 0, _grade.length - 1)][Util.clamp(Math.floor(this.y / 16) - 1, 0, _grade[0].length - 1)].solid
				},
				
				esquerda : {
					topo :			_grade[Util.clamp(Math.floor(this.x / 16) - 1,		0, _grade.length - 1)][Util.clamp(Math.floor(this.y / 16), 0, _grade[0].length - 1)].solid,
					base : 0
				},
				
				direita : {
					topo : 0,
					base : 0
				}
			}
		}
		
		// Fisicas
		if(this.plataforma == true){ this.yveloc = 0; }
		else
		{
			if(this.yveloc + this.grav < 8) this.yveloc += this.grav;
		}
		
		this.x += this.xveloc;
		this.y += this.yveloc;
	}
	
	draw(_ctx, _gameScale){
		let _frameX = 0, _frameY = 0, _x = this.x;
		_ctx.save();
		
		if(this.animDirX == -1){
			_ctx.scale(-1, 1);
			_x = -(this.x + 48);
		}
		_ctx.drawImage(this.spriteSheet, _frameX, _frameY, 16, 16, Math.floor(_x) * _gameScale, Math.floor(this.y) * _gameScale, 16 * _gameScale, 16 * _gameScale);
		
		_ctx.restore();
	}
}