import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import * as Chart from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { store } from "../reducer/reducer";
import { Page } from "../types/pages.d";
import { Result } from "../types/result";
import { AppState } from "../types/state";

export default function Analyse() {
	const screenWidth = Dimensions.get("window").width;
	const results: Result[] = useSelector((state: AppState) => state.results);

	let labels = results.map((r, i) => i.toString());
	if (!labels.length) labels = ["0", "1"];

	let percentages = results.map((result) => result.percentage);
	if (!percentages.length) percentages = [100, 100];

	let correct = 0;
	results.forEach((result) => (correct += result.correctly_answered));

	let wrong = 0;
	results.forEach((result) => (wrong += result.wrongly_answered));

	const resultsShortTerm = results.filter((r) => r.wait_time <= 15);
	let shortTermMemory = 0;
	resultsShortTerm.forEach(
		(result) => (shortTermMemory += result.percentage)
	);
	shortTermMemory = shortTermMemory / resultsShortTerm.length;

	const resultsLongTerm = results.filter((r) => r.wait_time > 15);
	let longTermMemory = 0;
	resultsLongTerm.forEach((result) => (longTermMemory += result.percentage));
	longTermMemory = longTermMemory / resultsLongTerm.length;

	const resultsFewInformation = results.filter((r) => r.no_people <= 7);
	let fewInformation = 0;
	resultsFewInformation.forEach(
		(result) => (fewInformation += result.percentage)
	);
	fewInformation = fewInformation / resultsFewInformation.length;

	const resultsLoadsInformation = results.filter((r) => r.no_people > 7);
	let loadsInformation: number = 0;
	resultsLoadsInformation.forEach(
		(result) => (loadsInformation += result.percentage)
	);
	loadsInformation = loadsInformation / resultsLoadsInformation.length;

	const data = {
		labels: labels,
		datasets: [
			{
				data: percentages,
				color: (opacity = 1) => `rgba(128,203,208,${opacity})`, // optional
				strokeWidth: 3, // optional
			},
		],
	};

	const chartConfig = {
		backgroundGradientFromOpacity: 0,
		backgroundGradientToOpacity: 0,
		fillShadowGradientFromOpacity: 0,
		fillShadowGradientToOpacity: 0,
		color: (opacity = 1) => `rgba(247, 250, 244, ${opacity})`,
		strokeWidth: 2,
		useShadowColorFromDataset: false, // optional
	};

	return (
		<ScrollView>
			<View
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "row",
					flex: 1,
					justifyContent: "flex-start",
					alignItems: "center",
					backgroundColor: "#0A0A0A",
				}}
			>
				<View
					style={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							marginTop: 60,
							color: "#F7FAF4",
							fontSize: 36,
							fontWeight: "bold",
							fontFamily: "SourceSansProBold",
						}}
					>
						Auswertung
					</Text>
					<Pressable
						onPress={() => {
							store.dispatch({
								type: "SET_TIME",
								payload: new Date(),
							});
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
							marginTop: 20,
							marginBottom: 40,
							marginLeft: 20,
							marginRight: 20,
							width: "70%",
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
							Zurück zum Hauptmenü
						</Text>
					</Pressable>
					<View
						style={{
							paddingTop: 40,
							paddingBottom: 20,
							backgroundColor: "#161616",
						}}
					>
						<Chart.LineChart
							data={data}
							width={screenWidth}
							height={220}
							chartConfig={chartConfig}
							fromZero={true}
							getDotColor={(opacity = 1) =>
								`rgba(128,203,208,${opacity})`
							}
							segments={data.labels.length}
							formatYLabel={(x) => `${Math.ceil(Number(x))} %`}
						/>
					</View>
					<Text
						style={{
							marginTop: 40,
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
							{correct} richtige{" "}
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
							{wrong} falsch{" "}
						</Text>
						beantwortete Fragen
					</Text>
					<Text
						style={{
							color: "#F7FAF4",
							fontFamily: "SourceSansProBold",
							fontSize: 40,
							textAlign: "center",
							marginTop: 12,
							marginBottom: 40,
						}}
					>
						{Math.floor((correct * 100) / (correct + wrong))} %
					</Text>

					<View
						style={{
							display: "flex",
							flexDirection: "row",
							width: "100%",
							paddingLeft: 20,
							paddingRight: 20,
							paddingTop: 20,
							paddingBottom: 20,
							backgroundColor: "#161616",
						}}
					>
						<Text
							style={{
								color: "#F7FAF4",
								fontFamily: "SourceSansProRegular",
								fontSize: 20,
								textAlign: "left",
								paddingRight: 20,
							}}
						>
							<Text
								style={{
									fontFamily: "SourceSansProBold",
								}}
							>
								Kurze Merkzeit
							</Text>
							{"\n"}
							(unter 15 Minuten):
						</Text>
						<Text
							style={{
								color:
									30 < shortTermMemory
										? "#86DB32"
										: 60 < shortTermMemory
										? "#80CBD0"
										: "#EC5858",
								fontFamily: "SourceSansProBold",
								fontSize: 32,
								textAlign: "right",
								flex: 1,
							}}
						>
							{Math.floor(shortTermMemory)} %
						</Text>
					</View>

					<View
						style={{
							display: "flex",
							flexDirection: "row",
							width: "100%",
							paddingLeft: 20,
							paddingRight: 20,
							paddingTop: 20,
							paddingBottom: 20,
						}}
					>
						<Text
							style={{
								color: "#F7FAF4",
								fontFamily: "SourceSansProRegular",
								fontSize: 20,
								textAlign: "left",
								paddingRight: 20,
							}}
						>
							<Text
								style={{
									fontFamily: "SourceSansProBold",
								}}
							>
								Lange Merkzeit
							</Text>
							{"\n"}
							(über 15 Minuten):
						</Text>
						<Text
							style={{
								color:
									30 < longTermMemory
										? "#86DB32"
										: 60 < longTermMemory
										? "#80CBD0"
										: "#EC5858",
								fontFamily: "SourceSansProBold",
								fontSize: 32,
								textAlign: "right",
								flex: 1,
							}}
						>
							{longTermMemory} %
						</Text>
					</View>

					<View
						style={{
							display: "flex",
							flexDirection: "row",
							width: "100%",
							paddingLeft: 20,
							paddingRight: 20,
							paddingTop: 20,
							paddingBottom: 20,
							backgroundColor: "#161616",
						}}
					>
						<Text
							style={{
								color: "#F7FAF4",
								fontFamily: "SourceSansProRegular",
								fontSize: 20,
								textAlign: "left",
								paddingRight: 20,
							}}
						>
							<Text
								style={{
									fontFamily: "SourceSansProBold",
								}}
							>
								Wenige Informationen
							</Text>
							{"\n"}
							(unter 7 Personen):
						</Text>
						<Text
							style={{
								color:
									30 < fewInformation
										? "#86DB32"
										: 60 < fewInformation
										? "#80CBD0"
										: "#EC5858",
								fontFamily: "SourceSansProBold",
								fontSize: 32,
								textAlign: "right",
								flex: 1,
							}}
						>
							{fewInformation} %
						</Text>
					</View>

					<View
						style={{
							display: "flex",
							flexDirection: "row",
							width: "100%",
							paddingLeft: 20,
							paddingRight: 20,
							paddingTop: 20,
							paddingBottom: 20,
						}}
					>
						<Text
							style={{
								color: "#F7FAF4",
								fontFamily: "SourceSansProRegular",
								fontSize: 20,
								textAlign: "left",
								paddingRight: 20,
							}}
						>
							<Text
								style={{
									fontFamily: "SourceSansProBold",
								}}
							>
								Viele Informationen
							</Text>
							{"\n"}
							(über 7 Personen):
						</Text>
						<Text
							style={{
								color:
									30 < loadsInformation
										? "#86DB32"
										: 60 < loadsInformation
										? "#80CBD0"
										: "#EC5858",
								fontFamily: "SourceSansProBold",
								fontSize: 32,
								textAlign: "right",
								flex: 1,
							}}
						>
							{loadsInformation} %
						</Text>
					</View>

					<View
						style={{
							backgroundColor: "#161616",
							width: "100%",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							paddingTop: 20,
							paddingBottom: 20,
						}}
					>
						<Pressable
							onPress={() => {
								store.dispatch({
									type: "DELETE_RESULTS",
									payload: undefined,
								});
							}}
							style={{
								borderColor: "#C33A3A",
								backgroundColor: "#C33A3A",
								borderWidth: 4,
								borderRadius: 12,
								paddingTop: 12,
								paddingBottom: 12,
								paddingLeft: 32,
								paddingRight: 32,
								marginLeft: 20,
								marginRight: 10,
								flex: 1,
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
								Alle Daten löschen
							</Text>
						</Pressable>
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
								marginLeft: 10,
								marginRight: 20,
								flex: 1,
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
								Zurück zur Startseite
							</Text>
						</Pressable>
					</View>
				</View>

				<StatusBar style="auto" />
			</View>
		</ScrollView>
	);
}
