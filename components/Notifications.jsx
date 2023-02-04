import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, useTheme, Card, Button, Text, Chip, List, Divider } from "react-native-paper";
import ScreenWrapper from "./ScreenWrapper";
import db from "../storage/articles/db";
import { useNavigation } from "@react-navigation/native";

export default function Notifications() {
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

    const navigation = useNavigation();

    return (
        <View style={styles.screen}>
            <Appbar.Header elevated>
                <Appbar.Content title="Paramètres de notifications" />
            </Appbar.Header>
            <ScreenWrapper>
                <View>
                    <List.Section title="Notifications">
                        <List.Item
                            title="Notifications"
                            onPress={() => {
                                navigation.goBack();
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
                    </List.Section>
                </View>
            </ScreenWrapper>
        </View>
    );
}
