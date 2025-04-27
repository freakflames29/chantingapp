import {View, Text} from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import MyProfile from '../Screens/MyProfile'
import MyPosts from '../Screens/MyPosts'
import MyPostsDetailsScreen from "../Screens/MyPostsDetailsScreen";


const Stack = createStackNavigator()


export default function ProfileNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='myprofile' component={MyProfile}/>
            <Stack.Screen name='myposts' component={MyPosts} options={{
                headerShown: true,
                headerTitle: "My Posts",
                headerBackTitle:"back",
                headerTintColor:"black"
            }}/>
              <Stack.Screen name={"mypostsdetails"} component={MyPostsDetailsScreen} options={
                        ({route})=>({
                            headerShown:true,
                            headerTitle: "All Posts"//oute.params?.item.title
                        })
            }/>
        </Stack.Navigator>
    )
}
