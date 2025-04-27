import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import WorkArea from "../Components/WorkArea";
import {StatusBar} from "expo-status-bar";
import colors from "../config/colors";
import useTimeAgo from "../hooks/useTimeAgo";

const SatSangDetailsScreen = ({route}) => {
    const itemInfo =  route.params.item

    const timeAgo = useTimeAgo(itemInfo.created_at)
    return (

        <ScrollView contentContainerStyle={{
            paddingBottom:100,
            flexGrow:1,

        }}>

            {itemInfo.image &&
                <Image
                source={{
                    uri: itemInfo.image
                }}
                width={"100%"}
                height={"400"}
                resizeMode={"cover"}
                borderRadius={2}
            />}

            <View style={{
                padding:20,
                // justifyContent:"center",
                alignItems:"flex-start",
                alignSelf:"start",
                backgroundColor:colors.lightBg,
                height:"auto",
                margin:20,
                borderRadius:25


            }}>

                <Text style={{fontSize:18}}>@{itemInfo.user.username}</Text>
                <Text>Posted: {timeAgo()}</Text>
                <Text style={styles.text}>{itemInfo.title}</Text>
                <Text style={styles.desc}>{itemInfo.desc}</Text>
            </View>

            <StatusBar style={"dark"}/>
        </ScrollView>


    );
};
const styles = StyleSheet.create({
    text:{
        textAlign:"left",
        fontSize:50,
        // textTransform:"capitalize",
        fontWeight:"bold",
        paddingVertical:10,

    },
    desc:{fontSize:20,paddingBottom:10}
})

export default SatSangDetailsScreen;