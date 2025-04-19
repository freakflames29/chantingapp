import React from 'react';
import WorkArea from "../Components/WorkArea";
import {Button, Text} from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useDispatch} from "react-redux";
import {userActions} from "../redux/userSlice";

const MyProfile = () => {
    const dispatch = useDispatch()
    const clearAsync = async () => {
        await asyncStorage.clear()
        dispatch(userActions.removeData())
    }

    return (
        <WorkArea>
            <Text>My profile</Text>
            <Button title={"Logout"} onPress={clearAsync}/>
        </WorkArea>
    );
};

export default MyProfile;