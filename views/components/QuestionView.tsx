import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { store } from "../../reducer/reducer";
import { Question } from "../../types/question";
import { AppState } from "../../types/state";

export const QuestionView = () => {
	const questions = useSelector((state: AppState) => state.test.questions);
	const selectedAnswers = useSelector(
		(state: AppState) => state.test.answers
	);

	return (
		<>
			{questions.map((question: Question, question_index: number) => {
				return (
					<View
						key={question_index}
						style={{
							width: "100%",
							backgroundColor:
								question_index % 2 === 0
									? "transparent"
									: "#333333",
							padding: 20,
							paddingRight: 100,
							display: "flex",
							flexDirection: "row",
						}}
					>
						<View style={{ marginRight: 12 }}>
							<Text
								style={{
									color: "#FDFFFB",
									fontFamily: "SourceSansProBold",
									fontSize: 36,
								}}
							>
								{question_index < 9
									? "0" + (question_index + 1)
									: question_index + 1}
							</Text>
						</View>
						<View>
							<Text
								style={{
									color: "#FDFFFB",
									fontFamily: "SourceSansProBold",
									fontSize: 20,
									marginBottom: 20,
									marginTop: 12,
								}}
							>
								{question.question}
							</Text>
							{question.answers.map(
								(answer: string, index: number) => {
									return (
										<Pressable
											key={`${question_index}_${index}`}
											onPress={() => {
												store.dispatch({
													type: "SET_ANSWER",
													payload: {
														index: question_index,
														answer: index,
													},
												});
											}}
										>
											<Text
												style={{
													fontFamily:
														selectedAnswers[
															question_index
														] === index
															? "SourceSansProBold"
															: "SourceSansProRegular",
													color:
														selectedAnswers[
															question_index
														] === index
															? "#80CBD0"
															: "#FDFFFB",
													fontSize: 20,
													marginBottom: 8,
												}}
											>
												(
												{String.fromCharCode(
													97 + index
												)}
												) {answer}
											</Text>
										</Pressable>
									);
								}
							)}
						</View>
					</View>
				);
			})}
		</>
	);
};
