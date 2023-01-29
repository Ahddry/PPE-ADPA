import CarteArticle from "../components/CarteArticle";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, useTheme, Card, Button, Text, Chip } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import db from "../storage/articles/db";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { navigationRef } from "../RootNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import Articles from "./Articles";

function Informations() {
    const theme = useTheme();
    const styles = StyleSheet.create({
        page: {
            flex: 1,
            alignItems: "center",
        },
        screen: {
            flex: 1,
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

    const tags = ["Information", "Interview", "Santé", "Technologie", "Ecoute", "Média"];
    const [articles, setArticles] = React.useState(db.articles);
    const [selectedChip, setSelectedChip] = React.useState("Populaires");
    return (
        <View style={styles.screen}>
            <Appbar.Header elevated>
                <Appbar.Content title="Informations" />
            </Appbar.Header>
            <ScreenWrapper>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.chipsContainer} contentContainerStyle={styles.chipsContent}>
                    <Chip
                        onPress={() => {
                            setArticles(db.articles.sort((a, b) => (a.id < b.id ? -1 : 1)));
                            setSelectedChip("Populaires");
                        }}
                        style={styles.chip}
                        selected={selectedChip === "Populaires"}
                        showSelectedOverlay={selectedChip === "Populaires"}
                    >
                        Populaires
                    </Chip>
                    <Chip
                        onPress={() => {
                            setArticles(db.articles.sort((a, b) => (a.date > b.date ? -1 : 1)));
                            setSelectedChip("Les plus récents");
                        }}
                        style={styles.chip}
                        selected={selectedChip === "Les plus récents"}
                        showSelectedOverlay={selectedChip === "Les plus récents"}
                    >
                        Les plus récents
                    </Chip>

                    {tags.map((tag) => (
                        <Chip
                            onPress={() => {
                                setArticles(db.articles.filter((article) => article.tags.includes(tag)));
                                setSelectedChip(tag);
                            }}
                            style={styles.chip}
                            selected={selectedChip === tag}
                            showSelectedOverlay={selectedChip === tag}
                            key={tag}
                        >
                            {tag}
                        </Chip>
                    ))}
                </ScrollView>
                <View style={styles.cardContainer}>
                    {articles.map((article) => (
                        <CarteArticle article={article} key={article.id} />
                    ))}
                </View>
            </ScreenWrapper>
        </View>
    );
}

export default function Infos() {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name="Infos" component={Informations} options={{ headerShown: false }} />
                <Stack.Screen name="Articles" component={Articles} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
