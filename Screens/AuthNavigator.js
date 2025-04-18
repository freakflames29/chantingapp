import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";


const Stack = createStackNavigator()
const AuthNavigator = () => {
    return (
        <Stack.Navigator id={2} screenOptions={{headerShown:false}}>
            <Stack.Screen name={"login"} component={LoginScreen}/>
            <Stack.Screen name={"signup"} component={SignupScreen}/>
        </Stack.Navigator>
    );
};

export default AuthNavigator;