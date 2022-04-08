import React from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { Page } from "./types/pages.d";
import { AppState } from "./types/state.d";

import Home from "./views/home";
import Learn from "./views/learn";
import Wait from "./views/wait";
import Answer from "./views/answer";
import Configure from "./views/configure";
import Evaluate from "./views/evaluate";

export default function AppViewManager() {
	const view = useSelector((state: AppState) => state.view);

	const renderView = () => {
		switch (view) {
			case Page.HOME:
				return <Home />;

			case Page.LEARN:
				return <Learn />;

			case Page.WAIT:
				return <Wait />;

			case Page.ANSWER:
				return <Answer />;

			case Page.EVALUATE:
				return <Evaluate />;

			case Page.CONFIGURE:
				return <Configure />;

			default:
				return (
					<>
						<Text>Error, something went terribly wrong.</Text>
						<StatusBar style="auto" />
					</>
				);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#000000",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{renderView()}
		</View>
	);
}
