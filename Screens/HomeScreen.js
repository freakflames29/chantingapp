import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {userActions} from "../redux/userSlice";
import {chantActions} from "../redux/chantSlice";
import WorkArea from "../Components/WorkArea";
import colors from "../config/colors";
import {StatusBar} from "expo-status-bar";
import ActionCard from "../Components/ActionCard";
import {authInstance} from "../config/AxiosInstance";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {ROOT_URL} from "../config/Constants";
import Loading from "../Components/Loading";
import Octicons from '@expo/vector-icons/Octicons';


const HomeScreen = ({navigation}) => {
    const userInfo = useSelector(state => state.userReducer.info)
    const chantInfo = useSelector(state => state.chantReducer.chantInfo)

    const dispatch = useDispatch()


    const [progressBackground, setProgressBackground] = useState()
    const [progressForeground, setProgressForground] = useState()


    const today = new Date();
    const formattedDate = today.getDate() + " " + today.toLocaleString('en-US', {month: 'long'}) + ", " + today.getFullYear(); // dat Month,year format


    const todayDate = new Date();
    const apiDate = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;

    console.log("New api date", apiDate)
    // e.g., "2025-04-19"
// year-month-day format


    const theValue = Math.round((chantInfo.count / 16) * 100)
    const progressValue = theValue > 100 ? 100 : theValue


    const fetchUserCount = async () => {
        const Token = "Token " + userInfo.token


        console.log("User token ", Token)

        const headers = {
            Authorization: `Token ${userInfo.token}`, "X-Authorization": `Token ${userInfo.token}`,

        }
        const URL = `${ROOT_URL}count?search=${apiDate}`
        // const URL = `${ROOT_URL}count?search=2025-04-22`

        const res = await axios(URL, {
            headers: headers
        })


        return res.data

    }

    const {data, error, isError, isLoading, isSuccess} = useQuery({
        queryKey: ["userChantCount"], queryFn: fetchUserCount, enabled: !!userInfo?.token
    })


    if (isError) {
        console.log("Error while fetching the count from home screen ", error)
    }

    useEffect(() => {

        if (data) {
            if (data.length > 0) {
                console.log(data[0])

                dispatch(chantActions.setChant(data[0]))
            } else {
                const init = {
                    id: 0,
                    count: 0,
                    date: "",
                    time: "0"
                }
                dispatch(chantActions.setChant(init))
            }
        }
    }, [isSuccess, data]);


    /// checks if chant count and based on setting the progress bar colors
    useEffect(() => {
        if (chantInfo.count < 4) {
            setProgressBackground(colors.red)
            setProgressForground(colors.lightRed)
        } else if (chantInfo.count >= 4 && chantInfo.count < 10) {
            setProgressBackground(colors.ornage)
            setProgressForground(colors.lightOrange)
        } else {
            setProgressBackground(colors.darkGreen)
            setProgressForground(colors.lightGreen)
        }


    }, [chantInfo.count]);


    return (
        <>
            {isLoading ? <Loading/> :
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

                                <Text style={[styles.cardsubHeading, {color: progressBackground}]}>Today rounds</Text>
                                <View style={{
                                    flexDirection: "row", justifyContent: "space-between",

                                }}>
                                    <Text
                                        style={[styles.cardHeading, {color: progressBackground}]}>{chantInfo.count}</Text>

                                    <Image
                                        source={require("../assets/chant.png")}
                                        style={{
                                            width: 110, height: 110, position: "absolute", right: 0, bottom: 10,
                                        }}

                                    />
                                </View>
                                <View

                                    style={[styles.progressbarOutside, {
                                        borderRadius: 500, backgroundColor: progressBackground,
                                    }]}>
                                    <View

                                        style={[styles.progressBarInside, {
                                            borderRadius: 500,
                                            width: `${progressValue}%`,
                                            backgroundColor: progressForeground,
                                        }]}/>
                                </View>

                            </View>


                            <View style={{flexDirection: "row", gap: 10, marginTop: 20,}}>
                                <ActionCard title={"Japa Tracker"} buttonText={"Add Round"}
                                            bgColor={colors.blue}
                                            textColor={"white"}
                                            iconColor={"white"}
                                            onPress={() => {
                                                navigation.navigate("chant")
                                            }}
                                />

                                <ActionCard title={"Digital Chanter"} buttonText={"Chnat now"}
                                            bgColor={colors.lightGreen}
                                            textColor={"white"}
                                            iconColor={"white"}
                                            onPress={() => {
                                                navigation.navigate("digitalChant")
                                            }}
                                />

                            </View>


                            <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                navigation.navigate("records")
                            }}>
                                <View style={styles.chantRecords}>

                                    <Text style={{
                                        fontSize: 20,
                                        color: "white",
                                        fontWeight: "bold",

                                    }}>Chant Records</Text>
                                    <Octicons name="graph" size={24} color="white"/>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </WorkArea>
                    <StatusBar style={"dark"}/>
                </ScrollView>

            }</>
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
        backgroundColor: "#FFFDF6", // overflow: "hidden",
        // elevation:2,
        justifyContent: "space-evenly",
        paddingVertical: 25,
        paddingHorizontal: 25,
        position: "relative", // borderWidth:1,
        borderColor: colors.darkGreen
        // gap:10,
    }, cardsubHeading: {
        color: colors.darkGreen, fontSize: 20,
    }, cardHeading: {
        fontSize: 80, letterSpacing: -1, fontWeight: "bold", color: colors.darkGreen
    }, progressbarOutside: {
        borderRadius: 100,
        width: "100%",
        height: 50,
        minHeight: 50,
        backgroundColor: colors.darkGreen,
        justifyContent: "center",
        paddingHorizontal: 15,
        minWidth: "100%",
        overflow: "hidden",
    }, progressBarInside: {
        // minWidth:1,
        borderRadius: 100,
        width: "80%",
        height: 30,
        minHeight: 30,
        backgroundColor: colors.lightGreen,
        overflow: "hidden",

    }, scrollView: {

        backgroundColor: colors.lightWhite,
        flexGrow: 1,
        paddingBottom: 100,

    }, heading: {
        fontSize: 40, fontWeight: "bold", letterSpacing: -1,
    }, subHeading: {
        fontSize: 20, fontWeight: "500",
    }, imgStyle: {
        width: "150%", alignSelf: "center", position: "absolute", top: "-20%", // flex:0.5,
        opacity: 0.08,
    },

    workArea: {
        flex: 1,
        padding: 25,

    },
    chantRecords: {
        marginTop: 20,
        borderRadius: 20,
        width: "100%",
        height: 60,
        paddingHorizontal: 25,
        alignItems: "center",
        justifyContent: "space-between",
        // justifyContent: "center",
        backgroundColor: colors.darkBlue,
        flexDirection: "row",
        gap: 10,

    },
})
export default HomeScreen;


// logout function

