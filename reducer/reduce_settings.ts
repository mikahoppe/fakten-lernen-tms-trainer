import { ReducerAction } from "../types/reducers";
import { Configuration } from "../types/configuration.d";

export default function settings(
	state: Configuration = {
		no_people: 10,
		wait_time: 45,
		no_questions: 15,
	},
	action: ReducerAction
) {
	switch (action.type) {
		case "SET_SETTINGS":
			if ((action.payload as Configuration) !== undefined)
				return {
					no_people: Math.min(
						Math.max(
							(action.payload as Configuration).no_people,
							3
						),
						99
					),
					wait_time: Math.max(
						(action.payload as Configuration).wait_time,
						1
					),
					no_questions: Math.max(
						(action.payload as Configuration).no_questions,
						1
					),
				};

		default:
			return state;
	}
}
