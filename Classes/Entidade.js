import Util from "./Util.js";

export default class Entidade {
	constructor(_img, _imgWidth, _imgHeight){
		this.acao				= "";
		
		// Fisicas
		this.fisicas					= true;
		this.plataforma				= false;
		this.friccao					= 0.1;
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
	
	update(fase){
		this.plataforma = false;
		
		/*
		let centro = {x: this.x + 8, y: this.y + 8 };
		let fase = { altura: (_grade[0].length - 1) * 16, largura:(_grade.length - 1) * 16 };
		let colisao = {
			topo: 		_grade[Util.clamp(Math.floor(centro.x / 16), 0, _grade.length - 1)][Util.clamp(Math.floor(centro.y / 16), 0, _grade[0].length - 1)].solido,
			base: 		_grade[Util.clamp(Math.floor(centro.x / 16), 0, _grade.length - 1)][Util.clamp(Math.floor((centro.y + 8) / 16), 0, _grade[0].length - 1)].solido,
			parede:		_grade[Util.clamp(Math.floor(centro.x / 16), 0, _grade.length - 1)][Util.clamp(Math.floor(centro.y / 16), 0, _grade[0].length - 1)].solido,
		}
		
		if(colisao.base){
			let proxLinhaY = Util.clamp(Math.floor(centro.y / 16) + 1, 0, _grade[0].length - 1) * 16;
			let distancia = proxLinhaY - (this.y + 16);
			
			if(distancia < this.yveloc){
				this.y += distancia;
				this.plataforma = true;
				this.yveloc = 0;
			}
		}
		*/
		
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