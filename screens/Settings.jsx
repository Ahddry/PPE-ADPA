import { ThemeContext } from "../components/Context";
import React, { Component, useState, useContext } from "react";
import { Easing, FlatList, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { Appbar, useTheme, Card, Button, Text, Chip, Divider, IconButton, List, Switch } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Settings() {
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

    const { toggleTheme, isDarkTheme } = useContext(ThemeContext);

    const [isSwitchOn, setIsSwitchOn] = useState(true);

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
        toggleTheme();
    };

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
                        <List.Item title="Notifications" onPress={() => ""} left={(props) => <List.Icon {...props} icon="bell" style={{ marginLeft: 15 }} />} right={(props) => <List.Icon {...props} icon="arrow-right" />} />
                        <Divider />
                        <List.Item
                            title="Avancé"
                            description="Options de votre téléphone"
                            onPress={() => ""}
                            left={(props) => <List.Icon {...props} icon="cog" style={{ marginLeft: 15 }} />}
                            right={(props) => <List.Icon {...props} icon="arrow-right" />}
                        />
                        <Divider />
                    </List.Section>
                    <List.Section title="À propos">
                        <List.Item title="Version" left={(props) => <List.Icon {...props} icon="information" style={{ marginLeft: 15 }} />} right={() => <Text>0.2.1</Text>} />
                        <Divider />
                        <Divider />
                    </List.Section>
                </View>
            </ScreenWrapper>
        </View>
    );
}
