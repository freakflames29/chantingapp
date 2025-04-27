import React from "react";
import WorkArea from "../Components/WorkArea";
import {Button, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../redux/userSlice";
import colors from "../config/colors"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import AppButton from "../Components/AppButton";

const MyProfile = ({navigation}) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userReducer.info);
    console.log(userInfo);

    const logoutUser = async () => {
        await asyncStorage.clear();
        dispatch(userActions.removeData());
    };

    return (
        <WorkArea style={{flex: 1}}>
            <View style={styles.container}>
                <View>
                    <Text style={{fontSize: 40, fontWeight: "bold"}}>
                        {userInfo.username}
                    </Text>
                    <Text>{userInfo.email}</Text>
                </View>
                <TouchableOpacity style={styles.listCard} onPress={()=>navigation.navigate("myposts")}>
                    <MaterialIcons name="my-library-books" size={24} color={colors.darkGreen}/>
                    <Text style={{fontSize:20}}>My Posts</Text>
                </TouchableOpacity>

                <AppButton
                    title={"Logout"}
                    textColor={"white"}
                    icon={<MaterialIcons name="logout" size={24} color="white" />}
                    underlayColor={colors.lightRed}
                    style={{
                        backgroundColor:colors.red
                    }}
                    onPress={logoutUser}
                />
            </View>
        </WorkArea>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
    },
    listCard: {
        width: "100%",
        height: 100,
        alignItems:"center",
        // justifyContent: "center",
        backgroundColor: colors.lightBg,
        padding: 20,
        borderRadius: 20,
        flexDirection: "row",
        gap:10,
    }
});

export default MyProfile;
