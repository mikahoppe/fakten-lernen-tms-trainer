import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import { store } from "../reducer/reducer";
import { AppState } from "../types/state.d";
import { Page } from "../types/pages.d";

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
		};
	},
});

export default function Wait() {
	const config_wait_time = useSelector(
		(state: AppState) => state.settings.wait_time
	);

	const [time, setTime] = useState(new Date().getTime());
	const timer = setInterval(() => {
		setTime(new Date().getTime());
	}, 1000);

	const [pushToken, setPushToken] = useState("");
	useEffect(() => {
		Notifications.getPermissionsAsync()
			.then((statusObj) => {
				if (statusObj.status !== "granted") {
					return Notifications.requestPermissionsAsync();
				}
				return statusObj;
			})
			.then((statusObj) => {
				if (statusObj.status !== "granted") {
					// alert();
					throw new Error("Permission not granted.");
				}
			})
			.then(() => {
				console.log("Getting token..");
				return Notifications.getExpoPushTokenAsync();
			})
			.then((response) => {
				const token = response.data;
				setPushToken(token);
			})
			.catch(() => {
				console.log("Couldn't work out notification management.");
				return null;
			});
	}, []);

	useEffect(() => {
		const backgroundSubscription =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(response);
				}
			);

		const foregroundSubscription =
			Notifications.addNotificationReceivedListener((notification) => {
				console.log(notification);
			});
		return () => {
			backgroundSubscription.remove();
			foregroundSubscription.remove();
		};
	}, []);

	let triggerNotificationHandler = () => {
		fetch("https://exp.host/--/api/v2/push/send/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Accept-Encoding": "gzip, deflate",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: pushToken,
				data: { extraData: "Viel Erfolg und gutes Gelingen!" },
				title: "Die Zeit ist abgelaufen.",
				body: "Es ist der Moment gekommen, um Fragen zu beantworten.",
			}),
		});
	};

	useEffect(() => {
		if (getProgress(time)[1] === 100) {
			const diff = Math.min(
				Math.abs(new Date(start).getTime() - time),
				MAX_TIME + 1001
			);
			if (diff < MAX_TIME + 1001) triggerNotificationHandler();
		}
		return () => {
			clearInterval(timer);
		};
	});

	const MAX_TIME = config_wait_time * 60 * 1000;

	const start: Date = useSelector((state: AppState) => state.time);

	const getProgress = (now: number) => {
		const diff = Math.min(
			Math.abs(new Date(start).getTime() - now),
			MAX_TIME
		);
		return [diff, Math.min((diff * 100) / MAX_TIME, 100)];
	};

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
						color: "#F7FAF4",
						fontFamily: "SourceSansProRegular",
						fontSize: 32,
						textAlign: "center",
						width: "100%",
					}}
				>
					<Text style={{ fontFamily: "SourceSansProBold" }}>
						{Math.floor(
							(MAX_TIME - getProgress(time)[0]) / (1000 * 60 * 60)
						)}{" "}
						Stunden{"\n"}
					</Text>
					<Text style={{ fontFamily: "SourceSansProRegular" }}>
						{Math.floor(
							(MAX_TIME - getProgress(time)[0]) / (1000 * 60)
						) % 60}{" "}
						Minuten{"\n"}
					</Text>
					<Text style={{ fontFamily: "SourceSansProExtraLight" }}>
						{Math.floor((MAX_TIME - getProgress(time)[0]) / 1000) %
							60}{" "}
						Sekunden{"\n"}
					</Text>
				</Text>

				<Pressable
					onPress={() => {
						store.dispatch({
							type: "SET_TIME",
							payload: new Date(),
						});
						store.dispatch({
							type: "SET_VIEW",
							payload: Page.ANSWER,
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
						marginTop: 60,
						marginBottom: 30,
						marginLeft: 20,
						marginRight: 20,
						width: "60%",
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
						height: getProgress(time)[1] + "%",
					}}
				/>
			</View>

			<StatusBar style="auto" />
		</View>
	);
}
