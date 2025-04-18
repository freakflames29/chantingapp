import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {userActions} from "../redux/userSlice";
import WorkArea from "../Components/WorkArea";
import colors from "../config/colors";
import {StatusBar} from "expo-status-bar";


const HomeScreen = ({navigation}) => {
    const userInfo = useSelector(state => state.userReducer.info)

    const dispatch = useDispatch()

    const [chantCount, setChantCount] = useState(10)

    const today = new Date();
    const formattedDate = today.getDate() + " " +
        today.toLocaleString('en-US', {month: 'long'}) + ", " +
        today.getFullYear();


    const theValue = Math.round((chantCount / 16) * 100)
    const progressValue = theValue > 100 ? 100 : theValue


    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Image
                source={require("../assets/lotus.png")}
                resizeMode={"contain"}
                style={styles.imgStyle}
            />

            <WorkArea style={styles.workArea}>
                <View style={styles.container}>
                    <Text style={styles.subHeading}>{formattedDate}</Text>
                    <Text style={styles.heading}>Hare Krishna, {userInfo.username}</Text>

                    <View style={styles.countContainer}>

                        <Text style={styles.cardsubHeading}>Rounds</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",

                        }}>
                            <Text style={styles.cardHeading}>{chantCount}</Text>

                            <Image
                                source={require("../assets/chant.png")}
                                style={{
                                    width: 110,
                                    height: 110,
                                    position: "absolute",
                                    right: 0,
                                    bottom: 10,
                                }}

                            />
                        </View>
                        <View style={styles.progressbarOutside}>
                            <View style={[styles.progressBarInside, {width: `${progressValue}%`}]}/>
                        </View>

                    </View>
                </View>
            </WorkArea>
            <StatusBar style={"dark"}/>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    countContainer: {
        marginTop: "10%",
        width: "100%",
        height: 250,
        borderCurve: "continuous",
        borderRadius: 36,
        backgroundColor: "#FFFDF6",
        overflow: "hidden",
        // elevation:2,
        justifyContent: "space-evenly",
        paddingVertical: 25,
        paddingHorizontal: 25,
        position: "relative",
        // borderWidth:1,
        borderColor: colors.darkGreen
        // gap:10,
    },
    cardsubHeading: {
        color: colors.darkGreen,
        fontSize: 20,
    },
    cardHeading: {
        fontSize: 80,
        letterSpacing: -1,
        fontWeight: "bold",
        color: colors.darkGreen
    },
    progressbarOutside: {
        width: "100%",
        height: 50,
        backgroundColor: colors.darkGreen,
        borderRadius: 50,
        justifyContent: "center",
        paddingHorizontal: 15,
    },
    progressBarInside: {
        width: "80%",
        height: 30,
        borderRadius: 50,
        backgroundColor: colors.lightGreen
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.lightWhite,
        flexGrow: 1,

    },
    heading: {
        fontSize: 40,
        fontWeight: "bold",
        letterSpacing: -1,
    },
    subHeading: {
        fontSize: 20,
        fontWeight: "500",
    },
    imgStyle: {
        width: "150%",
        alignSelf: "center",
        position: "absolute",
        top: "-20%",
        // flex:0.5,
        opacity: 0.08,
    },

    workArea: {
        flex: 1,
        padding: 25,

    }
})
export default HomeScreen;


// logout function

// const clearAsync = async () => {
//      await asyncStorage.clear()
//      dispatch(userActions.removeData())
//  }
