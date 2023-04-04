import { MonContext } from "../components/Context";
import ScreenWrapper from "../components/ScreenWrapper";
import { Component, useState, useEffect, useContext } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import {
  useTheme,
  Text,
  Appbar,
  List,
  SegmentedButtons,
} from "react-native-paper";
import { Slider } from "@miblanchard/react-native-slider";
import RNSoundLevel from 'react-native-sound-level';
import * as Permissions from 'expo';
/**
 * Page d'accueil
 * TODO: Gestion audio à faire avec ces saisies et afficher le resultat dans le gros carré
 * @returns {JSX.Element} Page d'accueil
 */
export default function Home() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    page: {
      flex: 1,
    },
    element: {
      alignItems: "center",
      justifyContent: "center",
    },
    textDecibel: {
      color: theme.colors.secondary,
      fontStyle: "italic",
      fontSize: 50,
      lineHeight: 60,
      fontWeight: "bold",
      marginTop: 20,
    },
    textCurrentDecibel: {
      color: theme.colors.primary,
      fontStyle: "italic",
      fontSize: 100,
      lineHeight: 100,
      fontWeight: "bold",
      marginTop: 20,
    },
    currentDecibelContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 40,
      marginTop: 20,
    },
    sliderContainer: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      alignItems: "stretch",
      justifyContent: "center",
    },

    sliderTrack: {
      backgroundColor: theme.colors.onSecondary,
      height: 18,
      borderRadius: 10,
      borderColor: theme.colors.surfaceVariant,
      borderWidth: 1,
    },

    sliderThumb: {
      width: 40,
      height: 40,
      backgroundColor: theme.colors.primary,
      borderRadius: 100,
      shadowColor: theme.colors.onPrimary,
      shadowOffset: {
        width: 5,
        height: 8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

  const { user } = useContext(MonContext);

  //! Value du gros carré
  // TODO: @Hugo Afficher le resultat de l'output là
  const [currentDecibel, setCurrentDecibel] = useState(50);

  // TODO: @Hugo Récupérer ces valeurs pour l'input
  const [minDecibel, setMinDecibel] = useState(25);
  const [maxDecibel, setMaxDecibel] = useState(75);
  const [volume, setVolume] = useState(0.5);
  // const [volume, setVolume] = useState(0);

  function onValueChange(value) {
    setMinDecibel(value[0]);
    setMaxDecibel(value[1]);
  }
 

  const MONITOR_INTERVAL = 250 // in ms

const requestPermission = async () => {
  // request permission to access microphone
  // ...
  const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  if (status === 'granted') {
   
    
    // or add even more options
    RNSoundLevel.start({
      monitorInterval: MONITOR_INTERVAL,
      samplingRate: 16000, // default is 22050
    })
  } else {
    throw new Error('Permission to access microphone denied.');
  }
}

useEffect(() => {
  requestPermission();
  RNSoundLevel.onNewFrame = (data) => {
    // see "Returned data" section below
    console.log('Sound level info', data)
  }
  
  return () => {
    // don't forget to stop it
    RNSoundLevel.stop()
  }
}, [])

  useEffect(() => {
    const interval = setInterval(() => {
      var value = Math.floor(
        Math.random() * (maxDecibel - minDecibel + 1) + minDecibel
      );
      if (value < minDecibel) {
        value = minDecibel;
      }
      if (value > maxDecibel) {
        value = maxDecibel;
      }
      setCurrentDecibel(value);
    }, 2000);
    return () => clearInterval(interval);
  }, [minDecibel, maxDecibel]);

  const [selection, setSelection] = useState("");
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  async function setSelectionFix(value) {
    setSelection(value);
    await delay(100);
    setSelection(value);
  }

  const [presets, setPresets] = useState(user.presets);

  useEffect(() => {
    presets.forEach((element) => {
      if (element.nom === selection) {
        setMinDecibel(element.min);
        setMaxDecibel(element.max);
      }
    });
  }, [selection]);
  useEffect(() => {
    let selected = false;
    presets.forEach((element) => {
      if (minDecibel !== element.min && maxDecibel !== element.max) {
        selected = true;
      }
    });
    if (selected) {
      setSelection("");
    }
  }, [minDecibel, maxDecibel]);

  return (
    <View style={styles.page}>
      <Appbar.Header elevated>
        <Appbar.Content title="Application De Prévention Auditive" />
      </Appbar.Header>
      <ScreenWrapper>
        <View style={styles.element}>
          <Text variant="displayMedium" style={{ color: theme.colors.primary }}>
            ADPA
          </Text>
          <Image
            source={require("../public/illustration.jpg")}
            style={{ width: 300, height: 250, borderRadius: 40 }}
          />
          <View style={styles.currentDecibelContainer}>
            <Text variant="displayLarge" style={styles.textCurrentDecibel}>
              {currentDecibel} dB
            </Text>
          </View>
          <Text variant="displayLarge" style={styles.textDecibel}>
            {minDecibel} dB - {maxDecibel} dB
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            value={[minDecibel, maxDecibel]}
            onValueChange={onValueChange}
            minimumValue={0}
            maximumValue={100}
            step={1}
            animateTransitions
            minimumTrackTintColor={theme.colors.primaryContainer}
            maximumTrackTintColor={theme.colors.primaryContainer}
            thumbTintColor={theme.colors.onPrimary}
            trackStyle={styles.sliderTrack}
            thumbStyle={styles.sliderThumb}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text
            variant="displaySmall"
            style={{
              color: theme.colors.secondary,
              fontStyle: "italic",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            {" "}
            Volume : {Math.round(volume * 100)} %{" "}
          </Text>
          <Slider
            value={volume}
            onValueChange={setVolume}
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            animateTransitions
            minimumTrackTintColor={theme.colors.primaryContainer}
            maximumTrackTintColor={theme.colors.primaryContainer}
            thumbTintColor={theme.colors.onPrimary}
            trackStyle={styles.sliderTrack}
            thumbStyle={styles.sliderThumb}
          />
        </View>
        {user.presets.length > 0 ? (
          <List.Section
            title={`Mes pré-sets`}
            style={{ marginHorizontal: 5, alignItems: "center" }}
          >
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{ marginHorizontal: 5 }}
            >
              <SegmentedButtons
                value={selection}
                onValueChange={setSelectionFix}
                buttons={[
                  ...user.presets.map((preset) => {
                    return {
                      value: preset.nom,
                      icon: preset.icone,
                      label: preset.nom,
                    };
                  }),
                ]}
              />
            </ScrollView>
          </List.Section>
        ) : null}
      </ScreenWrapper>
    </View>
  );
}
