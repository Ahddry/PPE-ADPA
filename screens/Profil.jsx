import * as RootNavigation from "../RootNavigation";
import { MonContext } from "../components/Context";
import React, { useContext, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Appbar,
  useTheme,
  Button,
  Text,
  Divider,
  IconButton,
  Avatar,
  List,
  Portal,
  Dialog,
  TextInput,
  RadioButton,
} from "react-native-paper";
import ScreenWrapper from "../components/ScreenWrapper";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Page de profil
 * TODO: Fixer le bug du mdp caché qui ne se met pas à jour
 * TODO: Ajouter un bouton pour supprimer un pré-set
 * @returns {JSX.Element} Page de profil
 */
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

  // Contexte pour récupérer les données de l'utilisateur
  const { user, connect, disconnect } = useContext(MonContext);

  const [email, setEmail] = React.useState("inconnu");
  const [telephone, setTelephone] = React.useState("inconnu");
  const [password, setPassword] = React.useState("inconnu");
  const [passwordHidden, setPasswordHidden] = React.useState("●●●●●●●●");
  const [isHidden, setIsHidden] = React.useState(true);
  const [username, setUsername] = React.useState("inconnu");
  const [id, setId] = React.useState("inconnu");

  // Mise à jour des champs quand l'utilisateur change
  useFocusEffect(
    React.useCallback(() => {
      if (user != null) {
        setId(user.id);
        setEmail(user.email);
        setTelephone(user.telephone);
        setPassword(user.password);
        setUsername(user.username);
        setUserPreSets(user.presets);
        setPasswordHidden("●".repeat(user.password.length));
      }
    }, [user])
  );

  //! A compléter pour update le profil avant de disconnect
  /* async function getUser(emailCheck, passwordCheck) {
    console.log("get user");
    const keys = await AsyncStorage.getAllKeys();
    const results = await AsyncStorage.multiGet(keys);
    // display results
    console.log("Results" + results);
    const users = results.map(([key, value]) => {
      return JSON.parse(value);
    });
  }*/
  async function updateUser() {
    try {
      // Save the updated user data to storage
      const userDataJson = JSON.stringify(user);
      await AsyncStorage.setItem(user.id, userDataJson);
    } catch (error) {
      console.error(error);
    }
  }
  /*async function updateUser(userId, newEmail) {
    try {
      // Load the existing user data from storage
      const userDataJson = await AsyncStorage.getItem("user_data");
      const userData = JSON.parse(userDataJson);

      // Find the user in the data array based on their ID
      const userIndex = userData.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        // Update the user's email address in the object
        userData[userIndex].email = newEmail;

        // Save the updated user data back to storage
        const updatedUserDataJson = JSON.stringify(userData);
        await AsyncStorage.setItem("user_data", updatedUserDataJson);
      }
    } catch (error) {
      console.error(error);
    }
  }*/
  const [userPreSets, setUserPreSets] = React.useState([]);

  const [eye, setEye] = React.useState("eye-off");

  function handleVisibility() {
    setIsHidden(!isHidden);
    if (isHidden) {
      setEye("eye-off");
    } else {
      setEye("eye");
    }
  }

  const [visibleLimite, setVisibleLimite] = React.useState(false);
  const [visibleEditPreset, setVisibleEditPreset] = React.useState(false);
  const [visibleAdd, setVisibleAdd] = React.useState(false);
  const [indexDialog, setIndexDialog] = React.useState(0);
  const [minMax, setMinMax] = React.useState(false);

  // Fonction pour modifier les limites min et max d'un pré-set
  function EditLimit({ index, type }) {
    var val;
    if (type) val = userPreSets[index].max;
    else val = userPreSets[index].min;
    const [limite, setLimite] = React.useState(val);
    const hideDialog = () => setVisibleLimite(false);
    function modif() {
      if (isNaN(limite)) {
        alert("La limite doit être un nombre");
        return;
      } else if (limite < 0) {
        alert("La limite doit être positive");
        return;
      } else if (limite > 100) {
        alert("La limite doit être inférieure ou égale à 100");
        return;
      } else {
        if (type) {
          userPreSets[index].max = limite;
        } else {
          userPreSets[index].min = limite;
        }
        var newPreSets = userPreSets;
        setUserPreSets(newPreSets);
        hideDialog();
      }
    }
    return (
      <Portal>
        {index !== null ? (
          <Dialog visible={visibleLimite} onDismiss={hideDialog}>
            <Dialog.Icon icon="pencil" />
            <Dialog.Title style={styles.title}>
              Modifier la limite {type ? "maximale" : "minimale"} du pré-set{" "}
              {userPreSets[index].nom}
            </Dialog.Title>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                <TextInput
                  label="Limite"
                  value={limite}
                  onChangeText={(text) => setLimite(text)}
                  style={{ marginTop: 10 }}
                  mode="outlined"
                  theme={{ colors: { primary: theme.colors.primary } }}
                />
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Annuler</Button>
              <Button onPress={modif}>Modifier</Button>
            </Dialog.Actions>
          </Dialog>
        ) : null}
      </Portal>
    );
  }

  // Fonction pour modifier un pré-set
  function EditPreset({ index }) {
    const hideDialog = () => setVisibleEditPreset(false);
    const [nom, setNom] = React.useState(userPreSets[index].nom);
    const [icone, setIcone] = React.useState(userPreSets[index].icone);
    function modif() {
      var newPreSets = userPreSets;
      newPreSets[index].nom = nom;
      newPreSets[index].icone = icone;
      setUserPreSets(newPreSets);
      hideDialog();
    }
    const choixIcone = [
      "walk",
      "train",
      "text-box-check",
      "clock",
      "bus",
      "star",
      "music-note",
      "tree",
    ];
    return (
      <Portal>
        {index !== null ? (
          <Dialog visible={visibleEditPreset} onDismiss={hideDialog}>
            <Dialog.Icon icon="pencil" />
            <Dialog.Title style={styles.title}>
              Modifier {userPreSets[index].nom}
            </Dialog.Title>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                <TextInput
                  label="Nom"
                  value={nom}
                  onChangeText={(text) => setNom(text)}
                  style={{ marginTop: 10 }}
                  mode="outlined"
                  theme={{ colors: { primary: theme.colors.primary } }}
                />
                <View style={{ marginTop: 10 }}>
                  <Text style={{ marginTop: 10, marginRight: 10 }}>Icône</Text>
                  <RadioButton.Group
                    onValueChange={(value) => setIcone(value)}
                    value={icone}
                  >
                    {choixIcone.map((item, index) => {
                      return (
                        <View
                          key={index + item}
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <RadioButton
                            value={item}
                            status={icone === item ? "checked" : "unchecked"}
                          />
                          <IconButton icon={item} size={20} />
                        </View>
                      );
                    })}
                  </RadioButton.Group>
                </View>
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Annuler</Button>
              <Button onPress={modif}>Modifier</Button>
            </Dialog.Actions>
          </Dialog>
        ) : null}
      </Portal>
    );
  }

  // Fonction pour ajouter un pré-set
  function AddPreset() {
    const hideDialog = () => setVisibleAdd(false);
    const [nom, setNom] = React.useState("");
    const [icone, setIcone] = React.useState("");
    function modif() {
      var newPreSets = userPreSets;
      newPreSets.push({ nom: nom, icone: icone, min: 0, max: 100 });
      setUserPreSets(newPreSets);
      hideDialog();
    }
    const choixIcone = [
      "walk",
      "train",
      "text-box-check",
      "clock",
      "bus",
      "star",
      "music-note",
      "tree",
    ];
    return (
      <Portal>
        <Dialog visible={visibleAdd} onDismiss={hideDialog}>
          <Dialog.Icon icon="pencil" />
          <Dialog.Title style={styles.title}>Ajouter un pré-set</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              <TextInput
                label="Nom"
                value={nom}
                onChangeText={(text) => setNom(text)}
                style={{ marginTop: 10 }}
                mode="outlined"
                theme={{ colors: { primary: theme.colors.primary } }}
              />
              <View style={{ marginTop: 10 }}>
                <Text style={{ marginTop: 10, marginRight: 10 }}>Icône</Text>
                <RadioButton.Group
                  onValueChange={(value) => setIcone(value)}
                  value={icone}
                >
                  {choixIcone.map((item, index) => {
                    return (
                      <View
                        key={item + index}
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <RadioButton
                          value={item}
                          status={icone === item ? "checked" : "unchecked"}
                        />
                        <IconButton icon={item} size={20} />
                      </View>
                    );
                  })}
                </RadioButton.Group>
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Annuler</Button>
            <Button onPress={modif}>Ajouter</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  return (
    <View style={styles.screen}>
      <Appbar.Header elevated>
        <Appbar.Content title="Profil" />
      </Appbar.Header>
      <ScreenWrapper>
        <View style={styles.page}>
          <Avatar.Image size={100} source={require("../public/avatar.png")} />
          <Text style={{ marginTop: 10 }} variant="headlineMedium">
            {username}
          </Text>
        </View>
        <List.Section style={styles.liste} title="Mes informations">
          <List.Item
            title="Email"
            left={() => <List.Icon icon="email" style={{ marginLeft: 15 }} />}
            right={() => <Text>{email}</Text>}
          />
          <List.Item
            title="Téléphone"
            left={() => <List.Icon icon="phone" style={{ marginLeft: 15 }} />}
            right={() => <Text>{telephone}</Text>}
          />
          <List.Item
            title="Mot de passe"
            left={() => <List.Icon icon="lock" style={{ marginLeft: 15 }} />}
            right={() => (
              <>
                <Text style={{ marginRight: 3, marginTop: 2 }}>
                  {isHidden ? passwordHidden : password}
                </Text>
                <List.Icon name={eye} icon={eye} />
              </>
            )}
            onPress={() => handleVisibility()}
          />
        </List.Section>
        {userPreSets.length > 0 ? (
          <List.Section style={styles.liste} title="Mes pré-sets">
            {userPreSets.map((item, index) => {
              return (
                <View key={index}>
                  <List.Accordion
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon={item.icone}
                        style={{ marginLeft: 7 }}
                      />
                    )}
                    title={item.nom}
                  >
                    <List.Item
                      left={(props) => (
                        <List.Icon
                          {...props}
                          icon="volume-minus"
                          style={{ marginLeft: 15 }}
                        />
                      )}
                      title={"Limite basse : " + item.min}
                      right={(props) => <List.Icon {...props} icon="pencil" />}
                      onPress={() => {
                        setIndexDialog(index);
                        setMinMax(false);
                        setVisibleLimite(true);
                      }}
                    />
                    <List.Item
                      left={(props) => (
                        <List.Icon
                          {...props}
                          icon="volume-plus"
                          style={{ marginLeft: 15 }}
                        />
                      )}
                      title={"Limite haute : " + item.max}
                      right={(props) => <List.Icon {...props} icon="pencil" />}
                      onPress={() => {
                        setIndexDialog(index);
                        setMinMax(true);
                        setVisibleLimite(true);
                      }}
                    />
                    <List.Item
                      left={(props) => (
                        <List.Icon
                          {...props}
                          icon="pencil"
                          style={{ marginLeft: 15 }}
                        />
                      )}
                      title={"Renommer"}
                      onPress={() => {
                        setIndexDialog(index);
                        setVisibleEditPreset(true);
                      }}
                    />
                  </List.Accordion>
                  <Divider />
                </View>
              );
            })}
            <List.Item
              title="Ajouter un pré-set"
              left={() => <List.Icon icon="plus" style={{ marginLeft: 15 }} />}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => {
                if (userPreSets.length < 5) setVisibleAdd(true);
                else
                  alert(
                    "Vous ne pouvez pas avoir plus de 5 pré-sets. Veuillez en modifier un existant."
                  );
              }}
            />
            <EditLimit index={indexDialog} type={minMax} />
            <EditPreset index={indexDialog} />
            <AddPreset />
          </List.Section>
        ) : null}
        <List.Section style={styles.liste} title="Se déconnecter">
          <List.Item
            title="Se déconnecter"
            left={() => (
              <List.Icon
                icon="logout"
                style={{ marginLeft: 15 }}
                color={theme.colors.error}
              />
            )}
            titleStyle={{ color: theme.colors.error }}
            right={(props) => (
              <List.Icon
                {...props}
                icon="arrow-right"
                color={theme.colors.error}
              />
            )}
            onPress={() => {
              updateUser();
              disconnect();
            }}
          />
        </List.Section>
      </ScreenWrapper>
    </View>
  );
}
