import React from "react";
import {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./Navigations/TabNavigation";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {userActions} from "./redux/userSlice";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import AuthNavigator from "./Navigations/AuthNavigator";
import LoginScreen from "./Screens/LoginScreen";
import Loading from "./Components/Loading";
import Bugsnag from "@bugsnag/expo";
import {View,Text,Button} from "react-native";

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

const ErrorView = ({ clearError }) => (
  <View>
    <Text>Something went wrong.</Text>
    <Button onPress={clearError} title="Try Again" />
  </View>
);


const Root = () => {
    const userInfo = useSelector(state => state.userReducer.info)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const RetrieveAsyncStorageData = async () => {
        try {
            setLoading(true)
            const asdata = await asyncStorage.getItem("info")
            if (asdata !== null) {


                const parsedData = JSON.parse(asdata)
                console.log("asdata", asdata)
                dispatch(userActions.setData(parsedData))
            }
        } catch (e) {
            Bugsnag.notify(e)
            console.log("Error reading the data from async storage ", e)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {

        if (userInfo === null) {

            RetrieveAsyncStorageData()
        }
    }, []);


    return (
        <ErrorBoundary FallbackComponent={ErrorView}>
            {loading ? <Loading/> : <>
                <NavigationContainer>

                    {userInfo === null ? <AuthNavigator/> : <TabNavigation/>}
                </NavigationContainer>

            </>}

        </ErrorBoundary>
    );
};

export default Root;