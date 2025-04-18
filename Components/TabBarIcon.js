import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import colors from "../config/colors";

const TabBarIcon = ({name, size, focused}) => {
    const icons = {
        home: require("../assets/icons/home.png"),
        beads: require("../assets/icons/beads.png"),
        user: require("../assets/icons/user.png"),
        search: require("../assets/icons/search.png"),
    }
    return (
        <View style={[styles.cont, {backgroundColor: focused ? colors.lightGreen : ""}]}>
            <Image
                source={icons[name]}
                style={[styles.img, {width: size , tintColor: focused ? "white" : "white"}]}
                resizeMode={"contain"}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    cont: {

        width: 60,
        height: 60,
        // flex:1,
        borderRadius: 50,
        justifyContent: "center",
        // alignItems:"center"
    },
    img: {
        width: 25,
        height: 25,
        // alignSelf:"center"

        // height: "50%",


    }
})
export default TabBarIcon;