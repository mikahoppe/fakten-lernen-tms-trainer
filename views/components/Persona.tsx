import React from "react";
import { View, Text } from "react-native";
import { Persona } from "../../types/persona";

export const PersonaView = ({
	index,
	person,
}: {
	index: number;
	person: Persona;
}) => {
	return (
		<View
			style={{
				paddingTop: 20,
				paddingBottom: 20,
				paddingLeft: 20,
				paddingRight: 150,
				width: "100%",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				backgroundColor: index % 2 === 0 ? "transparent" : "#333333",
			}}
		>
			<Text
				style={{
					marginRight: 20,
					color: "#F7FAF4",
					fontFamily: "SourceSansProBold",
					fontSize: 36,
				}}
			>
				{index + 1}
			</Text>
			<Text
				style={{
					color: "#F7FAF4",
					fontFamily: "SourceSansProRegular",
					fontSize: 20,
				}}
			>
				{person.gender} {person.name}, {person.age} Jahre alt,{" "}
				{person.profession}, {person.illness}, {person.characteristic}
			</Text>
		</View>
	);
};
