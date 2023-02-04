import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, useTheme, RadioButton, Text, List } from "react-native-paper";
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

    const [checked, setChecked] = React.useState("aucune");

    return (
        <View style={styles.screen}>
            <Appbar.Header elevated>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                <Appbar.Content title="Paramètres de notifications" />
            </Appbar.Header>
            <ScreenWrapper>
                <View>
                    <List.Section title="Notifications">
                        <RadioButton.Group onValueChange={(newValue) => setChecked(newValue)} value={checked}>
                            <List.Item title="Aucune" description="Vous ne recevrez aucune notification" left={(props) => <RadioButton {...props} value="aucune" />} />
                            <List.Item title="Importantes seulement" description="Recevez uniquement les notifications vous avertissant d'un danger lors de vos écoutes" left={(props) => <RadioButton {...props} value="importantes" />} />
                            <List.Item title="Toutes" description="Recevez toutes les notifications" left={(props) => <RadioButton {...props} value="toutes" />} />
                        </RadioButton.Group>
                    </List.Section>
                </View>
            </ScreenWrapper>
        </View>
    );
}
