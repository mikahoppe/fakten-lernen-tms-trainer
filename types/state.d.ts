import { Persona } from "./persona.d";
import { Question } from "./question.d";
import { Page } from "./pages.d";

export type AppState = {
	view: Page;
	personas: Persona[];
	test: {
		questions: Question[];
		answers: number[];
	};
	time: Date;

	settings: {
		no_people: number;
		wait_time: number;
		no_questions: number;
	};
};
