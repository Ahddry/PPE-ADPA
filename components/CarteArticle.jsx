import * as RootNavigation from "../RootNavigation.js";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, useTheme, Card, Button, Text, Chip } from "react-native-paper";
//import { useNavigation } from "@react-navigation/native";

export default function CarteArticle({ article }) {
    var illustration;
    if (article.illustration !== undefined) {
        illustration = article.illustration;
    }
    const titre = article.titre;
    const tags = article.tags;
    const auteurs = article.auteurs;
    var description = article.contenu[0].section;
    const id = article.id;

    if (description.length > 100) {
        description = description.substring(0, 100) + "...";
    }

    const theme = useTheme();
    const styles = StyleSheet.create({
        card: {
            marginHorizontal: 8,
            marginBottom: 10,
        },
        cardContainer: {
            marginBottom: 80,
        },
        tags: {
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "black",
        },
        tagsButton: {
            marginRight: 8,
            marginTop: 8,
            backgroundColor: theme.colors.backdrop,
            color: theme.colors.text,
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

    var sousTitre = (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.chipsContainer} contentContainerStyle={styles.chipsContent}>
            {tags.map((tag) => (
                <Chip style={styles.tagsButton} key={tag + article.id}>
                    {tag}
                </Chip>
            ))}
        </ScrollView>
    );

    //const navigation = useNavigation();
    return (
        <View>
            <Card style={styles.card} mode="contained">
                {illustration !== undefined ? <Card.Cover source={{ uri: illustration }} /> : null}
                <Card.Title title={titre} titleVariant="headlineMedium" />
                <Card.Content>
                    <Text variant="bodyMedium">{description}</Text>
                    {sousTitre}
                </Card.Content>
                <Card.Actions>
                    <Button
                        mode="contained"
                        onPress={() => {
                            RootNavigation.navigate("Articles", { id: id });
                        }}
                        key={id}
                    >
                        Lire l'article
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    );
}
