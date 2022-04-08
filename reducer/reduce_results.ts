import { ReducerAction } from "../types/reducers";
import { Result } from "../types/result";

export const results = (state: Result[] = [], action: ReducerAction) => {
	switch (action.type) {
		case "ADD_RESULT":
			let newState = [...state];
			if ((action.payload as Result) !== undefined)
				newState.push(action.payload as Result);
			return newState;

		case "DELETE_RESULTS":
			return [];

		default:
			return state;
	}
};
