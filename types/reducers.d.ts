export type ReducerAction = {
	type:
		| "SET_ANSWER"
		| "SET_PERSONAS"
		| "SET_QUESTIONS"
		| "SET_SETTINGS"
		| "SET_TIME"
		| "SET_VIEW";
	payload: any;
};
