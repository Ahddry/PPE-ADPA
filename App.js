import Home from "./screens/Home";
import Infos from "./screens/Infos";
import Profil from "./screens/Profil";
import Settings from "./screens/Settings";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { BottomNavigation, Provider as PaperProvider } from "react-native-paper";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { Appearance } from "react-native";

const HomeRoute = () => <Home />;

const InfosRoute = () => <Infos />;

const ProfileRoute = () => <Profil />;

const SettingsRoute = () => <Settings />;

export default function App() {
    const [colorScheme, setColorScheme] = React.useState(Appearance.getColorScheme());
    React.useEffect(() => {
        const subscribtion = Appearance.addChangeListener(({ colorScheme }) => {
            setColorScheme(colorScheme);
            if (colorScheme === "dark") {
                setIsDarkTheme(true);
            } else {
                setIsDarkTheme(false);
            }
            console.log(colorScheme);
        });
        return () => subscribtion.remove();
    }, []);
    const [isDarkTheme, setIsDarkTheme] = React.useState(true);
    const theme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: "home", title: "ADPA", focusedIcon: "headphones", unfocusedIcon: "headphones" },
        { key: "infos", title: "Infos", focusedIcon: "newspaper-variant", unfocusedIcon: "newspaper-variant-outline" },
        { key: "profil", title: "Profil", focusedIcon: "account", unfocusedIcon: "account-outline" },
        { key: "settings", title: "Paramètres", focusedIcon: "cog", unfocusedIcon: "cog-outline" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        profil: ProfileRoute,
        infos: InfosRoute,
        settings: SettingsRoute,
    });

    return (
        <PaperProvider theme={theme}>
            <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} theme={theme}>
                <StatusBar style={isDarkTheme ? "light" : "dark"} />
            </BottomNavigation>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
