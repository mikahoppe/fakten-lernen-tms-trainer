import { ReducerAction } from "../types/reducers";

export default function time(state: Date = new Date(), action: ReducerAction) {
	switch (action.type) {
		case "SET_TIME":
			if ((action.payload as Date) !== undefined)
				return action.payload as Date;

		default:
			return state;
	}
}
