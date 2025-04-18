import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import colors from "../config/colors";

const ActionCard = ({title, buttonText, iconColor = "black", textColor = "black", bgColor, onPress}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>

            <View style={[styles.cardBox, {backgroundColor: bgColor}]}>
                <Text style={{
                    fontSize: 20,
                    color: textColor,
                    fontWeight: "bold",
                }}>{title}</Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        color: textColor

                    }}>{buttonText}</Text>
                    <Feather name="arrow-right-circle" size={24} color={iconColor}/>
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    cardBox: {
        width: "50%",
        height: 110,
        backgroundColor: colors.red,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: 'space-between'
    }
})

export default ActionCard;