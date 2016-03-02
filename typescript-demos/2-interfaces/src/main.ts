var myAdd = function(valuesObject: { x: number, y: number }): string {
	return String(valuesObject.x + valuesObject.y);
};

document.body.innerHTML = myAdd({ x: 1, y: 2 });