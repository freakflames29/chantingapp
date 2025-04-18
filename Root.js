import {useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./Navigations/TabNavigation";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {userActions} from "./redux/userSlice";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import AuthNavigator from "./Navigations/AuthNavigator";


const Root = () => {
    const userInfo = useSelector(state => state.userReducer.info)

    const dispatch = useDispatch()

    const RetrieveAsyncStorageData = async () => {
        try {
            const asdata = await asyncStorage.getItem("info")
            if (asdata !== null) {


                const parsedData = JSON.parse(asdata)
                console.log("asdata", asdata)
                dispatch(userActions.setData(parsedData))
            }
        } catch (e) {
            console.log("Error reading the data from async storage ", e)
        }
    }


    useEffect(() => {

        if (userInfo === null) {

            RetrieveAsyncStorageData()
        }
    }, []);

    return (
        <NavigationContainer>
            {userInfo === null ? <AuthNavigator/> : <TabNavigation/>}
        </NavigationContainer>
    );
};

export default Root;