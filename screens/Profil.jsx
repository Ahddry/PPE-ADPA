import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, useTheme, Button, Text, Divider, IconButton, Avatar, List } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";

export default function Profil() {
    const theme = useTheme();
    const styles = StyleSheet.create({
        page: {
            flex: 1,
            alignItems: "center",
            marginTop: 20,
        },
        screen: {
            flex: 1,
        },
        liste: {
            marginTop: 20,
            alignItems: "stretch",
        },
    });

    return (
        <View style={styles.screen}>
            <Appbar.Header elevated>
                <Appbar.Content title="Profil" />
            </Appbar.Header>
            <ScreenWrapper>
                <View style={styles.page}>
                    <Avatar.Image size={100} source={require("../public/avatar.png")} />
                    <Text style={{ marginTop: 10 }} variant="headlineMedium">
                        Prénom Nom
                    </Text>
                </View>
                <List.Section style={styles.liste} title="Mes informations">
                    <List.Item title="Email" left={() => <List.Icon icon="email" style={{ marginLeft: 15 }} />} right={() => <Text>prenom.nom@example.com</Text>} />
                    <List.Item title="Téléphone" left={() => <List.Icon icon="phone" style={{ marginLeft: 15 }} />} right={() => <Text>06 12 34 56 78</Text>} />
                    <List.Item
                        title="Mot de passe"
                        left={() => <List.Icon icon="lock" style={{ marginLeft: 15 }} />}
                        right={() => (
                            <>
                                <Text style={{ marginRight: 3, marginTop: 2 }}>●●●●●●●●</Text>
                                <List.Icon icon="eye-off" />
                            </>
                        )}
                    />
                </List.Section>
                <List.Section style={styles.liste} title="Mes pré-sets">
                    <List.Accordion left={(props) => <List.Icon {...props} icon="walk" style={{ marginLeft: 7 }} />} title="Marche">
                        <List.Item left={(props) => <List.Icon {...props} icon="volume-minus" style={{ marginLeft: 15 }} />} title={"Limite basse : " + "25"} right={(props) => <List.Icon {...props} icon="pencil" />} onPress={() => ""} />
                        <List.Item left={(props) => <List.Icon {...props} icon="volume-plus" style={{ marginLeft: 15 }} />} title={"Limite haute : " + "75"} right={(props) => <List.Icon {...props} icon="pencil" />} onPress={() => ""} />
                    </List.Accordion>
                    <Divider />
                    <List.Accordion left={(props) => <List.Icon {...props} icon="train" style={{ marginLeft: 7 }} />} title="Transports">
                        <List.Item left={(props) => <List.Icon {...props} icon="volume-minus" style={{ marginLeft: 15 }} />} title={"Limite basse : " + "15"} right={(props) => <List.Icon {...props} icon="pencil" />} onPress={() => ""} />
                        <List.Item left={(props) => <List.Icon {...props} icon="volume-plus" style={{ marginLeft: 15 }} />} title={"Limite haute : " + "80"} right={(props) => <List.Icon {...props} icon="pencil" />} onPress={() => ""} />
                    </List.Accordion>
                    <Divider />
                    <List.Accordion left={(props) => <List.Icon {...props} icon="text-box-check" style={{ marginLeft: 7 }} />} title="Travail">
                        <List.Item left={(props) => <List.Icon {...props} icon="volume-minus" style={{ marginLeft: 15 }} />} title={"Limite basse : " + "10"} right={(props) => <List.Icon {...props} icon="pencil" />} onPress={() => ""} />
                        <List.Item left={(props) => <List.Icon {...props} icon="volume-plus" style={{ marginLeft: 15 }} />} title={"Limite haute : " + "70"} right={(props) => <List.Icon {...props} icon="pencil" />} onPress={() => ""} />
                    </List.Accordion>
                </List.Section>
                <List.Section style={styles.liste} title="Se déconnecter">
                    <List.Item
                        title="Se déconnecter"
                        left={() => <List.Icon icon="logout" style={{ marginLeft: 15 }} color={theme.colors.error} />}
                        titleStyle={{ color: theme.colors.error }}
                        right={(props) => <List.Icon {...props} icon="arrow-right" color={theme.colors.error} />}
                        onPress={() => ""}
                    />
                </List.Section>
            </ScreenWrapper>
        </View>
    );
}
