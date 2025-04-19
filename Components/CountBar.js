import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import colors from "../config/colors";

const CountBar = ({bgColor, textColor = "white", count, hour}) => {

    const width = Math.round((count / 16) * 100)
    let bgC;
    if (count<4){
        bgC = colors.red
    }
    else if(count>=4 && count<=9){
        bgC = colors.ornage
    }
    else if (count>=10 && count<=15){
        bgC = colors.lightGreen
    }
    else{
        bgC = colors.darkGreen
    }

    return (<View style={{
        width: width > 45 ? `${width}%` : "45%",

        height: 200,
        backgroundColor: bgC,
        borderRadius: 25,
        paddingHorizontal: 30,
        paddingVertical: 15,
        justifyContent: "space-around"
    }}>
        <Text style={{
            fontSize: 15,
            color: textColor
        }}>19 April,2025</Text>
        <Text style={{
            fontSize: 70,
            color: textColor

        }}>{count}</Text>
        <Text style={{
            fontSize: 25,
            color: textColor

        }}>1hr 20min</Text>
    </View>);
};
const styles = StyleSheet.create({})

export default CountBar;