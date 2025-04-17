import React, {useEffect, useState} from 'react';
import {Button, Text, View} from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {userActions} from "../redux/userSlice";


const HomeScreen = ({navigation}) => {
    const userInfo = useSelector(state => state.userReducer.info)

    const dispatch = useDispatch()

    const RetrieveAsyncStorageData = async () => {
        try {
            const asdata = await asyncStorage.getItem("info")
            if (asdata === null) {
                navigation.navigate("signup")

            } else {

                const parsedData = JSON.parse(asdata)
                console.log("asdata", asdata)
                dispatch(userActions.setData(parsedData))
            }

        } catch (e) {
            console.log("Error reading the data from async storage")
        }
    }


    useEffect(() => {
        console.log(userInfo)
        if (userInfo === null) {

            RetrieveAsyncStorageData()
        }
    }, [userInfo]);

    // const clearAsync = async () => {
    //     await asyncStorage.clear()
    //     dispatch(userActions.removeData())
    // }

    return (
        <View>
            <Text>Hello: {userInfo?.username}</Text>

        </View>
    );
};

export default HomeScreen;