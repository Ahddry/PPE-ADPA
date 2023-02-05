import Home from "./screens/Home";
import Infos from "./screens/Infos";
import Profil from "./screens/Profil";
import Settings from "./screens/Settings";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { MonContext } from "./components/Context";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { BottomNavigation, Provider as PaperProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "./theme";

const HomeRoute = () => <Home />;
const InfosRoute = () => <Infos />;
const ProfileRoute = () => <Profil />;
const SettingsRoute = () => <Settings />;

function Adpa() {
    const [isDarkTheme, setIsDarkTheme] = React.useState(true);
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
        <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene}>
            <StatusBar style={isDarkTheme ? "light" : "dark"} />
        </BottomNavigation>
    );
}

export default function App() {
    const [isDarkTheme, setIsDarkTheme] = React.useState(true);
    const [user, setUser] = React.useState(null);

    const context = React.useMemo(
        () => ({
            isDarkTheme: isDarkTheme,
            toggleTheme: () => {
                setIsDarkTheme((isDarkTheme) => !isDarkTheme);
            },
            user: user,
            connect: (user) => {
                setUser(user);
                console.log(user);
                console.log("Connexion");
            },
        }),
        [user]
    );

    const theme = isDarkTheme ? darkTheme : lightTheme;

    const Stack = createStackNavigator();

    return (
        <PaperProvider theme={theme}>
            <MonContext.Provider value={context}>
                <NavigationContainer ref={navigationRef}>
                    {user ? (
                        <Adpa />
                    ) : (
                        <Stack.Navigator>
                            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                            {/* <Stack.Screen name="Adpa" component={Adpa} options={{ headerShown: false }} /> */}
                        </Stack.Navigator>
                    )}
                </NavigationContainer>
                <StatusBar style={isDarkTheme ? "light" : "dark"} />
            </MonContext.Provider>
        </PaperProvider>
    );
}
