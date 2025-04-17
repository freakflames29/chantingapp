import React from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import colors from "../config/colors";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const AppTextInput = ({style, icon, iconColor, ...otherProps}) => {
    return (
        <View style={styles.container}>
            <MaterialIcons name={icon} size={24} color={iconColor}/>
            <TextInput  {...otherProps} style={[styles.textStyle, style]}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.lightBg,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,

        flexDirection: "row",
        alignItems: "center"

    },
    textStyle: {
        flex: 1,
        marginLeft: 10,
        fontSize: 20,
    }

})


export default AppTextInput;