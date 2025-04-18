import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import SignupScreen from "./SignupScreen";
import HeadingText from "../Components/HeadingText";
import AppTextInput from "../Components/AppTextInput";
import colors from "../config/colors";
import AppButton from "../Components/AppButton";
import TouchableText from "../Components/TouchableText";
import {StatusBar} from "expo-status-bar";
import axios from "axios";
import {authInstance} from "../config/AxiosInstance";
import {useMutation} from "@tanstack/react-query";
import {useDispatch} from "react-redux";
import {userActions} from "../redux/userSlice";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";


const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()


    const dispatch = useDispatch()



    const setDataToStorage = async (data) => {
        try {
            const stringify = JSON.stringify(data)
            await asyncStorage.setItem("info", stringify)
            console.log("Success storig the data to localstorage from login screen")

        } catch (e) {
            console.log("Error saving to data to localstorage from loginscreen",e)
        }
    }

    const sentToServer = async () => {
        const payload = {
            username: username,
            password: password
        }
        const res = await authInstance.post("auth/login/", payload)
        return res.data

    }
    const {mutate, data, isError, error, isPending, isSuccess} = useMutation({
        mutationKey: ["login"],
        mutationFn: sentToServer,

    })

    if (isError) {
        console.log(error.message)
        return <Text>Error came</Text>
    }
    if (data){
        console.log("THe data is ",data)

        setDataToStorage(data)
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(userActions.setData(data))
        }

    }, [isSuccess]);


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require("../assets/signup.png")}
                style={styles.imageStyle}
                // resizeMode={"contain"}
            />
            <View style={styles.elementContainer}>
                <HeadingText text={"Login to continue"} size={40}/>

                <AppTextInput
                    placeholder="Username"
                    onChangeText={(text) => setUsername(text)}
                    autoCapitalize={"none"}
                    icon={"drive-file-rename-outline"}
                    iconColor={colors.gray}

                />
                <AppTextInput
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize={"none"}
                    icon={"lock"}
                    secureTextEntry={true}
                    iconColor={colors.gray}

                />
                <AppButton
                    title={"Login"}
                    style={styles.btnStyle}
                    underlayColor={colors.darkGreen}
                    textColor={"white"}
                    onPress={() => {
                        mutate()
                    }}
                />


                <TouchableText text={"Dont have an account ? Signup"} onPress={() => {
                    navigation.navigate("signup")
                }}/>

            </View>


            <StatusBar style={"dark"}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        // backgroundColor:"pink",
    },
    elementContainer: {
        flex: 1,
        padding: 20,
        gap: 20,
        alignItems: "center"
    },
    imageStyle: {
        width: "100%",
        flex: 1,
    },
    btnStyle: {
        backgroundColor: colors.lightGreen,
        width: "100%",
    },
})

export default LoginScreen;