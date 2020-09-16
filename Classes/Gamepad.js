export default class Gamepad {
	static definido 	= false;
	static index			= null;
	
	static direcional	= [
		{ nome: "para cima",	botao: null, pressionado: false },
		{ nome: "para baixo",	botao: null, pressionado: false },
		{ nome: "esquerda", 	botao: null, pressionado: false },
		{ nome: "direita",		botao: null, pressionado: false }
	];
	static acoes			= [
		{ nome: "pular",			botao: null, pressionado: false },
		{ nome: "atacar",			botao: null, pressionado: false },
		{ nome: "itens",			botao: null, pressionado: false }
	];
	
	static iniciar(){
		if(!Gamepad.compativel()){ return; }
		
		window.addEventListener("gamepadconnected", Gamepad.conectado);
		window.addEventListener("gamepaddisconnected", Gamepad.desconectado);
	}
	
	static definir_botoes(){
		
	}
	
	static update(){
		
	}
	
	static compativel(){
		return "getGamepads" in window.navigator;
	}
	
	static conectado(e){
		if(Gamepad.definido == false || (Gamepad.index == e.gamepad.index && Gamepad.id != e.gamepad.id)){
			Gamepad.definir_botoes(e);
		}
	}
	
	static desconectado(e){
		e.preventDefault();
		window.alert("gamepad deconnectado");
	}
}