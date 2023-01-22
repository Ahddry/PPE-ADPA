import ScreenWrapper from "../components/ScreenWrapper";
import { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useTheme, Text, Appbar, List, SegmentedButtons } from "react-native-paper";
import { Slider } from "@miblanchard/react-native-slider";

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
            color: theme.colors.primary,
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

    const [currentDecibel, setCurrentDecibel] = useState(50);
    const [minDecibel, setMinDecibel] = useState(25);
    const [maxDecibel, setMaxDecibel] = useState(75);

    function onValueChange(value) {
        setMinDecibel(value[0]);
        setMaxDecibel(value[1]);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            var value = Math.floor(Math.random() * (maxDecibel - minDecibel + 1) + minDecibel);
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

    useEffect(() => {
        if (selection === "marche") {
            setMinDecibel(25);
            setMaxDecibel(75);
        }
        if (selection === "train") {
            setMinDecibel(15);
            setMaxDecibel(80);
        }
        if (selection === "travail") {
            setMinDecibel(10);
            setMaxDecibel(70);
        }
    }, [selection]);
    useEffect(() => {
        if ((minDecibel !== 25 && maxDecibel !== 75) || (minDecibel !== 15 && maxDecibel !== 80) || (minDecibel !== 10 && maxDecibel !== 70)) {
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
                    <Text variant="displayMedium" textColor={theme.colors.primary}>
                        ADPA
                    </Text>
                    {/* <Image source={require("../public/waveform.gif")} style={{ width: 300, height: 300 }} /> */}
                    <Image source={require("../public/illustration.jpg")} style={{ width: 300, height: 250, borderRadius: 40 }} />
                    <View style={styles.currentDecibelContainer}>
                        <Text variant="displayLarge" style={styles.textCurrentDecibel}>
                            {currentDecibel} Db
                        </Text>
                    </View>
                    <Text variant="displayLarge" style={styles.textDecibel}>
                        {minDecibel} Db - {maxDecibel} Db
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
                <List.Section title={`Mes pré-sets`}>
                    <SegmentedButtons
                        value={selection}
                        onValueChange={setSelectionFix}
                        buttons={[
                            {
                                value: "marche",
                                icon: "walk",
                                label: "Marche",
                                style: styles.button,
                            },
                            {
                                value: "train",
                                icon: "train",
                                label: "Transports",
                                style: styles.button,
                            },
                            {
                                value: "travail",
                                icon: "text-box-check",
                                label: "Travail",
                                style: styles.button,
                            },
                        ]}
                        style={styles.group}
                    />
                </List.Section>
            </ScreenWrapper>
        </View>
    );
}
