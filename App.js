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
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  BottomNavigation,
  Provider as PaperProvider,
} from "react-native-paper";
import { lightTheme, darkTheme } from "./theme";
import * as SQLite from "expo-sqlite";
/// Page principale de l'application, est tout en haut du DOM
/// Elle contient les routes principales de l'application
/// Elle contient aussi le contexte de l'application

const HomeRoute = () => <Home />;
const InfosRoute = () => <Infos />;
const ProfileRoute = () => <Profil />;
const SettingsRoute = () => <Settings />;

/**
 * Page d'accueil de l'application (après connexion)
 * @returns {JSX.Element} La page d'accueil de l'application
 */

// Routes Pour l'app
function Adpa() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "ADPA",
      focusedIcon: "headphones",
      unfocusedIcon: "headphones",
    },
    {
      key: "infos",
      title: "Infos",
      focusedIcon: "newspaper-variant",
      unfocusedIcon: "newspaper-varirant-outline",
    },
    {
      key: "profil",
      title: "Profil",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
    {
      key: "settings",
      title: "Paramètres",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    profil: ProfileRoute,
    infos: InfosRoute,
    settings: SettingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    >
      <StatusBar style={isDarkTheme ? "light" : "dark"} />
    </BottomNavigation>
  );
}

/**
 * Page principale de l'application
 * @see MonContext
 * @returns {JSX.Element} La page principale de l'application
 */
export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);
  const [user, setUser] = React.useState(null);
  // Contexte de l'application
  // Il contient les informations de l'utilisateur connecté, les fonctions de connexion et de déconnexion ainsi que le thème de l'application

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
      disconnect: () => {
        setUser(null);
        console.log("Déconnexion");
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
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
        <StatusBar style={isDarkTheme ? "light" : "dark"} />
      </MonContext.Provider>
    </PaperProvider>
  );
}
