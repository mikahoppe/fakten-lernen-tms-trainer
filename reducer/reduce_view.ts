import { Page } from "../types/pages.d";
import { ReducerAction } from "../types/reducers";

export default function view(state: Page = Page.HOME, action: ReducerAction) {
	switch (action.type) {
		case "SET_VIEW":
			if ((action.payload as Page) !== undefined)
				return action.payload as Page;

		default:
			return state;
	}
}
