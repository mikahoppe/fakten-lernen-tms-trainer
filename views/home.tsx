import { StatusBar } from "expo-status-bar";
import React from "react";
import {
	ImageBackground,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import { background_image } from "../assets/data_uri_images";
import { store } from "../reducer/reducer";
import { Page } from "../types/pages.d";
import { StartButton } from "./components/StartButton";

export default function Home() {
	const image = {
		uri: background_image,
	};

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
						marginBottom: 20,
						color: "#F7FAF4",
						fontSize: 54,
						fontFamily: "SourceSansProBold",
					}}
				>
					👋
				</Text>
				<Text
					style={{
						color: "#F7FAF4",
						fontSize: 36,
						fontWeight: "bold",
						fontFamily: "SourceSansProBold",
						textAlign: "center",
					}}
				>
					Hallo, zukünftige/r Medizinstudent/in!
				</Text>
				<Text
					style={{
						color: "#F7FAF4",
						fontSize: 24,
						fontFamily: "SourceSansProRegular",
						paddingBottom: 20,
					}}
				>
					Willkommen.
				</Text>

				<ScrollView
					style={{
						width: "100%",
					}}
				>
					<Pressable
						onPress={() => {
							store.dispatch({
								type: "SET_VIEW",
								payload: Page.CONFIGURE,
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
							marginLeft: "auto",
							marginRight: "auto",
							width: "90%",
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
							Das Training kann starten!
						</Text>
					</Pressable>

					<StartButton
						title={"Das Original"}
						no_people={15}
						wait_time={60}
						no_questions={20}
					/>

					<StartButton
						title={"Kurz und knapp"}
						no_people={5}
						wait_time={10}
						no_questions={5}
					/>

					<StartButton
						title={"Langatmige Kleinigkeiten"}
						no_people={5}
						wait_time={120}
						no_questions={5}
					/>

					<StartButton
						title={"Informationsflut"}
						no_people={20}
						wait_time={10}
						no_questions={20}
					/>

					<StartButton
						title={"Ein Ozean voller träger Menschen"}
						no_people={30}
						wait_time={60}
						no_questions={30}
					/>

					<StartButton
						title={"Made in USA"}
						no_people={20}
						wait_time={45}
						no_questions={20}
					/>
				</ScrollView>

				<Text
					style={{
						marginTop: "auto",
						color: "#FFFFFF",
						paddingTop: 20,
					}}
				>
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
