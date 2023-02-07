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
import { useNavigation } from "@react-navigation/native";
import { validate } from "react-email-validator";

import * as SQLite from "expo-sqlite";
/**
 * Page d'inscription, principalement identique à la page de connexion
 * TODO: Back-end
 * @returns {JSX.Element} Page d'inscription
 */
export default function Register() {
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
  const { connect, disconnect } = useContext(MonContext);

  const [visible, setVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [eye, setEye] = React.useState("eye-off");
  const [users, setUsers] = useState([]);

  var database = openDatabase({ name: "adpa.db" });
  const [isLoading, setIsLoading] = useState(true);

  var success = false;
  useEffect(() => {
    /* database.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, phone varchar(50), login varchar(50), pwd varchar(50))"
      );
    });*/
    database.transaction((tx) => {
      tx.executeSql(
        "Select * from users",
        [],
        (txObj, results) => setUsers(results.rows._array),
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

  // Fonction qui permet de s'inscrire
  // TODO : BDD + vérification des informations back-end

  function registerDatabase() {
    database.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (username phone, login, pwd) VALUES (?,?,?,?,?)",
        [username, tel, email, password],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert("Votre inscription est réussie, vous pouvez vous connecter", [
              connect({
                text: "Ok",
                onPress: () => navigation.navigate("Login"),
                email: emailCheck,
                username: usernameCheck,
                password: passwordCheck,
                isConnected: true,
                tel: phoneCheck,
                id: database.users.length + 1,
                success: true,
              }),
            ]);
          } else alert("L'inscription a échouée");
        }
      );
    });
  }
  function handleRegister() {
    if (email !== "" && password !== "") {
      var emailCheck = email.trim();
      var usernameCheck = username.trim();
      var passwordCheck = password.trim();
      var phoneCheck = tel.trim();
      emailCheck = emailCheck.toLowerCase();
      console.log(
        "Email : '" +
          emailCheck +
          "', username : '" +
          usernameCheck +
          "' et mot de passe : '" +
          passwordCheck +
          "'"
      );
      if (validate(emailCheck)) {
        if (usernameCheck !== "") {
          if (passwordCheck !== "") {
            if (passwordCheck.length >= 8) {
              var userExist = false;
              users.forEach((user) => {
                if (user.email === emailCheck) {
                  userExist = true;
                }
              });
              if (!userExist) {
                registerDatabase();
                // TODO : Ajouter l'utilisateur dans la base de données
                /// DONE
                if (success) {
                  console.log("L'utilisateur a été créé !");
                }
              } else {
                alert("L'utilisateur existe déjà !");
              }
            } else {
              alert("Le mot de passe doit faire au moins 8 caractères !");
            }
          } else {
            alert("Le mot de passe est vide !");
          }
        } else {
          alert("Le nom d'utilisateur est vide !");
        }
      } else {
        alert("L'email est invalide !");
      }
    }
  }

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
              S'inscrire
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
                label="Nom d'utilisateur"
                style={styles.input}
                value={username}
                onChangeText={(username) => setUsername(username)}
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
              <TextInput
                label="Téléphone"
                style={styles.input}
                value={tel}
                onChangeText={(tel) => setTel(tel)}
              />
            </View>
            <Button
              style={{ margin: 10, width: "90%" }}
              mode="contained"
              onPress={() => {
                handleRegister();
              }}
            >
              S'inscrire
            </Button>
            <Text
              style={{
                textAlign: "center",
                color: theme.colors.onSurfaceVariant,
              }}
              variant="headlineMedium"
            >
              Vous avez déjà un compte ?
            </Text>
            <Button
              style={{ margin: 10, width: "90%" }}
              mode="outlined"
              onPress={() => {
                RootNavigation.navigate("Login");
              }}
            >
              Se connecter
            </Button>
          </View>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
}
