import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import DigitalChantScreen from "../Screens/DigitalChantScreen";


const Stack = createStackNavigator()

const HomeNavigation = () => {
    return (
        <Stack.Navigator>
                <Stack.Screen name={"home"} component={HomeScreen}/>
            <Stack.Screen name={"digitalChant"} component={DigitalChantScreen}/>
        </Stack.Navigator>
    );
};

export default HomeNavigation;