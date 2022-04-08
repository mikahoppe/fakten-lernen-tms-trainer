export type ReducerAction = {
	type:
		| "SET_ANSWER"
		| "SET_PERSONAS"
		| "SET_QUESTIONS"
		| "SET_SETTINGS"
		| "SET_TIME"
		| "SET_VIEW"
		| "ADD_RESULT"
		| "DELETE_RESULTS";
	payload: any;
};
