import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppState } from "../../types/state";

export const ResultView = () => {
	const questions = useSelector((state: AppState) => state.test.questions);
	const selectedAnswers = useSelector(
		(state: AppState) => state.test.answers
	);

	return (
		<>
			{questions.map((question, question_index) => {
				return (
					<View
						key={question_index}
						style={{
							backgroundColor:
								question_index % 2 === 0
									? "transparent"
									: "#333333",
							padding: 20,
							display: "flex",
							flexDirection: "row",
						}}
					>
						<View style={{ marginRight: 12 }}>
							<Text
								style={{
									color:
										question.correct ===
										selectedAnswers[question_index]
											? "#86DB32"
											: "#EC5858",
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
									color:
										question.correct ===
										selectedAnswers[question_index]
											? "#86DB32"
											: "#EC5858",
									fontFamily: "SourceSansProSemibold",
									fontSize: 20,
									marginBottom: 20,
									marginTop: 12,
								}}
							>
								{question.question}
							</Text>
							{question.answers.map((answer, index) => {
								return (
									<Text
										key={`${question_index}_${index}`}
										style={{
											fontFamily:
												selectedAnswers[
													question_index
												] === index ||
												question.correct === index
													? "SourceSansProBold"
													: "SourceSansProLight",
											color:
												selectedAnswers[
													question_index
												] === index
													? question.correct === index
														? "#86DB32"
														: "#EC5858"
													: question.correct === index
													? "#80CBD0"
													: "#FDFFFB",
											fontSize: 20,
											marginBottom: 8,
										}}
									>
										({String.fromCharCode(97 + index)}){" "}
										{answer}
									</Text>
								);
							})}
						</View>
					</View>
				);
			})}
		</>
	);
};
