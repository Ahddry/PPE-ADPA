import Notifications from "../components/Notifications";
import * as RootNavigation from "../RootNavigation.js";
import { MonContext } from "../components/Context";
import React, { Component, useState, useContext, useCallback } from "react";
import { StyleSheet, Linking, View } from "react-native";
import { Appbar, useTheme, Card, Button, Text, Chip, Divider, IconButton, List, Switch } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { navigationRef } from "../RootNavigation";
import { createStackNavigator } from "@react-navigation/stack";

/**
 * Page de paramètres
 * @returns {JSX.Element} Page de paramètres
 */
function Parametres() {
    const theme = useTheme();
    const styles = StyleSheet.create({
        page: {
            flex: 1,
            alignItems: "stretch",
        },
        screen: {
            flex: 1,
        },
    });

    const { toggleTheme, isDarkTheme } = useContext(MonContext);

    const [isSwitchOn, setIsSwitchOn] = useState(true);

    // Switch theme
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        toggleTheme();
    };

    const ouvrirParametres = useCallback(async () => {
        await Linking.openSettings();
    }, []);

    return (
        <View style={styles.screen}>
            <Appbar.Header elevated>
                <Appbar.Content title="Paramètres" />
            </Appbar.Header>
            <ScreenWrapper>
                <View>
                    <List.Section title="Apparence">
                        <List.Item title="Thème sombre" left={(props) => <List.Icon {...props} icon="brightness-4" style={{ marginLeft: 15 }} />} right={() => <Switch value={isSwitchOn} style={styles.centered} onChange={onToggleSwitch} />} />
                        <Divider />
                        <Divider />
                    </List.Section>
                    <List.Section title="Appareil">
                        <List.Item
                            title="Notifications"
                            onPress={() => {
                                RootNavigation.navigate("Notifications");
                            }}
                            left={(props) => <List.Icon {...props} icon="bell" style={{ marginLeft: 15 }} />}
                            right={(props) => <List.Icon {...props} icon="arrow-right" />}
                        />
                        <Divider />
                        <List.Item
                            title="Avancé"
                            description="Options de votre téléphone"
                            onPress={() => ouvrirParametres()}
                            left={(props) => <List.Icon {...props} icon="cog" style={{ marginLeft: 15 }} />}
                            right={(props) => <List.Icon {...props} icon="arrow-right" />}
                        />
                        <Divider />
                    </List.Section>
                    <List.Section title="À propos">
                        <List.Item title="Version" onPress={() => ""} left={(props) => <List.Icon {...props} icon="information" style={{ marginLeft: 15 }} />} right={() => <Text>0.7.1</Text>} />
                        <Divider />
                        <Divider />
                    </List.Section>
                </View>
            </ScreenWrapper>
        </View>
    );
}

export default function Settings() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer ref={navigationRef} independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Parametres" component={Parametres} options={{ headerShown: false }} />
                <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
