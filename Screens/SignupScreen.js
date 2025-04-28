import {useState, useEffect} from 'react';
import {
    ActivityIndicator,
    Button,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView, KeyboardAvoidingView
} from "react-native";
import WorkArea from "../Components/WorkArea";
import {StatusBar} from "expo-status-bar";
import AppTextInput from "../Components/AppTextInput";
import axios from "axios";
import {ROOT_URL} from "../config/Constants";
import {authInstance} from "../config/AxiosInstance";
import {useMutation} from "@tanstack/react-query";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {userActions} from "../redux/userSlice";
import {useDispatch} from "react-redux";
import colors from "../config/colors";
import AppButton from "../Components/AppButton";
import LinearGradient from 'react-native-linear-gradient';
import HeadingText from "../Components/HeadingText";
import TouchableText from "../Components/TouchableText";
import Toast from "../Components/Toast";
import Bugsnag from "@bugsnag/expo";

const SignupScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [fillBox, setFillBox] = useState(false)


    const dispatch = useDispatch()

    const submitToServer = async () => {
        console.log("DATA: ", email, username, password)
        const payload = {
            username, email, password,
        }

        const res = await authInstance.post("auth/signup/", payload)
        return res.data


    }

    const {mutate, isError, error, isPending, isSuccess, data} = useMutation({
        mutationKey: ["signup"], mutationFn: submitToServer
    })
    if (isError) {
        Bugsnag.notify(error)
        console.log(error.message)
    }


    const setDataToAsyncStorage = async (data) => {
        try {
            let stringifyData = JSON.stringify(data)
            await asyncStorage.setItem("info", stringifyData)
            console.log("DATA SAVED TO ASYNC STORAGE")
        } catch (e) {
            Bugsnag.notify(e)
            console.log("Error while setting the data")
        }
    }

    const makeSignupRequest = () => {
        if (username !== "" && email !== "" && password !== "") {
            setFillBox(!fillBox)
            mutate()
        } else {
            setFillBox(!fillBox)
        }
    }

    useEffect(() => {


        if (isSuccess) {
            setDataToAsyncStorage(data)
            dispatch(userActions.setData(data))

        }
    }, [isSuccess, data]);


    return (

        <ScrollView contentContainerStyle={styles.backGround}>

            {fillBox && <Toast msg={"Pls fill the details properly"} textColor={"red"} iconName={"circle-with-cross"}/>}
            {isError && <Toast msg={error.message} textColor={"red"} iconName={"circle-with-cross"}/>}
            <ImageBackground
                source={require("../assets/loginpng.png")}
                // resizeMode={"cover"}
                style={styles.image}
            >


            </ImageBackground>


            <HeadingText text={"Create an account"} size={40}/>
            <View style={styles.container}>
                <AppTextInput
                    placeholder="Username"
                    onChangeText={(text) => setUsername(text)}
                    autoCapitalize={"none"}
                    icon={"drive-file-rename-outline"}
                    iconColor={colors.gray}

                />
                <AppTextInput
                    placeholder="Email address"
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize={"none"}
                    icon={"email"}
                    iconColor={colors.gray}

                />
                <AppTextInput
                    placeholder="Email Password"
                    secureTextEntry={true}
                    autoCapitalize={"none"}

                    onChangeText={(text) => setPassword(text)}
                    icon={"lock"}
                    iconColor={colors.gray}

                />
                <AppButton
                    title={"Sign up"}
                    style={styles.btnStyle}
                    underlayColor={colors.darkBlue}
                    textColor={"white"}
                    loading={isPending}
                    onPress={makeSignupRequest}
                />


                <TouchableText text={"Already an User ? Login"}
                               onPress={() => {
                                   navigation.navigate("login")
                               }}
                />

            </View>

            <StatusBar style={"dark"}/>


        </ScrollView>

    );
};

const styles = StyleSheet.create({
    backGround: {
        flex: 2,
        flexGrow: 1,
    },
    container: {
        gap: 20,
        padding: 25,
        flex: 1.5,
        alignItems: "center"

    }, btnStyle: {
        backgroundColor: colors.blue,
        width: "100%",
    },
    image: {
        width: "100%",
        flex: 1.8,
    },


})

export default SignupScreen;