import {useState, useEffect} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from "react-native";
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

const SignupScreen = ({navigation}) => {

    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()


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
        console.log(error.message)
    }


    const setDataToAsyncStorage = async (data) => {
        try {
            let stringifyData = JSON.stringify(data)
            await asyncStorage.setItem("info", stringifyData)
            console.log("DATA SAVED TO ASYNC STORAGE")
        } catch (e) {
            console.log("Error while setting the data")
        }
    }

    useEffect(() => {


        if (isSuccess) {
            setDataToAsyncStorage(data)
            dispatch(userActions.setData(data))
            navigation.navigate("home")
        }
    }, [isSuccess, data]);


    return (<WorkArea style={{flex: 1}}>
        <View style={styles.container}>

            <AppTextInput
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
                autoCapitalize={"none"}
            />
            <AppTextInput
                placeholder="Email address"
                onChangeText={(text) => setEmail(text)}
                autoCapitalize={"none"}


            />
            <AppTextInput
                placeholder="Email Password"
                secureTextEntry={true}
                autoCapitalize={"none"}

                onChangeText={(text) => setPassword(text)}

            />
            <Button title={"Signup"}
                    onPress={() => mutate()}
            />


            {isPending && <Text>Submitting...</Text>}
        </View>


        <StatusBar style={"dark"}/>
    </WorkArea>);
};

const styles = StyleSheet.create({
    container: {
        gap: 10,


    }
})

export default SignupScreen;