import * as React from "react";
import { ScrollView, ScrollViewProps, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Wrapper pour les écrans
 * @param {JSX.Element} children Contenu de l'écran
 * @param {boolean} withScrollView Si l'écran doit être scrollable
 * @param {StyleProp<ViewStyle>} style Style de l'écran
 * @param {StyleProp<ViewStyle>} contentContainerStyle Style du conteneur de contenu
 * @param {ScrollViewProps} rest Autres props de ScrollView
 * @returns {JSX.Element} Wrapper de l'écran
 */
export default function ScreenWrapper({ children, withScrollView = true, style, contentContainerStyle, ...rest }) {
    const theme = useTheme();

    const insets = useSafeAreaInsets();

    const containerStyle = [
        styles.container,
        {
            backgroundColor: theme.colors.background,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.left,
        },
    ];

    return (
        <>
            {withScrollView ? (
                <ScrollView {...rest} contentContainerStyle={contentContainerStyle} alwaysBounceVertical={false} showsVerticalScrollIndicator={false} style={[containerStyle, style]}>
                    {children}
                </ScrollView>
            ) : (
                <View style={[containerStyle, style]}>{children}</View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
