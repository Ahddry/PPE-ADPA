import { MonContext } from "../components/Context";
import ScreenWrapper from "../components/ScreenWrapper";
import { Component, useState, useEffect, useContext } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useTheme, Text, Appbar, List, SegmentedButtons, Button } from "react-native-paper";
import { Slider } from "@miblanchard/react-native-slider";
const { Audio } = require("expo-av");

/**
 * Page d'accueil
 * TODO: Implement audio management with these inputs and display the result in the big square
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

    // Usercontext of the app, get the user data
    const { user } = useContext(MonContext);

    // Values of the current decibel output, to be displayed in the big square
    const [currentDecibel, setCurrentDecibel] = useState(0);

    // Values of the min and max decibel desired by the user, to be used to adjust the current decibel with the volume
    const [minDecibel, setMinDecibel] = useState(25);
    const [maxDecibel, setMaxDecibel] = useState(75);

    // Volume of the audio, in percentages to be used to adjust the current decibel with the min and max decibel
    const [volume, setVolume] = useState(0.5);
    // Volume of the media, in percentages to be used to adjust the current decibel with the min and max decibel
    // const [mediaVolume, setMediaVolume] = useState(1);

    // Update function for the min/max slider
    function onValueChange(value) {
        setMinDecibel(value[0]);
        setMaxDecibel(value[1]);
    }

    // Fonction that calculates the current decibel output from the volume and the min/max decibel
    // TODO: Might need to be modified
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         calculateOutput(currentIndex);
    //     }, 100);
    //     return () => clearInterval(interval);
    // }, [currentIndex]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [values, setValues] = useState([0]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            let index = currentIndex;
            if (index == -1 || index > 900) setCurrentDecibel(0);
            else {
                const currentMediaVolume = values[index];
                const volumeInDb = 45 * Math.log10(currentMediaVolume);
                const range = maxDecibel - minDecibel;
                const limitedOutput = Math.min(Math.max(volumeInDb, minDecibel), maxDecibel);
                if (currentMediaVolume == 0) setCurrentDecibel(0);
                setCurrentDecibel(limitedOutput.toFixed(0));
                // console.log("currentMediaVolume : ", volumeInDb, " , ", limitedOutput.toFixed(0), " , Index : ", index);
                setCurrentIndex(currentIndex + 1);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [minDecibel, maxDecibel, currentIndex]);

    const [audio, setAudio] = useState(null);

    // Fonction that plays or stops the audio
    function playAudio() {
        const audioFile = require("../assets/sounds/test-music.mp3");
        const soundObject = new Audio.Sound();

        async function playSound() {
            try {
                await soundObject.loadAsync(audioFile);
                await soundObject.playAsync();
                setIsPlaying(true);
                setValues([
                    0, 11, 1, 4, 1, 35, 31, 1, 27, 37, 37, 37, 36, 36, 36, 37, 36, 32, 35, 36, 37, 37, 33, 33, 33, 36, 37, 36, 36, 36, 28, 5, 5, 6, 9, 6, 6, 7, 8, 7, 7, 6, 6, 7, 7, 7, 7, 6, 7, 7, 8, 8, 9, 9, 8, 10, 19, 23, 9, 9, 9, 8, 23, 7, 7, 7, 9,
                    9, 10, 10, 9, 9, 9, 10, 10, 9, 10, 10, 10, 10, 9, 9, 10, 10, 10, 8, 10, 10, 9, 10, 9, 10, 8, 10, 10, 10, 11, 11, 10, 10, 10, 9, 8, 8, 30, 11, 9, 9, 9, 8, 9, 8, 7, 6, 7, 7, 7, 2, 7, 11, 11, 10, 11, 9, 9, 9, 9, 9, 9, 9, 10, 9, 10,
                    10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 11, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 8, 9, 8, 8, 9, 9, 9, 10, 10, 9, 9, 9, 7, 9, 9, 9, 8, 9, 7, 8, 7, 6, 6, 5, 5, 9, 8, 6, 5, 6, 7, 6, 7, 6, 7,
                    7, 7, 7, 8, 8, 8, 7, 7, 7, 7, 7, 7, 8, 8, 7, 7, 8, 8, 9, 11, 11, 11, 10, 14, 11, 10, 10, 8, 10, 9, 8, 8, 8, 8, 8, 8, 15, 14, 16, 7, 7, 6, 5, 6, 6, 5, 5, 6, 6, 5, 6, 6, 6, 6, 5, 5, 6, 7, 7, 7, 7, 6, 7, 6, 6, 7, 8, 8, 7, 8, 7, 7, 7,
                    8, 8, 8, 8, 9, 8, 8, 9, 8, 8, 7, 6, 7, 7, 7, 7, 7, 8, 6, 7, 7, 8, 7, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 10, 10, 9, 9, 10, 9, 9, 9, 9, 10, 9, 9, 9, 10, 9, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10,
                    10, 10, 11, 10, 11, 11, 11, 11, 11, 11, 11, 10, 11, 10, 9, 8, 8, 8, 8, 9, 10, 12, 12, 14, 13, 12, 11, 10, 11, 11, 11, 11, 10, 10, 8, 9, 8, 9, 8, 8, 7, 8, 9, 9, 9, 11, 11, 11, 11, 11, 11, 11, 11, 12, 11, 10, 11, 11, 10, 9, 10, 11,
                    10, 10, 10, 9, 9, 9, 9, 9, 9, 9, 9, 8, 9, 9, 9, 9, 11, 11, 10, 11, 10, 11, 9, 9, 10, 9, 9, 8, 8, 9, 9, 8, 8, 9, 8, 8, 8, 9, 29, 29, 18, 11, 38, 31, 24, 35, 32, 9, 9, 9, 9, 9, 9, 8, 9, 9, 9, 8, 8, 8, 9, 9, 7, 9, 9, 9, 9, 8, 9, 8,
                    9, 9, 9, 8, 8, 8, 7, 8, 9, 9, 9, 9, 9, 8, 8, 13, 26, 38, 37, 36, 23, 8, 8, 9, 9, 34, 31, 37, 39, 31, 30, 28, 12, 35, 36, 32, 36, 37, 37, 34, 35, 38, 38, 31, 10, 9, 9, 10, 9, 9, 9, 10, 9, 10, 9, 10, 9, 10, 10, 8, 9, 10, 9, 9, 10,
                    10, 10, 10, 9, 10, 10, 10, 10, 29, 37, 36, 36, 36, 37, 38, 37, 36, 35, 36, 38, 36, 36, 34, 25, 15, 11, 11, 12, 12, 12, 13, 12, 13, 13, 13, 13, 13, 13, 15, 14, 14, 14, 14, 15, 15, 16, 14, 16, 17, 35, 33, 36, 37, 38, 32, 18, 16, 16,
                    16, 16, 16, 17, 17, 17, 17, 18, 18, 17, 17, 17, 17, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 17, 18, 18, 18, 18, 18, 18, 17, 18, 19, 18, 18, 19, 19, 18, 18, 18, 19, 20, 20, 20, 20, 20, 21, 20, 20, 20, 20, 20, 20, 20,
                    20, 19, 19, 19, 21, 20, 20, 20, 20, 19, 19, 18, 18, 17, 18, 17, 17, 17, 17, 18, 18, 17, 18, 17, 17, 17, 17, 18, 18, 19, 19, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 20, 21, 20, 21, 20, 21, 21, 22, 21, 22, 22, 22, 22, 22, 21,
                    21, 20, 20, 21, 20, 20, 20, 20, 20, 20, 21, 20, 20, 21, 20, 20, 19, 19, 19, 21, 21, 22, 21, 20, 20, 21, 20, 20, 20, 19, 19, 19, 19, 19, 20, 20, 19, 20, 19, 20, 19, 19, 19, 20, 19, 19, 19, 18, 18, 18, 37, 36, 20, 19, 20, 20, 21,
                    21, 21, 21, 21, 21, 20, 19, 19, 20, 19, 19, 20, 20, 20, 21, 20, 19, 20, 20, 21, 20, 19, 19, 19, 19, 20, 20, 21, 21, 22, 21, 21, 21, 21, 20, 20, 20, 19, 19, 19, 19, 19, 18, 18, 18, 19, 19, 18, 18, 18, 18, 18, 18, 19, 19, 18, 19,
                    19, 19, 19, 19, 18, 18, 18, 18, 18, 17, 17, 17, 16, 17, 18, 18, 18, 17, 17, 16, 16, 16, 15, 15, 14, 15, 15, 14, 14, 14, 13, 14, 13, 13, 13, 13, 14, 13, 14, 13, 13, 14, 14, 15, 15, 14, 14, 15, 15, 15, 15, 15, 15, 14, 15, 14, 14,
                    15, 16, 15, 15, 16, 15, 15, 15, 15, 15, 14, 14, 14, 13, 14, 14, 13, 14, 13,
                ]);
                setCurrentIndex(0);
            } catch (error) {
                console.log("Error playing sound: ", error);
            }
            setAudio(soundObject);
        }

        async function stopSound() {
            try {
                await soundObject.stopAsync();
                setIsPlaying(false);
                setCurrentIndex(-1);
                setValues([0]);
            } catch (error) {
                console.log("Error stopping sound: ", error);
            }
        }

        if (isPlaying) {
            stopSound();
        } else {
            playSound();
        }
    }
    function changeVolume(volume) {
        if (audio !== null) {
            audio.setVolumeAsync(volume);
        }
    }

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

    function soundOff() {
        if (isPlaying) {
            setIsPlaying(false);
            changeVolume(0);
            setCurrentIndex(-1);
        }
    }

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
                    <Image source={require("../public/illustration.jpg")} style={{ width: 300, height: 250, borderRadius: 40 }} />
                    <View style={styles.currentDecibelContainer}>
                        <Text variant="displayLarge" style={styles.textCurrentDecibel}>
                            {currentDecibel} dB
                        </Text>
                    </View>
                    <Text variant="displayLarge" style={styles.textDecibel}>
                        {minDecibel} dB - {maxDecibel} dB
                    </Text>
                </View>
                <View style={(styles.sliderContainer, { marginBottom: 15 })}>
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
                <View style={styles.element}>
                    {isPlaying ? (
                        <Button mode="contained" onPress={soundOff} icon={"stop"}>
                            <Text variant="button">Arrêter</Text>
                        </Button>
                    ) : (
                        <Button mode="contained" onPress={playAudio} icon={"play"}>
                            <Text variant="button">Jouer</Text>
                        </Button>
                    )}
                </View>
                {user.presets.length > 0 ? (
                    <List.Section title={`Mes pré-sets`} style={{ marginHorizontal: 5, alignItems: "center" }}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ marginHorizontal: 5 }}>
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
