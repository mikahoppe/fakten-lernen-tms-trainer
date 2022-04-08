import { Question } from "../types/question";
import { ReducerAction } from "../types/reducers";

export default function test(
	state: { answers: number[]; questions: Question[] } = {
		answers: [],
		questions: [],
	},
	action: ReducerAction
) {
	switch (action.type) {
		case "SET_ANSWER":
			const payload = action.payload as {
				index: number;
				answer: number;
			};

			let new_answers = [...state.answers];
			new_answers[payload.index] = payload.answer;

			return {
				answers: new_answers,
				questions: state.questions,
			};

		case "SET_QUESTIONS":
			if ((action.payload as Question[]) !== undefined)
				return {
					questions: action.payload as Question[],
					answers: Array.from(
						{
							length: (action.payload as Question[]).length,
						},
						() => -1
					),
				};

		default:
			return state;
	}
}
