function calculatePlate(targetWeight) {
	const plates = [45, 35, 25, 15, 10, 5, 2.5, 1, 0.75, 0.5, 0.25];
	let target = targetWeight - 45;
	let result = [];
	for (let i = 0; i < plates.length; i++) {
		if (target >= plates[i] * 2) {
			result.push(plates[i]);
			target -= plates[i] * 2;
		}
	}
	return result;
}

module.exports = { calculatePlate };
