import React, { Component } from "react";
import { Easing, FlatList, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { Appbar, useTheme, Card, Button, Text, Chip, Divider, IconButton, Provider } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Profil() {
    const theme = useTheme();
    const styles = StyleSheet.create({
        page: {
            flex: 1,
            alignItems: "center",
        },
        screen: {
            flex: 1,
        },
    });

    return (
        <View style={styles.screen}>
            <Appbar.Header elevated>
                <Appbar.Content title="Profil" />
            </Appbar.Header>
            <ScreenWrapper>
                <View style={styles.page}>
                    <Text>Profil</Text>
                </View>
            </ScreenWrapper>
        </View>
    );
}
