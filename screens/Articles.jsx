import React from "react";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Appbar, useTheme, Card, Button, Text, Chip } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import db from "../storage/articles/db";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

/**
 * Page d'un article avec son contenu
 * @see db pour avoir un exemple de contenu
 * @see CarteArticle
 * @see Informations
 * @returns {JSX.Element} Page d'un article avec son contenu
 */
export default function Articles() {
    const route = useRoute();
    const id = route.params?.id;
    const article = db.articles.find((article) => article.id === id);

    const theme = useTheme();
    const styles = StyleSheet.create({
        page: {
            flex: 1,
            marginHorizontal: 4,
            marginBottom: 80,
        },
        screen: {
            flex: 1,
        },
        chipsContainer: {
            flexDirection: "row",
        },
        chipsContent: {
            paddingLeft: 8,
            paddingVertical: 8,
        },
        tagsButton: {
            marginRight: 8,
            marginTop: 8,
            backgroundColor: theme.colors.backdrop,
            color: theme.colors.text,
        },
        titre: {
            marginTop: 16,
            color: theme.colors.primary,
        },
        texte: {
            marginTop: 4,
            color: theme.colors.onBackground,
        },
    });

    const navigation = useNavigation();

    return (
        <View style={styles.screen}>
            <Appbar.Header elevated theme={theme}>
                <Appbar.BackAction
                    onPress={() => {
                        navigation.goBack();
                    }}
                />
                {article ? <Appbar.Content title={article.titre} theme={theme} /> : <Appbar.Content title="Article" />}
            </Appbar.Header>
            {article ? (
                <ScreenWrapper>
                    <View style={styles.page}>
                        <Text variant="displaySmall" style={{ marginTop: 10, color: theme.colors.primary }}>
                            {article.titre}
                        </Text>
                        <Text variant="labelLarge">
                            Le {article.date} par {article.auteurs}
                        </Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.chipsContainer} contentContainerStyle={styles.chipsContent}>
                            {article.tags.map((tag, index) => (
                                <Chip style={styles.tagsButton} key={index}>
                                    {tag}
                                </Chip>
                            ))}
                        </ScrollView>
                        {article.illustration ? <Image source={{ uri: article.illustration }} style={{ width: "100%", height: 200, resizeMode: "cover", borderRadius: 8, marginTop: 16 }} /> : <></>}
                        {article.contenu.map((paragraphe, index) => (
                            <View key={index}>
                                {paragraphe.titre ? (
                                    <Text variant="headlineMedium" style={styles.titre}>
                                        {paragraphe.titre}
                                    </Text>
                                ) : (
                                    <></>
                                )}
                                {paragraphe.section ? (
                                    <Text variant="body" style={styles.texte}>
                                        {paragraphe.section}
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </View>
                        ))}
                    </View>
                </ScreenWrapper>
            ) : (
                <Text variant="displayLarge">Article introuvable</Text>
            )}
        </View>
    );
}
