import React from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import colors from "../config/colors";
const AppTextInput = ({style,...otherProps}) => {
    return (
        <View style={styles.container}>
            <TextInput  {...otherProps} style={[styles.textStyle,style]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:colors.lightBg,
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:5,

    },
    textStyle:{
        fontSize:20,
    }

})


export default AppTextInput;