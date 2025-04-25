import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Satasang from "../Screens/Satasang";
import SatSangCreateScreen from "../Screens/SatSangCreateScreen";
import SatSangDetailsScreen from "../Screens/SatSangDetailsScreen";


const Stack = createStackNavigator()

const SatsangNavigations = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"satsang"} component={Satasang}/>
            <Stack.Screen name={"satsangCreate"} component={SatSangCreateScreen}/>
            <Stack.Screen name={"satsangDetails"} component={SatSangDetailsScreen} options={
                        ({route})=>({
                            headerShown:true,
                            headerTitle: "All Posts"//oute.params?.item.title
                        })
            }/>
        </Stack.Navigator>
    );
};

export default SatsangNavigations;