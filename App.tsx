import React, { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./reducer/reducer";

import { _loadFontsAsync } from "./utils/_loadFontsAsync";
import AppViewManager from "./AppViewManager";
import { ImageBackground } from "react-native";
import { background_image } from "./assets/data_uri_images";

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);
	_loadFontsAsync(() => {
		setFontsLoaded(true);
	});

	const image = {
		uri: background_image,
	};

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{fontsLoaded ? (
					<AppViewManager />
				) : (
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
					/>
				)}
			</PersistGate>
		</Provider>
	);
}
