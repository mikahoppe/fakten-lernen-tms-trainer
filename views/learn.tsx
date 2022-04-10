import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { store } from "../reducer/reducer";
import { AppState } from "../types/state.d";
import { Page } from "../types/pages.d";
import { Persona } from "../types/persona.d";
import { PersonaView } from "./components/Persona";

export default function Learn() {
	const [time, setTime] = useState(new Date().getTime());
	const timer = setInterval(() => {
		setTime(new Date().getTime());
	}, 1000);

	useEffect(() => {
		if (getProgress(time)[1] === 100) {
			store.dispatch({
				type: "SET_TIME",
				payload: new Date(),
			});
			store.dispatch({
				type: "SET_VIEW",
				payload: Page.WAIT,
			});
		}
		return () => {
			clearInterval(timer);
		};
	});

	const MAX_TIME = 6 * 60 * 1000;
	const start: Date = useSelector((state: AppState) => state.time);

	const getProgress = (now: number) => {
		const diff = Math.abs(new Date(start).getTime() - now);
		return [diff, Math.min((diff * 100) / MAX_TIME, 100)];
	};

	const personas: Persona[] | undefined = useSelector(
		(state: AppState) => state.personas
	);

	const renderPersona = ({
		item,
		index,
	}: {
		item: Persona;
		index: number;
	}) => <PersonaView index={index} person={item} />;

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "row",
				flex: 1,
				justifyContent: "flex-start",
				alignItems: "center",
				backgroundColor: "#030303",
			}}
		>
			<View style={{ flex: 1 }}>
				<FlatList
					style={{ alignSelf: "flex-start", marginTop: 20 }}
					data={personas}
					renderItem={renderPersona}
					keyExtractor={(item) => item.id}
				/>

				<Pressable
					onPress={() => {
						store.dispatch({
							type: "SET_TIME",
							payload: new Date(),
						});
						store.dispatch({
							type: "SET_VIEW",
							payload: Page.WAIT,
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
						marginBottom: 30,
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
						Weiter
					</Text>
				</Pressable>
			</View>

			<Text
				style={{
					transform: [{ rotate: "-90deg" }],
					position: "absolute",
					color: "#F7FAF4",
					fontFamily: "SourceSansProRegular",
					fontSize: 32,
					alignSelf: "flex-start",
					overflow: "visible",
					top: 290,
					width: 600,
					textAlign: "right",
					right: -258,
				}}
			>
				noch{" "}
				<Text style={{ fontFamily: "SourceSansProBold" }}>
					{Math.floor(
						(MAX_TIME - getProgress(time)[0]) / (1000 * 60)
					)}{" "}
					Minuten
				</Text>{" "}
				und{" "}
				<Text style={{ fontFamily: "SourceSansProBold" }}>
					{Math.floor((MAX_TIME - getProgress(time)[0]) / 1000) % 60}{" "}
					Sekunden
				</Text>
			</Text>

			<View
				style={{
					height: "100%",
					width: 16,
					backgroundColor: "#2C2C2C",
				}}
			>
				<LinearGradient
					colors={["#326266", "#81CCD1"]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					style={{
						width: "100%",
						backgroundColor: "red",
						height: getProgress(time)[1] + "%",
					}}
				/>
			</View>

			<StatusBar style="auto" />
		</View>
	);
}
