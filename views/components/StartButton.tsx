import React from "react";
import { Pressable, Text } from "react-native";
import { store } from "../../reducer/reducer";
import { Configuration } from "../../types/configuration.d";
import { Page } from "../../types/pages.d";
import { createPersonas } from "../../utils/_createPersonas";
import { createTestQuestions } from "../../utils/_createQuestions";

export const StartButton = ({
	title,
	no_people,
	wait_time,
	no_questions,
}: { title: string } & Configuration) => {
	return (
		<Pressable
			onPress={() => {
				store.dispatch({
					type: "SET_SETTINGS",
					payload: {
						no_people: no_people,
						wait_time: wait_time,
						no_questions: no_questions,
					},
				});
				const data = createPersonas(no_people);
				store.dispatch({
					type: "SET_PERSONAS",
					payload: data,
				});
				store.dispatch({
					type: "SET_QUESTIONS",
					payload: createTestQuestions(no_questions, data),
				});
				store.dispatch({
					type: "SET_TIME",
					payload: new Date(),
				});
				store.dispatch({
					type: "SET_VIEW",
					payload: Page.LEARN,
				});
			}}
			style={{
				borderColor: "#FFFFFF",
				backgroundColor: "transparent",
				borderWidth: 4,
				borderRadius: 12,
				paddingTop: 12,
				paddingBottom: 12,
				paddingLeft: 32,
				paddingRight: 32,
				marginTop: 10,
				marginLeft: "auto",
				marginRight: "auto",
				width: "90%",
			}}
		>
			<Text
				style={{
					color: "#FFFFFF",
					fontWeight: "bold",
					fontSize: 20,
					fontFamily: "SourceSansProSemibold",
					textAlign: "center",
				}}
			>
				{title}
			</Text>
		</Pressable>
	);
};
