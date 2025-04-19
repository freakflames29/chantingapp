import React from 'react';
import {StyleSheet, Text} from "react-native";

const HeadingText = ({text,size,color="black",style}) => {
    return (
        <Text style={[styles.textStyle,{fontSize: size,color:color},{...style}]}>
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
        letterSpacing:-1,

    }
})
export default HeadingText;