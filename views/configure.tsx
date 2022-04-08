import { StatusBar } from "expo-status-bar";
import React from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { background_image } from "../assets/data_uri_images";
import { store } from "../reducer/reducer";
import { AppState } from "../types/state.d";
import { Page } from "../types/pages.d";
import { createPersonas } from "../utils/_createPersonas";
import { createTestQuestions } from "../utils/_createQuestions";

export default function Configure() {
	const image = {
		uri: background_image,
	};

	const config_no_people = useSelector(
		(state: AppState) => state.settings.no_people
	);
	const config_wait_time = useSelector(
		(state: AppState) => state.settings.wait_time
	);
	const config_no_questions = useSelector(
		(state: AppState) => state.settings.no_questions
	);

	return (
		<View
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#000000",
			}}
		>
			<ImageBackground
				source={image}
				resizeMode="cover"
				resizeMethod="scale"
				style={{
					width: "100%",
					height: "100%",
					flex: 1,
					justifyContent: "flex-start",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						marginTop: 80,
						marginBottom: 40,
						color: "#F7FAF4",
						fontSize: 36,
						fontWeight: "bold",
						fontFamily: "SourceSansProBold",
					}}
				>
					Einstellungen
				</Text>

				<View
					style={{
						marginTop: 60,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 20,
					}}
				>
					<Pressable
						onPress={() => {
							store.dispatch({
								type: "SET_SETTINGS",
								payload: {
									no_people: config_no_people - 2,
									wait_time: config_wait_time,
									no_questions: config_no_questions,
								},
							});
						}}
						style={{
							borderColor: "#FFFFFF",
							backgroundColor: "#FFFFFF",
							borderWidth: 4,
							borderRadius: 12,
							paddingTop: 12,
							paddingBottom: 12,
							paddingLeft: 12,
							paddingRight: 12,
							width: 60,
						}}
					>
						<Text
							style={{
								color: "#030303",
								fontWeight: "bold",
								fontSize: 20,
								fontFamily: "SourceSansProSemibold",
								textAlign: "center",
							}}
						>
							-2
						</Text>
					</Pressable>
					<Text
						style={{
							color: "#FFFFFF",
							fontWeight: "bold",
							fontSize: 20,
							fontFamily: "SourceSansProSemibold",
							textAlign: "center",
							marginLeft: 20,
							marginRight: 20,
						}}
					>
						{config_no_people} Personen
					</Text>
					<Pressable
						onPress={() => {
							store.dispatch({
								type: "SET_SETTINGS",
								payload: {
									no_people: config_no_people + 2,
									wait_time: config_wait_time,
									no_questions: config_no_questions,
								},
							});
						}}
						style={{
							borderColor: "#FFFFFF",
							backgroundColor: "#FFFFFF",
							borderWidth: 4,
							borderRadius: 12,
							paddingTop: 12,
							paddingBottom: 12,
							paddingLeft: 12,
							paddingRight: 12,
							width: 60,
						}}
					>
						<Text
							style={{
								color: "#030303",
								fontWeight: "bold",
								fontSize: 20,
								fontFamily: "SourceSansProSemibold",
								textAlign: "center",
							}}
						>
							+2
						</Text>
					</Pressable>
				</View>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 20,
					}}
				>
					<Pressable
						onPress={() => {
							store.dispatch({
								type: "SET_SETTINGS",
								payload: {
									no_people: config_no_people,
									wait_time: config_wait_time - 5,
									no_questions: config_no_questions,
								},
							});
						}}
						style={{
							borderColor: "#FFFFFF",
							backgroundColor: "#FFFFFF",
							borderWidth: 4,
							borderRadius: 12,
							paddingTop: 12,
							paddingBottom: 12,
							paddingLeft: 12,
							paddingRight: 12,
							width: 60,
						}}
					>
						<Text
							style={{
								color: "#030303",
								fontWeight: "bold",
								fontSize: 20,
								fontFamily: "SourceSansProSemibold",
								textAlign: "center",
							}}
						>
							-5
						</Text>
					</Pressable>
					<Text
						style={{
							color: "#FFFFFF",
							fontWeight: "bold",
							fontSize: 20,
							fontFamily: "SourceSansProSemibold",
							textAlign: "center",
							marginLeft: 20,
							marginRight: 20,
						}}
					>
						{config_wait_time} Minuten warten
					</Text>
					<Pressable
						onPress={() => {
							store.dispatch({
								type: "SET_SETTINGS",
								payload: {
									no_people: config_no_people,
									wait_time: config_wait_time + 5,
									no_questions: config_no_questions,
								},
							});
						}}
						style={{
							borderColor: "#FFFFFF",
							backgroundColor: "#FFFFFF",
							borderWidth: 4,
							borderRadius: 12,
							paddingTop: 12,
							paddingBottom: 12,
							paddingLeft: 12,
							paddingRight: 12,
							width: 60,
						}}
					>
						<Text
							style={{
								color: "#030303",
								fontWeight: "bold",
								fontSize: 20,
								fontFamily: "SourceSansProSemibold",
								textAlign: "center",
							}}
						>
							+5
						</Text>
					</Pressable>
				</View>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 20,
					}}
				>
					<Pressable
						onPress={() => {
							store.dispatch({
								type: "SET_SETTINGS",
								payload: {
									no_people: config_no_people,
									wait_time: config_wait_time,
									no_questions: config_no_questions - 2,
								},
							});
						}}
						style={{
							borderColor: "#FFFFFF",
							backgroundColor: "#FFFFFF",
							borderWidth: 4,
							borderRadius: 12,
							paddingTop: 12,
							paddingBottom: 12,
							paddingLeft: 12,
							paddingRight: 12,
							width: 60,
						}}
					>
						<Text
							style={{
								color: "#030303",
								fontWeight: "bold",
								fontSize: 20,
								fontFamily: "SourceSansProSemibold",
								textAlign: "center",
							}}
						>
							-2
						</Text>
					</Pressable>
					<Text
						style={{
							color: "#FFFFFF",
							fontWeight: "bold",
							fontSize: 20,
							fontFamily: "SourceSansProSemibold",
							textAlign: "center",
							marginLeft: 20,
							marginRight: 20,
						}}
					>
						{config_no_questions} Fragen
					</Text>
					<Pressable
						onPress={() => {
							store.dispatch({
								type: "SET_SETTINGS",
								payload: {
									no_people: config_no_people,
									wait_time: config_wait_time,
									no_questions: config_no_questions + 2,
								},
							});
						}}
						style={{
							borderColor: "#FFFFFF",
							backgroundColor: "#FFFFFF",
							borderWidth: 4,
							borderRadius: 12,
							paddingTop: 12,
							paddingBottom: 12,
							paddingLeft: 12,
							paddingRight: 12,
							width: 60,
						}}
					>
						<Text
							style={{
								color: "#030303",
								fontWeight: "bold",
								fontSize: 20,
								fontFamily: "SourceSansProSemibold",
								textAlign: "center",
							}}
						>
							+2
						</Text>
					</Pressable>
				</View>

				<Pressable
					onPress={() => {
						const data = createPersonas(config_no_people);
						store.dispatch({
							type: "SET_PERSONAS",
							payload: data,
						});
						store.dispatch({
							type: "SET_QUESTIONS",
							payload: createTestQuestions(
								config_no_questions,
								data
							),
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
						marginTop: 40,
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
						Los geht's
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
						backgroundColor: "#FFFFFF",
						borderWidth: 4,
						borderRadius: 12,
						paddingTop: 12,
						paddingBottom: 12,
						paddingLeft: 32,
						paddingRight: 32,
						marginTop: 20,
						width: "90%",
					}}
				>
					<Text
						style={{
							color: "#000000",
							fontWeight: "bold",
							fontSize: 20,
							fontFamily: "SourceSansProSemibold",
							textAlign: "center",
						}}
					>
						Hauptmenu
					</Text>
				</Pressable>

				<Text style={{ marginTop: "auto", color: "#FFFFFF" }}>
					Gedächtnis-Trainer für Medizinische Studiengänge
				</Text>
				<Text style={{ color: "#747474", marginBottom: 20 }}>
					© Mika Hoppe, 2022
				</Text>
			</ImageBackground>
			<StatusBar style="auto" />
		</View>
	);
}
