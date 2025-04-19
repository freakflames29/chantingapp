import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import colors from "../config/colors";

const TabBarIcon = ({name, size, focused,label}) => {
    const icons = {
        home: require("../assets/icons/home.png"),
        beads: require("../assets/icons/beads.png"),
        user: require("../assets/icons/user.png"),
        search: require("../assets/icons/search.png"),
    }
    return (
        <View style={[styles.cont, {backgroundColor: focused ? "white" : ""}]}>
            <Image
                source={icons[name]}
                style={[styles.img, {width: size , tintColor: focused ? "black" : "white"}]}
                resizeMode={"contain"}
            />
            <Text style={{ alignSelf:"center",color: focused ? colors.pureBlack: "white"}}>{label}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    cont: {

        width: 70,
        height: 70,
        // flex:1,
        borderRadius: 50,
        justifyContent: "center",
        // alignItems:"center",
        flexDirection:"column",

    },
    img: {
        width: 25,
        height: 25,
          marginBottom: 4,
        // alignSelf:"center"

        // height: "50%",


    }
})
export default TabBarIcon;