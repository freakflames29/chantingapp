import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import colors from "../config/colors";

const CountBar = ({bgColor, textColor = "white", count, hour, date}) => {

    let width = Math.round((count / 16) * 100)
    width = width > 100 ? 100 : width
    let bgC;
    if (count < 4) {
        bgC = colors.red
    } else if (count >= 4 && count <= 9) {
        bgC = colors.ornage
    } else if (count >= 10 && count <= 15) {
        bgC = colors.lightGreen
    } else {
        bgC = colors.darkGreen
    }


        const convertedDate = new Date(date);
        const options = {day: 'numeric', month: 'long', year: 'numeric'};
        const formattedDate = convertedDate.toLocaleDateString('en-US', options);


    return (<View style={{
        width: width > 45 ? `${width}%` : "45%",

        height: 150,
        backgroundColor: bgC,
        borderRadius: 30,

        paddingHorizontal: 30,
        paddingVertical: 15,
        justifyContent: "space-around",
        borderCurve: "continuous"
    }}>
        <Text style={{
            fontSize: 15,
            color: textColor
        }}>{formattedDate}</Text>
        <Text style={{
            fontSize: 45,
            color: textColor

        }}>{count}</Text>
        <Text style={{
            fontSize: 20,
            color: textColor

        }}>{hour} min</Text>
    </View>);
};
const styles = StyleSheet.create({
    bo: {
        borderCurve: "continuous"
    }
})

export default CountBar;