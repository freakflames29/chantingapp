import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import SignupScreen from "../Screens/SignupScreen";
import HomeScreen from "../Screens/HomeScreen";

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    return (
        <Tab.Navigator id={1}>
            <Tab.Screen name={"home"} component={HomeScreen}/>
            <Tab.Screen name={"signup"} component={SignupScreen}
                                    options={{
                                        headerShown:false
                                    }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;