import Home from "./screens/Home";
import Infos from "./screens/Infos";
import Profil from "./screens/Profil";
import Settings from "./screens/Settings";
import Articles from "./screens/Articles";
import { ThemeContext } from "./components/Context";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { BottomNavigation, Provider as PaperProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "./theme";

const HomeRoute = () => <Home />;
const InfosRoute = () => <Infos />;
const ProfileRoute = () => <Profil />;
const SettingsRoute = () => <Settings />;
const ArticlesRoute = () => <Articles />;

export default function App() {
    const [isDarkTheme, setIsDarkTheme] = React.useState(true);

    const context = React.useMemo(
        () => ({
            isDarkTheme: isDarkTheme,
            toggleTheme: () => {
                setIsDarkTheme((isDarkTheme) => !isDarkTheme);
            },
        }),
        []
    );

    const theme = isDarkTheme ? darkTheme : lightTheme;

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
            <ThemeContext.Provider value={context}>
                <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene}>
                    <StatusBar style={isDarkTheme ? "light" : "dark"} />
                </BottomNavigation>
            </ThemeContext.Provider>
        </PaperProvider>
    );
}
