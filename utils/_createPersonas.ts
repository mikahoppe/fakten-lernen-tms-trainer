import { presets } from "../data/data";
import { Persona } from "../types/persona";
import { randInt } from "./_random";
import { shuffleArray } from "./_shuffleArray";

const createCategoryData = (num: number, arr: any[][]): any[] | undefined => {
	if (arr.length === 1) return shuffleArray(arr[0]).slice(0, num);

	let result: any[] = [];
	const shuffledPresets = shuffleArray(arr);

	for (let preset = 0; preset < arr.length; preset++) {
		const shuffeledPreset = shuffleArray(shuffledPresets[preset]);

		const num_of_items = Math.min(
			randInt(2, shuffledPresets[preset].length),
			num - result.length
		);
		result = result.concat(shuffeledPreset.slice(0, num_of_items));

		if (result.length === num) return result;
	}
	return undefined;
};

export const createPersonas = (num: number): Persona[] | undefined => {
	const indices = [...Array(num).keys()];

	const genders = indices.map(() => {
		return randInt(0, 2) ? "Herr" : "Frau";
	});
	const ages = shuffleArray([...Array(100).keys()]).slice(100 - num);
	const names = createCategoryData(num, presets.namen);
	const illnesses = createCategoryData(num, [presets.krankheiten]);
	const professions = createCategoryData(num, presets.berufe);
	const characteristics = createCategoryData(num, [presets.eigenschaften]);

	if (
		names === undefined ||
		genders === undefined ||
		ages === undefined ||
		illnesses === undefined ||
		professions === undefined ||
		characteristics === undefined
	) {
		console.error("Creation of Personas failed misserably.");
		return undefined;
	}

	const personas: Persona[] = indices.map(function (index, i) {
		return {
			id: index.toString(),
			name: names[i],
			gender: genders[i],
			age: ages[i],
			illness: illnesses[i],
			profession: professions[i],
			characteristic: characteristics[i],
		};
	});

	return personas;
};
