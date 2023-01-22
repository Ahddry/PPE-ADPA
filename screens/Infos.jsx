import React, { Component } from "react";
import { Easing, FlatList, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { Appbar, useTheme, Card, Button, Text, Chip, Divider, IconButton, Provider } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Infos() {
    const theme = useTheme();
    const styles = StyleSheet.create({
        page: {
            flex: 1,
            alignItems: "center",
        },
        screen: {
            flex: 1,
        },
        card: {
            marginHorizontal: 8,
            marginBottom: 10,
        },
        cardContainer: {
            marginBottom: 80,
        },
        chipsContainer: {
            flexDirection: "row",
        },
        chipsContent: {
            paddingLeft: 8,
            paddingVertical: 8,
        },
        chip: {
            marginRight: 8,
        },
    });

    return (
        <View style={styles.screen}>
            <Appbar.Header elevated>
                <Appbar.Content title="Informations" />
            </Appbar.Header>
            <ScreenWrapper>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.chipsContainer} contentContainerStyle={styles.chipsContent}>
                    <Chip selected onPress={() => {}} style={styles.chip} showSelectedOverlay>
                        Populaires
                    </Chip>
                    <Chip onPress={() => {}} style={styles.chip}>
                        Les plus récents
                    </Chip>
                    <Chip onPress={() => {}} style={styles.chip}>
                        Interviews
                    </Chip>
                    <Chip onPress={() => {}} style={styles.chip}>
                        Santé
                    </Chip>
                    <Chip onPress={() => {}} style={styles.chip}>
                        Technologie
                    </Chip>
                </ScrollView>
                <View style={styles.cardContainer}>
                    <Card style={styles.card} mode="contained">
                        <Card.Cover source={require("../public/schema1.jpg")} />
                        <Card.Title title="L'oreille" titleVariant="headlineMedium" />
                        <Card.Content>
                            <Text variant="bodyMedium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed nisl euismod, lacinia...</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => {}}>Partager</Button>
                            <Button onPress={() => {}}>Lire l'article</Button>
                        </Card.Actions>
                    </Card>
                    <Card style={styles.card} mode="contained">
                        <Card.Cover resizeMode="cover" source={require("../public/schema2.jpg")} />
                        <Card.Title title="L'écoute prolongée d'un média à trop haute intensité sonore" titleVariant="headlineMedium" />
                        <Card.Content>
                            <Text variant="bodyMedium">
                                Have you ever heard the tragedy of Darth Plagueis the Wise? I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use
                                the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities
                                some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his
                                apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => {}}>Partager</Button>
                            <Button onPress={() => {}}>Lire l'article</Button>
                        </Card.Actions>
                    </Card>
                </View>
            </ScreenWrapper>
        </View>
    );
}
