export default class Util {
	static clamp(_x, _min, _max){
		if(_x < _min){
			return _min;
		} 
		else if(_x > _max){
			return _max;
		}
		else{
			return _x;
		}
	}
}