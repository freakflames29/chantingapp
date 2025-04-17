import React from 'react';
import {StyleSheet, Text} from "react-native";

const HeadingText = ({text,size}) => {
    return (
        <Text style={[styles.textStyle,{fontSize: size}]}>
            {text}
        </Text>
    );
};
const styles = StyleSheet.create({
    textStyle:{
        fontSize:35,
        fontWeight:"800",
        alignItems:"center",
        textAlign:"center",
    }
})
export default HeadingText;