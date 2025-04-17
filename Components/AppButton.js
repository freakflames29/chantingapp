import React from 'react';
import {StyleSheet, TouchableHighlight, View, Text} from "react-native";

const AppButton = ({title, onPress,style,underlayColor,textColor="black"}) => {
    return (
        <TouchableHighlight
            onPress={onPress}
            style={[styles.container,style]}
            underlayColor={underlayColor}
        >


            <Text style={[styles.textStyle,{color:textColor}]}> {title}</Text>


        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {

        padding: 15,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        fontSize: 20
    }
})
export default AppButton;