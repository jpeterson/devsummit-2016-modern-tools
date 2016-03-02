class MapPoint {
	pointJson: Object;
	constructor(public x: number, public y: number) {
		this.pointJson = {x: x, y: y};
	}
}
interface VO {
	x: number;
	y: number;
}
var myAdd = function(valuesObject: VO): string {
	return valuesObject.x + ',' + valuesObject.y;
};

var home = new MapPoint(-118, 34.5);

document.body.innerHTML = myAdd(home);