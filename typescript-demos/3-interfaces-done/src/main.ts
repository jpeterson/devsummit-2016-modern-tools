interface VO {
	x: number;
	y: number;
}
var myAdd = function(valuesObject: VO): string {
	return String(valuesObject.x + valuesObject.y);
};

document.body.innerHTML = myAdd({ x: 1, y: 2 });