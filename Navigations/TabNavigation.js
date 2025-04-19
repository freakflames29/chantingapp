import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Text} from "react-native";
import SignupScreen from "../Screens/SignupScreen";
import HomeScreen from "../Screens/HomeScreen";
import ChantScreen from "../Screens/ChantScreen";
import Satasang from "../Screens/Satasang";
import MyProfile from "../Screens/MyProfile";
import TabBarIcon from "../Components/TabBarIcon";
import colors from "../config/colors";

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    return (
        <Tab.Navigator id={1} screenOptions={
            {
                headerShown: false,
                tabBarIcon: () => null,
                tabBarStyle: {
                    position: "absolute",
                    marginHorizontal: 20,
                    bottom: 20,
                    paddingBottom: 0,
                    borderRadius: 50,
                    height: 90,
                    borderCurve:"circular",
                    backgroundColor:colors.black

                },
                tabBarIconStyle: {
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                },
            }

        }


        >

            <Tab.Screen name={"home"} component={HomeScreen}
                        options={{
                            tabBarLabel: () => null,
                            tabBarIcon: ({focused}) => <TabBarIcon name={"home"} focused={focused} label={"Home"}/>
                        }}

            />
            <Tab.Screen name={"chant"} component={ChantScreen}
                        options={{
                            tabBarLabel: () => null,
                            tabBarIcon: ({focused}) => <TabBarIcon name={"beads"} focused={focused} label={"Chant"} />
                        }}

            />
            <Tab.Screen name={"satsang"} component={Satasang}
                        options={{
                            tabBarLabel: () => null,
                            tabBarIcon: ({focused}) => <TabBarIcon name={"search"} focused={focused} label={"Satsang"}/>
                        }}
            />
            <Tab.Screen name={"profile"} component={MyProfile}
                        options={{
                            tabBarLabel: () => null,
                            tabBarIcon: ({focused}) => <TabBarIcon name={"user"} focused={focused} label={"Profile"}/>
                        }}

            />

        </Tab.Navigator>
    );
};

export default TabNavigation;