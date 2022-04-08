import * as Font from "expo-font";

export const _loadFontsAsync = async (callback: () => void) => {
	await Font.loadAsync(
		"SourceSansProExtraLight",
		require("../assets/fonts/SourceSansPro-ExtraLight.ttf")
	);

	await Font.loadAsync(
		"SourceSansProLight",
		require("../assets/fonts/SourceSansPro-Light.ttf")
	);

	await Font.loadAsync(
		"SourceSansProRegular",
		require("../assets/fonts/SourceSansPro-Regular.ttf")
	);

	await Font.loadAsync(
		"SourceSansProSemibold",
		require("../assets/fonts/SourceSansPro-SemiBold.ttf")
	);

	await Font.loadAsync(
		"SourceSansProBold",
		require("../assets/fonts/SourceSansPro-Bold.ttf")
	);

	callback();
};
