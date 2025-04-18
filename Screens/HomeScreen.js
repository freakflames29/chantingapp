import React, {useEffect, useState} from 'react';
import {Button, Text, View} from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {userActions} from "../redux/userSlice";
import WorkArea from "../Components/WorkArea";


const HomeScreen = ({navigation}) => {
    const userInfo = useSelector(state => state.userReducer.info)

    const dispatch = useDispatch()



    const clearAsync = async () => {
        await asyncStorage.clear()
        dispatch(userActions.removeData())
    }

    return (
        <WorkArea>
            <Text>Hello: {userInfo?.username}</Text>
            <Button title={"Clear localstorage"} onPress={clearAsync}/>

        </WorkArea>
    );
};

export default HomeScreen;