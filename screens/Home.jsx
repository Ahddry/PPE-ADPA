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
            if (index == -1 || index > values.length) setCurrentDecibel(0);
            else if (values[index] === NaN) setCurrentDecibel(0);
            else {
                const currentMediaVolume = values[index];
                const volumeInDb = 45 * Math.log10(currentMediaVolume);
                const limitedOutput = Math.min(Math.max(volumeInDb, minDecibel), maxDecibel);
                if (currentMediaVolume == 0) setCurrentDecibel(0);
                setCurrentDecibel(limitedOutput.toFixed(0));
                // console.log("currentMediaVolume : ", volumeInDb, " , ", limitedOutput.toFixed(0), " , Index : ", index);
                setCurrentIndex(currentIndex + 1);
            }
            if (currentIndex > values.length) {
                setCurrentIndex(-1);
                changeVolume(0);
                setIsPlaying(false);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [minDecibel, maxDecibel, currentIndex]);

    const [audio, setAudio] = useState(null);

    const [cptMusique, setCptMusique] = useState(0);
    const musiques = [
        {
            name: "Calme",
            path: require("../assets/sounds/test-music.mp3"),
            sound: [
                0, 11, 1, 4, 1, 35, 31, 1, 27, 37, 37, 37, 36, 36, 36, 37, 36, 32, 35, 36, 37, 37, 33, 33, 33, 36, 37, 36, 36, 36, 28, 5, 5, 6, 9, 6, 6, 7, 8, 7, 7, 6, 6, 7, 7, 7, 7, 6, 7, 7, 8, 8, 9, 9, 8, 10, 19, 23, 9, 9, 9, 8, 23, 7, 7, 7, 9, 9,
                10, 10, 9, 9, 9, 10, 10, 9, 10, 10, 10, 10, 9, 9, 10, 10, 10, 8, 10, 10, 9, 10, 9, 10, 8, 10, 10, 10, 11, 11, 10, 10, 10, 9, 8, 8, 30, 11, 9, 9, 9, 8, 9, 8, 7, 6, 7, 7, 7, 2, 7, 11, 11, 10, 11, 9, 9, 9, 9, 9, 9, 9, 10, 9, 10, 10, 10,
                11, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 11, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 8, 9, 8, 8, 9, 9, 9, 10, 10, 9, 9, 9, 7, 9, 9, 9, 8, 9, 7, 8, 7, 6, 6, 5, 5, 9, 8, 6, 5, 6, 7, 6, 7, 6, 7, 7, 7, 7, 8,
                8, 8, 7, 7, 7, 7, 7, 7, 8, 8, 7, 7, 8, 8, 9, 11, 11, 11, 10, 14, 11, 10, 10, 8, 10, 9, 8, 8, 8, 8, 8, 8, 15, 14, 16, 7, 7, 6, 5, 6, 6, 5, 5, 6, 6, 5, 6, 6, 6, 6, 5, 5, 6, 7, 7, 7, 7, 6, 7, 6, 6, 7, 8, 8, 7, 8, 7, 7, 7, 8, 8, 8, 8, 9,
                8, 8, 9, 8, 8, 7, 6, 7, 7, 7, 7, 7, 8, 6, 7, 7, 8, 7, 8, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 10, 10, 9, 9, 10, 9, 9, 9, 9, 10, 9, 9, 9, 10, 9, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 11, 10, 11,
                11, 11, 11, 11, 11, 11, 10, 11, 10, 9, 8, 8, 8, 8, 9, 10, 12, 12, 14, 13, 12, 11, 10, 11, 11, 11, 11, 10, 10, 8, 9, 8, 9, 8, 8, 7, 8, 9, 9, 9, 11, 11, 11, 11, 11, 11, 11, 11, 12, 11, 10, 11, 11, 10, 9, 10, 11, 10, 10, 10, 9, 9, 9, 9,
                9, 9, 9, 9, 8, 9, 9, 9, 9, 11, 11, 10, 11, 10, 11, 9, 9, 10, 9, 9, 8, 8, 9, 9, 8, 8, 9, 8, 8, 8, 9, 29, 29, 18, 11, 38, 31, 24, 35, 32, 9, 9, 9, 9, 9, 9, 8, 9, 9, 9, 8, 8, 8, 9, 9, 7, 9, 9, 9, 9, 8, 9, 8, 9, 9, 9, 8, 8, 8, 7, 8, 9, 9,
                9, 9, 9, 8, 8, 13, 26, 38, 37, 36, 23, 8, 8, 9, 9, 34, 31, 37, 39, 31, 30, 28, 12, 35, 36, 32, 36, 37, 37, 34, 35, 38, 38, 31, 10, 9, 9, 10, 9, 9, 9, 10, 9, 10, 9, 10, 9, 10, 10, 8, 9, 10, 9, 9, 10, 10, 10, 10, 9, 10, 10, 10, 10, 29,
                37, 36, 36, 36, 37, 38, 37, 36, 35, 36, 38, 36, 36, 34, 25, 15, 11, 11, 12, 12, 12, 13, 12, 13, 13, 13, 13, 13, 13, 15, 14, 14, 14, 14, 15, 15, 16, 14, 16, 17, 35, 33, 36, 37, 38, 32, 18, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18,
                17, 17, 17, 17, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 17, 18, 18, 18, 18, 18, 18, 17, 18, 19, 18, 18, 19, 19, 18, 18, 18, 19, 20, 20, 20, 20, 20, 21, 20, 20, 20, 20, 20, 20, 20, 20, 19, 19, 19, 21, 20, 20, 20, 20, 19,
                19, 18, 18, 17, 18, 17, 17, 17, 17, 18, 18, 17, 18, 17, 17, 17, 17, 18, 18, 19, 19, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 20, 21, 20, 21, 20, 21, 21, 22, 21, 22, 22, 22, 22, 22, 21, 21, 20, 20, 21, 20, 20, 20, 20, 20, 20, 21,
                20, 20, 21, 20, 20, 19, 19, 19, 21, 21, 22, 21, 20, 20, 21, 20, 20, 20, 19, 19, 19, 19, 19, 20, 20, 19, 20, 19, 20, 19, 19, 19, 20, 19, 19, 19, 18, 18, 18, 37, 36, 20, 19, 20, 20, 21, 21, 21, 21, 21, 21, 20, 19, 19, 20, 19, 19, 20,
                20, 20, 21, 20, 19, 20, 20, 21, 20, 19, 19, 19, 19, 20, 20, 21, 21, 22, 21, 21, 21, 21, 20, 20, 20, 19, 19, 19, 19, 19, 18, 18, 18, 19, 19, 18, 18, 18, 18, 18, 18, 19, 19, 18, 19, 19, 19, 19, 19, 18, 18, 18, 18, 18, 17, 17, 17, 16,
                17, 18, 18, 18, 17, 17, 16, 16, 16, 15, 15, 14, 15, 15, 14, 14, 14, 13, 14, 13, 13, 13, 13, 14, 13, 14, 13, 13, 14, 14, 15, 15, 14, 14, 15, 15, 15, 15, 15, 15, 14, 15, 14, 14, 15, 16, 15, 15, 16, 15, 15, 15, 15, 15, 14, 14, 14, 13,
                14, 14, 13, 14, 13,
            ],
        },
        {
            name: "Shine",
            path: require("../assets/sounds/test-shine.mp3"),
            sound: [
                0, 13, 9, 23, 30, 20, 33, 36, 35, 36, 35, 35, 35, 35, 35, 33, 34, 36, 36, 34, 21, 21, 19, 19, 16, 17, 15, 12, 12, 14, 13, 12, 11, 10, 10, 9, 10, 9, 9, 9, 9, 9, 9, 8, 8, 9, 9, 10, 13, 11, 10, 10, 12, 8, 8, 8, 7, 7, 7, 6, 6, 6, 6, 6, 5,
                5, 5, 6, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 31, 36, 34, 34, 35, 36, 33, 34, 32, 26, 24, 22, 8, 8, 9, 9, 9, 9, 9, 8, 9, 7, 8, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 8, 8, 8, 7, 7, 7, 7, 7, 7, 8, 8, 7, 7, 7, 7,
                6, 17, 36, 37, 37, 32, 37, 37, 33, 36, 37, 32, 24, 16, 18, 27, 7, 7, 8, 8, 8, 8, 8, 8, 26, 35, 35, 15, 8, 8, 8, 8, 9, 32, 36, 35, 26, 26, 21, 28, 37, 28, 31, 34, 36, 36, 7, 7, 34, 36, 32, 26, 34, 13, 7, 6, 33, 35, 36, 38, 36, 36, 27,
                6, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 7, 7, 6, 6, 6, 6, 6, 6, 7, 7, 6, 10, 7, 35, 34, 32, 38, 29, 19, 34, 27, 8, 8, 8, 8, 9, 8, 8, 8, 8, 7, 8, 8, 7, 8, 8, 29, 32, 27, 27, 29, 25, 20, 7, 19, 17, 6, 7, 6, 6, 7, 7, 6, 6, 7, 7, 6, 6, 7, 6, 6,
                6, 7, 33, 33, 29, 12, 6, 7, 7, 8, 7, 6, 7, 7, 7, 7, 7, 7, 8, 7, 7, 7, 6, 6, 6, 6, 7, 32, 36, 36, 36, 28, 34, 31, 27, 7, 25, 32, 33, 30, 18, 6, 6, 7, 7, 7, 7, 31, 35, 38, 36, 24, 29, 31, 31, 37, 37, 34, 33, 26, 36, 38, 23, 6, 6, 7, 8,
                7, 7, 7, 7, 7, 6, 7, 33, 27, 16, 13, 18, 16, 21, 14, 14, 14, 14, 13, 12, 13, 12, 12, 12, 13, 13, 12, 13, 12, 12, 13, 13, 14, 14, 14, 14, 12, 12, 12, 12, 13, 13, 13, 12, 36, 27, 31, 34, 37, 37, 32, 35, 32, 31, 33, 37, 35, 32, 36, 26,
                36, 36, 35, 36, 35, 38, 38, 37, 32, 37, 36, 14, 21, 17, 17, 18, 18, 14, 14, 14, 15, 14, 18, 23, 21, 14, 13, 13, 14, 13, 31, 35, 30, 34, 38, 35, 38, 21, 16, 12, 12, 13, 12, 12, 12, 12, 12, 13, 12, 12, 31, 37, 37, 36, 37, 36, 36, 33,
                20, 12, 13, 12, 12, 12, 12, 14, 12, 12, 12, 13, 13, 12, 12, 12, 35, 35, 35, 35, 37, 23, 36, 32, 11, 10, 10, 11, 10, 10, 10, 10, 10, 34, 34, 37, 39, 37, 24, 18, 33, 28, 11, 12, 11, 11, 11, 31, 32, 33, 34, 36, 37, 36, 35, 35, 34, 36,
                37, 37, 36, 36, 36, 36, 37, 38, 36, 36, 36, 38, 26, 11, 10, 11, 11, 11, 10, 10, 10, 10, 11, 35, 37, 36, 37, 37, 37, 36, 38, 38, 14, 13, 12, 13, 12, 35, 37, 15, 21, 36, 36, 37, 30, 22, 30, 14, 15, 14, 14, 13, 12, 12, 12, 14, 13, 13,
                13, 14, 13, 12, 14, 14, 34, 30, 35, 37, 33, 31, 26, 13, 13, 13, 13, 13, 12, 12, 12, 13, 13, 12, 12, 12, 22, 36, 35, 37, 36, 35, 35, 33, 38, 37, 39, 24, 12, 12, 12, 11, 12, 11, 11, 12, 12, 12, 12, 11, 11, 13, 12, 12, 13, 12, 12, 12,
                12, 12, 11, 12, 12, 12, 13, 13, 13, 12, 13, 13, 13, 12, 13, 12, 13, 13, 13, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14, 35, 35, 36, 36, 35, 35, 35, 37, 34, 36, 35, 36, 36, 36, 36, 36, 36, 35, 34, 34, 35, 32, 32, 33, 33, 33, 34, 33, 34,
                36, 38, 36, 35, 32, 36, 35, 35, 34, 30, 31, 32, 33, 32, 39, 28, 16, 14, 14, 14, 13, 12, 13, 13, 13, 14, 14, 14, 33, 37, 38, 37, 34, 35, 34, 34, 35, 30, 13, 12, 12, 14, 15, 14, 14, 13, 13, 13, 13, 13, 15, 14, 13, 13, 13, 12, 14, 12,
                13, 13, 12, 11, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 35, 37, 36, 31, 38, 37, 38, 38, 36, 27, 11, 11, 11, 12, 11, 11, 10, 35, 37, 35, 31, 32, 34, 26, 21, 33, 33, 24, 26, 19, 19, 34, 30, 32, 28, 27, 26, 24, 23, 23,
                22, 21, 21, 19, 19, 18, 20, 36, 33, 27, 17, 17, 17, 17, 16, 16, 15, 16, 15, 16, 21, 31, 36, 37, 37, 37, 35, 36, 35, 37, 33, 17, 14, 14, 15, 15, 14, 14, 14, 32, 38, 35, 37, 36, 29, 34, 27, 13, 14, 13, 14, 14, 14, 14, 13, 13, 13, 13,
                13, 14, 14, 14, 30, 32, 35, 35, 32, 34, 14, 32, 33, 34, 35, 26, 12, 12, 27, 37, 35, 34, 36, 35, 35, 33, 37, 17, 10, 29, 36, 36, 36, 35, 31,
            ],
        },
        {
            name: "Rock",
            path: require("../assets/sounds/test-rock.mp3"),
            sound: [
                0, 0, 3, 4, 4, 5, 6, 7, 8, 8, 8, 8, 9, 8, 9, 9, 10, 5, 9, 9, 9, 9, 8, 34, 33, 30, 35, 38, 38, 36, 38, 38, 35, 37, 37, 35, 38, 37, 36, 37, 36, 38, 36, 34, 36, 37, 36, 35, 35, 34, 37, 35, 36, 33, 38, 37, 32, 33, 39, 38, 25, 21, 5, 3, 5,
                5, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 12, 13, 13, 13, 13, 13, 13, 14, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 13, 13, 14, 14, 14, 14, 14, 14,
                13, 13, 13, 13, 13, 12, 13, 13, 13, 13, 12, 12, 12, 12, 13, 12, 12, 12, 11, 12, 12, 12, 12, 12, 11, 11, 12, 12, 12, 13, 11, 12, 13, 12, 12, 12, 12, 12, 9, 12, 14, 14, 13, 16, 12, 12, 32, 18, 13, 31, 34, 35, 38, 31, 37, 36, 37, 36, 34,
                31, 16, 16, 16, 17, 17, 17, 18, 18, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 18, 16, 16, 17, 17, 34, 19, 19, 15, 29, 36, 30, 22, 30, 18, 16, 16, 16, 16, 17, 16, 16, 15, 16, 16, 15, 16, 15, 15, 14, 15, 15, 15, 15, 15, 15,
                16, 15, 15, 32, 36, 30, 15, 16, 15, 16, 15, 15, 24, 33, 16, 35, 36, 36, 27, 14, 14, 14, 14, 15, 17, 36, 36, 33, 30, 27, 15, 15, 18, 14, 15, 15, 15, 15, 15, 15, 17, 35, 34, 33, 36, 36, 35, 35, 37, 36, 35, 34, 36, 37, 35, 35, 36, 34,
                36, 37, 36, 37, 36, 34, 35, 37, 37, 35, 34, 36, 35, 35, 34, 33, 36, 36, 34, 34, 33, 36, 37, 36, 35, 35, 34, 35, 37, 35, 33, 38, 34, 36, 37, 35, 37, 36, 37, 36, 36, 36, 36, 37, 36, 35, 36, 37, 37, 34, 35, 35, 36, 35, 36, 36, 38, 37,
                36, 37, 36, 37, 37, 37, 25, 32, 34, 36, 24, 18, 18, 18, 35, 33, 35, 34, 34, 19, 18, 19, 18, 18, 18, 19, 19, 20, 19, 19, 19, 20, 20, 20, 20, 20, 19, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 20, 20, 21, 21, 21, 22, 22, 22, 22, 23,
                22, 22, 23, 23, 23, 22, 22, 23, 23, 23, 23, 22, 23, 23, 23, 24, 23, 23, 23, 23, 23, 22, 20, 19, 19, 18, 17, 16, 15, 16, 14, 14, 13, 13, 12, 12, 32, 34, 11, 35, 36, 16, 36, 25, 35, 36, 10, 32, 28, 33, 36, 17, 35, 36, 25, 37, 26, 34,
                34, 26, 34, 29, 35, 35, 23, 33, 34, 13, 27, 23, 35, 36, 25, 35, 37, 31, 36, 33, 35, 37, 35, 37, 36, 36, 33, 36, 37, 36, 37, 35, 35, 36, 33, 35, 35, 36, 32, 33, 35, 33, 34, 33, 33, 30, 32, 34, 34, 30, 33, 34, 34, 37, 36, 36, 27, 30,
                15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 16, 17, 17, 16, 17, 16, 17, 17, 17, 17, 16, 17, 17, 17, 17, 18, 18, 18, 17, 18, 18, 17, 18, 18, 18, 18, 18, 18, 18, 19, 18, 19, 18, 19, 34, 35, 32, 33, 34, 34, 35, 34, 33, 36,
                37, 36, 35, 36, 36, 36, 35, 30, 23, 20, 19, 19, 20, 19, 20, 20, 20, 20, 20, 20, 21, 22, 21, 22, 22, 22, 23, 23, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 23, 23, 23,
                24, 24, 23, 24, 23, 23, 23, 23, 23, 23, 23, 23, 23, 22, 22, 22, 23, 23, 24, 23, 23, 24, 23, 22, 23, 23, 23, 23, 23, 24, 24, 24, 23, 22, 23, 23, 24, 23, 23, 23, 24, 24, 24, 23, 23, 24, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                24, 24, 24, 24, 24, 24, 23, 23, 23, 24, 24, 24, 23, 23, 24, 24, 23, 24, 24, 24, 24, 23, 24, 23, 25, 25, 24, 24, 24, 24, 25, 25, 26, 25, 25, 25, 25, 25, 25, 26, 26, 26, 25, 25, 25, 26, 26, 25, 25, 25, 24, 24, 24, 24, 25, 25, 24, 25,
                25, 24, 24, 25, 24, 24, 24, 23, 24, 24, 25, 24, 23, 23, 23, 24, 22, 23, 22, 22, 22, 22, 21, 22, 21, 22, 23, 22, 22, 22, 22, 22, 22, 20, 21, 21, 22, 21, 20, 21, 21, 20, 20, 20, 20, 21, 19, 20, 20, 21, 19, 20, 20, 20, 19, 19, 20, 19,
                20, 19, 19, 18, 19, 19, 19, 19, 19, 19, 19, 20, 19, 21, 19, 20, 19, 20, 20, 20, 20, 21, 20, 20, 20, 20, 21, 20, 20, 20, 21, 20, 21, 21, 22, 21, 21, 22, 21, 21, 21, 20, 20, 21, 21, 20, 21, 20, 20, 20, 20, 20, 19, 19, 19, 19, 20, 20,
                20, 20, 20, 20, 19, 19, 19, 19, 18, 18, 18, 19, 18, 18, 18, 18, 18, 18, 17, 18, 17, 17, 17, 17, 17, 16, 19, 35, 36, 30, 35, 37, 37, 17, 17,
            ],
        },
    ];

    // Fonction that plays or stops the audio
    function playAudio() {
        const audioFile = musiques[cptMusique].path;
        const soundObject = new Audio.Sound();

        async function playSound() {
            try {
                await soundObject.loadAsync(audioFile);
                await soundObject.playAsync();
                setIsPlaying(true);
                setValues(musiques[cptMusique].sound);
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

    function nextSound() {
        if (cptMusique < musiques.length - 1) {
            setCptMusique(cptMusique + 1);
        } else {
            setCptMusique(0);
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
                    <Text variant="titleLarge" style={{ color: theme.colors.secondary }}>
                        {musiques[cptMusique].name}
                    </Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ marginHorizontal: 5 }}>
                        {isPlaying ? (
                            <Button mode="contained" onPress={soundOff} icon={"stop"}>
                                <Text variant="button">Arrêter</Text>
                            </Button>
                        ) : (
                            <Button mode="contained" onPress={playAudio} icon={"play"}>
                                <Text variant="button">Jouer</Text>
                            </Button>
                        )}
                        <Button mode="contained" onPress={nextSound} icon={"skip-next"} style={{ marginLeft: 5, paddingRight: -50 }} />
                    </ScrollView>
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
