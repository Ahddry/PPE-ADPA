import * as RootNavigation from "../RootNavigation";
import { MonContext } from "../components/Context";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, ImageBackground } from "react-native";
import {
  Appbar,
  useTheme,
  Card,
  Button,
  Text,
  Chip,
  TextInput,
  Avatar,
} from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import db from "../storage/user/db";

import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

/**
 * Page de connexion de l'utilisateur à l'application
 * TODO: Back-end
 * @returns {JSX.Element} Page de connexion
 */
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

  // Informations récupérées depuis le contexte
  const { connect, disconnect, setUser } = useContext(MonContext);
  // const users = db.users;
  var database = SQLite.openDatabase({ name: "adpa.db" });
  const [isLoading, setIsLoading] = useState(true);

  const [visible, setVisible] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [eye, setEye] = React.useState("eye-off");

  // use effect pour chargement de la db
  useEffect(() => {
    database.transaction((tx) => {
      //  tx.executeSql("DROP TABLE IF EXISTS users");
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, phone varchar(50), login varchar(50), pwd varchar(50))"
      );
    });
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users",
        [],
        (txObj, resultSet) => setUsers(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, [database]);

  function handleVisibility() {
    setVisible(!visible);
    if (visible) {
      setEye("eye-off");
    } else {
      setEye("eye");
    }
  }

  // Fonction de connexion
  // TODO : BDD + vérification des informations back-end
  const handleLogin = () => {
    if (email !== "" && password !== "") {
      var emailCheck = email.trim();
      var passwordCheck = password.trim();
      emailCheck = emailCheck.toLowerCase();
      console.log(
        "Email : '" + emailCheck + "' et mot de passe : '" + passwordCheck + "'"
      );
      var incorrectEmail = false;
      var incorrectPwd = false;
      console.log(users.length);
      for (var i = 0; i < users.length; i++) {
        console.log(i);
        if (users[i].login == emailCheck && users[i].pwd == passwordCheck) {
          console.log("Connecté");
          connect({
            id: users[i].id,
            username: users[i].username,
            email: users[i].login,
            password: users[i].pwd,
            telephone: users[i].phone,
            isConnected: true,
          });
          alert("Connecté");
          if (users[i].login === emailCheck && users[i].pwd != passwordCheck) {
            incorrectPwd = true;
          }
          if (users[i].login != emailCheck && users[i].pwd === passwordCheck) {
            incorrectEmail = true;
          }
        }
        if (incorrectEmail) {
          alert("Email incorrect");
        }
        if (incorrectPwd) {
          alert("Mot de passe incorrect");
        }
        if (isConnected) {
          console.log("Connecté");
        }
      }
    }
  };

  return (
    <View style={styles.screen}>
      <ScreenWrapper>
        <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={styles.image}
            source={require("../public/login-screen.png")}
          >
            <View style={styles.titreContainer}>
              <Text
                style={{ color: "rgb(255, 185, 92)", fontWeight: "bold" }}
                variant="displayLarge"
              >
                A D P A
              </Text>
              <Button
                onPress={() =>
                  connect({
                    id: 1,
                    username: "test",
                    email: "test@example.com",
                    password: "test",
                    telephone: "0123456789",
                    presets: [
                      {
                        nom: "Marche",
                        min: 25,
                        max: 75,
                        icone: "walk",
                      },
                      {
                        nom: "Transport",
                        min: 15,
                        max: 80,
                        icone: "train",
                      },
                      {
                        nom: "Travail",
                        min: 10,
                        max: 70,
                        icone: "text-box-check",
                      },
                    ],
                    isConnected: true,
                  })
                }
                style={{ backgroundColor: theme.colors.errorContainer }}
              >
                <Text style={{ color: theme.colors.onErrorContainer }}>
                  Express connect
                </Text>{" "}
                {/** TODO : Supprimer cette ligne, elle n'est là que pour le debug */}
              </Button>
            </View>
          </ImageBackground>
          <View style={styles.preContainer}>
            <Text
              style={{
                textAlign: "center",
                color: theme.colors.onSurfaceVariant,
              }}
              variant="headlineMedium"
            >
              Se connecter
            </Text>
          </View>
          <View style={styles.container}>
            <View
              style={{ marginTop: 20, width: "100%", alignItems: "center" }}
            >
              <TextInput
                label="Email"
                style={styles.input}
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
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

            {/* Aucune idée de si on va s'en servir, je les ai mis mais y'a pas de back de fait pour l'instant, on peut les enlever si on veut */}
            <Text
              style={{
                textAlign: "center",
                color: theme.colors.onSurfaceVariant,
              }}
              variant="headlineMedium"
            >
              Ou se connecter avec
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              }}
            >
              <Chip
                style={{
                  margin: 10,
                  borderColor: theme.colors.outline,
                  borderWidth: 1,
                }}
                icon="facebook"
                onPress={() => {
                  console.log("Pressed Facebook");
                }}
              >
                Facebook
              </Chip>
              <Chip
                style={{
                  margin: 10,
                  borderColor: theme.colors.outline,
                  borderWidth: 1,
                }}
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
