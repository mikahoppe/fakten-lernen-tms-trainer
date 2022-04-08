import { Persona } from "../types/persona";
import { ReducerAction } from "../types/reducers";

export default function personas(
	state: Persona[] = [],
	action: ReducerAction
): Persona[] {
	switch (action.type) {
		case "SET_PERSONAS":
			if ((action.payload as Persona[]) !== undefined)
				return action.payload as Persona[];

		default:
			return state;
	}
}
