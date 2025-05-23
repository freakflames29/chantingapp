import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import DigitalChantScreen from "../Screens/DigitalChantScreen";
import colors from "../config/colors";
import ChantRecordsScreen from "../Screens/ChantRecordsScreen";


const Stack = createStackNavigator()

const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name={"home"} component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name={"digitalChant"} component={DigitalChantScreen} options={{
                headerTitle: "",
                headerBackTitle: "",
                headerTintColor: colors.lightGreen,
                headerTransparent: true,


            }}/>
            <Stack.Screen name={"records"} component={ChantRecordsScreen} options={{
                headerTitle: "",
                headerBackTitle: "",
                headerTintColor: "black",
                headerTransparent: true,
            }}/>
        </Stack.Navigator>
    );
};

export default HomeNavigation;