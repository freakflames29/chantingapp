import React from 'react';
import {StyleSheet, TouchableHighlight, View, Text, ActivityIndicator} from "react-native";


const AppButton = ({title, onPress, style, underlayColor, textColor = "black", icon, loading = false}) => {
    return (
        <>
            <TouchableHighlight
                onPress={onPress}
                style={[styles.container, style]}
                underlayColor={underlayColor}
            >

                <>
                    {loading ? <ActivityIndicator animating={loading} color={textColor}/> : <>
                        <Text style={[styles.textStyle, {color: textColor}]}> {title}</Text>
                        {icon}
                    </>}
                </>


            </TouchableHighlight>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 55,
        padding: 15,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderCurve: "continuous",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,

    },
    textStyle: {
        fontSize: 20,
        fontWeight: "500"
    }
})
export default AppButton;