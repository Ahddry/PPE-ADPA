import * as RootNavigation from "../RootNavigation";
import { MonContext } from "../components/Context";
import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, View, ImageBackground } from "react-native";
import { Appbar, useTheme, Card, Button, Text, Chip, TextInput, Avatar } from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import db from "../storage/user/db";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const theme = useTheme();
    const styles = StyleSheet.create({
        page: {
            flex: 1,
            minHeight: "100%",
        },
        screen: {
            flex: 1,
        },
        image: {
            width: "100%",
            flex: 1,
            alignItems: "center",
            marginTop: 20,
        },
        preContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.elevation.level4,
            borderTopEndRadius: 40,
            borderTopStartRadius: 40,
            marginTop: "-20%",
            padding: 10,
            paddingBottom: "24%",
            width: "100%",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 1,
        },
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.surfaceVariant,
            borderTopEndRadius: 40,
            borderTopStartRadius: 40,
            bottom: 0,
            padding: 10,
            paddingTop: 30,
            paddingBottom: "40%",
            width: "100%",
            marginTop: "-20%",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
        },
        input: {
            margin: 10,
            width: "90%",
            backgroundColor: theme.colors.elevation.level5,
        },
        remplissage: {
            flex: 1,
            height: 270,
        },
        titreContainer: {
            backgroundColor: theme.colors.backdrop,
            padding: 10,
            borderRadius: 30,
            margin: 10,
            marginVertical: 200,
        },
    });

    const { user, connect, disconnect } = useContext(MonContext);

    const connected = useEffect(() => {
        if (user.isConnected) {
            RootNavigation.navigate("Adpa");
        }
    }, [user.isConnected]);

    const users = db.users;
    const navigation = useNavigation();

    const [visible, setVisible] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [eye, setEye] = React.useState("eye-off");

    function handleVisibility() {
        setVisible(!visible);
        if (visible) {
            setEye("eye-off");
        } else {
            setEye("eye");
        }
    }

    function handleLogin() {
        if (email !== "" && password !== "") {
            var emailCheck = email.trim();
            var passwordCheck = password.trim();
            emailCheck = emailCheck.toLowerCase();
            console.log("Email : '" + emailCheck + "' et mot de passe : '" + passwordCheck + "'");
            if (users.find((user) => user.email === emailCheck && user.password === passwordCheck)) {
                console.log("Connexion réussie");
                const username = users.find((user) => user.email === emailCheck && user.password === passwordCheck).username;
                const tel = users.find((user) => user.email === emailCheck && user.password === passwordCheck).telephone;
                const id = users.find((user) => user.email === emailCheck && user.password === passwordCheck).id;
                connect({
                    email: emailCheck,
                    username: username,
                    password: passwordCheck,
                    telephone: tel,
                    id: id,
                    isConnected: true,
                });
                RootNavigation.navigate("Adpa");
            } else if (users.find((user) => user.emailCheck === email)) {
                alert("Mot de passe incorrect");
            } else {
                alert("Email incorrect");
            }
        }
    }

    return (
        <View style={styles.screen}>
            <ScreenWrapper>
                <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
                    <ImageBackground style={styles.image} source={require("../public/login-screen.png")}>
                        <View style={styles.titreContainer}>
                            <Text style={{ color: "rgb(255, 185, 92)", fontWeight: "bold" }} variant="displayLarge">
                                A D P A
                            </Text>
                            <Button onPress={() => navigation.navigate("Adpa")} style={{ backgroundColor: theme.colors.errorContainer }}>
                                <Text style={{ color: theme.colors.onErrorContainer }}>Express connect</Text> {/** TODO : Supprimer cette ligne, elle n'est là que pour le debug */}
                            </Button>
                        </View>
                    </ImageBackground>
                    <View style={styles.preContainer}>
                        <Text style={{ textAlign: "center", color: theme.colors.onSurfaceVariant }} variant="headlineMedium">
                            Se connecter
                        </Text>
                    </View>
                    <View style={styles.container}>
                        <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
                            <TextInput label="Email" style={styles.input} value={email} onChangeText={(email) => setEmail(email)} />
                            <TextInput
                                label="Mot de passe"
                                style={styles.input}
                                secureTextEntry={!visible}
                                right={
                                    <TextInput.Icon
                                        name={eye}
                                        onPress={() => {
                                            handleVisibility();
                                        }}
                                        icon={eye}
                                    />
                                }
                                value={password}
                                onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                        <Button
                            style={{ margin: 10, width: "90%" }}
                            mode="contained"
                            onPress={() => {
                                handleLogin();
                            }}
                        >
                            Se connecter
                        </Button>
                        <Button
                            style={{ margin: 10, width: "90%" }}
                            mode="outlined"
                            onPress={() => {
                                RootNavigation.navigate("Register");
                            }}
                        >
                            S'inscrire
                        </Button>

                        <Text style={{ textAlign: "center", color: theme.colors.onSurfaceVariant }} variant="headlineMedium">
                            Ou se connecter avec
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", margin: 10 }}>
                            <Chip
                                style={{ margin: 10, borderColor: theme.colors.outline, borderWidth: 1 }}
                                icon="facebook"
                                onPress={() => {
                                    console.log("Pressed Facebook");
                                }}
                            >
                                Facebook
                            </Chip>
                            <Chip
                                style={{ margin: 10, borderColor: theme.colors.outline, borderWidth: 1 }}
                                icon="google"
                                onPress={() => {
                                    console.log("Pressed Google");
                                }}
                            >
                                Google
                            </Chip>
                        </View>
                    </View>
                </ScrollView>
            </ScreenWrapper>
        </View>
    );
}
