import { Question } from "../types/question";
import { Persona } from "../types/persona";
import { randInt } from "./_random";
import { shuffleArray } from "./_shuffleArray";
import { swap } from "./_swap";

const getQuestionPart = (category: string, person: Persona) => {
	switch (category) {
		case "name":
			return `${person.gender} ${person.name}`;

		case "alter":
			return `Der/Die ${person.age}-jährige`;

		case "beruf":
			return `Der/Die ${person.profession}/in`;

		case "eigenschaft":
			return `Der/Die ${person.characteristic}e`;

		case "krankheit":
			return `Der/Die ${person.illness} habende`;
	}
};

const getAnswerPart = (category: string, person: Persona): string => {
	switch (category) {
		case "name":
			return `heißt ${person.gender} ${person.name}.`;

		case "alter":
			return `ist ${person.age} Jahre alt.`;

		case "beruf":
			return `ist ${person.profession}/in.`;

		case "eigenschaft":
			return `ist ${person.characteristic}.`;

		case "krankheit":
			return `hat ${person.illness}.`;

		default:
			return "";
	}
};

export const createTestQuestions = (
	num: number,
	data: Persona[] | undefined
): Question[] => {
	if (data === undefined) return [];

	const categories = ["name", "alter", "beruf", "krankheit", "eigenschaft"];
	const questions: Question[] = [];

	for (let index = 0; index < num; index++) {
		const persona_index = randInt(0, data.length);

		const category_1 = randInt(0, categories.length);
		const category_2 = randInt(1, categories.length);

		const question =
			getQuestionPart(categories[category_1], data[persona_index]) +
			"...";

		let answers: string[] = [
			getAnswerPart(
				categories[(category_1 + category_2) % categories.length],
				data[persona_index]
			),
		];

		let temp = JSON.parse(JSON.stringify(data));
		temp.splice(persona_index, 1);
		temp = shuffleArray(temp);

		for (let count = 0; count < Math.min(data.length - 1, 4); count++) {
			answers.push(
				getAnswerPart(
					categories[(category_1 + category_2) % categories.length],
					temp[count]
				)
			);
		}

		const correct_index = randInt(0, answers.length);
		swap(answers, 0, correct_index);

		questions.push({
			question: question,
			answers: answers,
			correct: correct_index,
		});
	}

	return questions;
};
