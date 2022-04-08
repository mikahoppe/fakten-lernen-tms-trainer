import React from "react";
import { ScrollView, View, Text, Pressable, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { store } from "../reducer/reducer";
import { Page } from "../types/pages.d";
import { Result } from "../types/result";
import { AppState } from "../types/state";
import { LineChart } from "react-native-line-chart";

const getColorIndicator = (num: number) => {
	if (num <= 30) {
		return "#EC5858";
	} else if (num <= 70) {
		return "#80CBD0";
	} else {
		return "#86DB32";
	}
};

export default function Analyse() {
	const results: Result[] = useSelector((state: AppState) => state.results);

	const rates = results.map((r) => r.percentage);
	const labels = results.map((r, index) => (index + 1).toString());

	const truely = results.map((r) => r.correctly_answered);
	const falsely = results.map((r) => r.wrongly_answered);
	const rate = Math.floor(
		rates.reduce((total, r) => total + r / rates.length, 0)
	);

	const total_truely = truely.reduce((total, r) => (total += r), 0);
	const total_falsely = falsely.reduce((total, r) => (total += r), 0);

	const shortMemoryPercentages = results
		.filter((r) => r.wait_time <= 15)
		.map((r) => r.percentage);
	const shortMemoryPerc = Math.floor(
		shortMemoryPercentages.reduce(
			(avg, r) => (avg += r / shortMemoryPercentages.length),
			0
		)
	);
	const longMemoryPercentages = results
		.filter((r) => r.wait_time > 15)
		.map((r) => r.percentage);
	const longMemoryPerc = Math.floor(
		longMemoryPercentages.reduce(
			(avg, r) => (avg += r / longMemoryPercentages.length),
			0
		)
	);

	const smallMemoryPercentages = results
		.filter((r) => r.no_people <= 7)
		.map((r) => r.percentage);
	const smallMemoryPerc = Math.floor(
		smallMemoryPercentages.reduce(
			(avg, r) => (avg += r / smallMemoryPercentages.length),
			0
		)
	);
	const largeMemoryPercentages = results
		.filter((r) => r.no_people > 7)
		.map((r) => r.percentage);
	const largeMemoryPerc = Math.floor(
		largeMemoryPercentages.reduce(
			(avg, r) => (avg += r / largeMemoryPercentages.length),
			0
		)
	);

	return (
		<ScrollView
			style={{
				width: "100%",
			}}
		>
			<View
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						marginTop: 80,
						marginBottom: 20,
						color: "#F7FAF4",
						fontSize: 36,
						fontWeight: "bold",
						fontFamily: "SourceSansProBold",
					}}
				>
					Einstellungen
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
						Zurück zur Startseite
					</Text>
				</Pressable>

				<View
					style={{
						marginTop: 40,
						paddingTop: 20,
						paddingBottom: 0,
						backgroundColor: "transparent",
					}}
				>
					<LineChart
						data={{
							labels: labels.length ? labels : ["0"],
							datasets: [
								{
									data: rates.length ? rates : [100],
								},
							],
						}}
						width={Dimensions.get("window").width}
						height={220}
						chartConfig={{
							backgroundColor: "transparent",
							backgroundGradientFrom: "transparent",
							backgroundGradientTo: "transparent",
							decimalPlaces: 1, // optional, defaults to 2dp
							segments: labels.length || 1,
							color: (opacity = 1) =>
								`rgba(255, 255, 255, ${opacity})`,
							strokeWidth: 2,
						}}
						withDots={true}
						fromZero={true}
						bezier
						style={{
							marginVertical: 8,
							color: "#FFFFFF",
						}}
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
						{total_truely} richtige{" "}
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
						{total_falsely} falsch{" "}
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
					{rate} %
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
							color: getColorIndicator(shortMemoryPerc),
							fontFamily: "SourceSansProBold",
							fontSize: 32,
							textAlign: "right",
							flex: 1,
						}}
					>
						{shortMemoryPerc} %
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
							color: getColorIndicator(longMemoryPerc),
							fontFamily: "SourceSansProBold",
							fontSize: 32,
							textAlign: "right",
							flex: 1,
						}}
					>
						{longMemoryPerc} %
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
							color: getColorIndicator(smallMemoryPerc),
							fontFamily: "SourceSansProBold",
							fontSize: 32,
							textAlign: "right",
							flex: 1,
						}}
					>
						{smallMemoryPerc} %
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
							color: getColorIndicator(largeMemoryPerc),
							fontFamily: "SourceSansProBold",
							fontSize: 32,
							textAlign: "right",
							flex: 1,
						}}
					>
						{largeMemoryPerc} %
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
		</ScrollView>
	);
}
