import { StatusBar } from "expo-status-bar";
import React from "react";
import { useSelector } from "react-redux";
import { Pressable, ScrollView, Text, View } from "react-native";
import { store } from "../reducer/reducer";
import { Question } from "../types/question.d";
import { AppState } from "../types/state.d";
import { Page } from "../types/pages.d";
import { ResultView } from "./components/ResultView";

export default function Evaluate() {
	const questions: Question[] = useSelector(
		(state: AppState) => state.test.questions
	);
	const selectedAnswers = useSelector(
		(state: AppState) => state.test.answers
	);

	let answeredCorrect = 0;
	questions.forEach((question: Question, currentIndex: number) => {
		if (question.correct === selectedAnswers[currentIndex])
			answeredCorrect++;
	});

	return (
		<View
			style={{
				backgroundColor: "#030303",
				width: "100%",
				height: "100%",
			}}
		>
			<Text
				style={{
					position: "absolute",
					top: 12,
					right: 12,
					color: "#FDFFFB",
					fontSize: 20,
					fontFamily: "SourceSansProRegular",
				}}
			>
				{Math.floor((answeredCorrect / selectedAnswers.length) * 100)} %
			</Text>

			<Text
				style={{
					marginTop: 80,
					color: "#F7FAF4",
					fontFamily: "SourceSansProRegular",
					fontSize: 20,
					textAlign: "center",
				}}
			>
				<Text
					style={{
						color: "#86DB32",
						fontFamily: "SourceSansProBold",
					}}
				>
					{answeredCorrect} richtige{" "}
				</Text>
				Antworten
			</Text>
			<Text
				style={{
					color: "#F7FAF4",
					fontFamily: "SourceSansProRegular",
					fontSize: 20,
					textAlign: "center",
				}}
			>
				<Text
					style={{
						color: "#EC5858",
						fontFamily: "SourceSansProBold",
					}}
				>
					{selectedAnswers.length - answeredCorrect} falsch{" "}
				</Text>
				beantwortete Fragen
			</Text>

			<Pressable
				onPress={() => {
					store.dispatch({
						type: "SET_VIEW",
						payload: Page.HOME,
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
					marginTop: 40,
					marginLeft: 20,
					marginRight: 20,
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
					Zurück zur Homepage
				</Text>
			</Pressable>

			<ScrollView style={{ marginTop: 20, width: "100%" }}>
				<ResultView />
			</ScrollView>

			<StatusBar style="auto" />
		</View>
	);
}
