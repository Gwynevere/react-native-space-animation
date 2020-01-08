export function Animator() {

}

export function random(min, max, integer = true) {
	if (integer)
		return Math.floor((Math.random() * max) + min);
	return (Math.random() * max) + min;
}