import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Page } from "../types/pages.d";
import { AppState } from "../types/state.d";
import { combineReducers } from "redux";

import personas from "./reduce_personas";
import test from "./reduce_test";
import settings from "./reduce_settings";
import time from "./reduce_time";
import view from "./reduce_view";
import { results } from "./reduce_results";

export const INITIAL_STATE: AppState = {
	view: Page.HOME,
	personas: [],
	test: {
		questions: [],
		answers: [],
	},
	results: [],
	time: new Date(),
	settings: {
		no_people: 10,
		wait_time: 45,
		no_questions: 10,
	},
};

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(
	persistConfig,
	combineReducers({
		personas,
		test,
		settings,
		time,
		view,
		results,
	})
);

export const store = createStore(
	persistedReducer,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
