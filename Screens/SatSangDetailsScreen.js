import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import WorkArea from "../Components/WorkArea";
import {StatusBar} from "expo-status-bar";
import colors from "../config/colors";
import useTimeAgo from "../hooks/useTimeAgo";

const SatSangDetailsScreen = ({route}) => {
    const itemInfo =  route.params.item

    const timeAgo = useTimeAgo(itemInfo.created_at)
    return (
        <>

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
                <Text style={{fontSize:20}}>{itemInfo.desc}</Text>
            </View>
            <StatusBar style={"dark"}/>
        </>

    );
};
const styles = StyleSheet.create({
    text:{
        textAlign:"left",
        fontSize:50,
        // textTransform:"capitalize",
        fontWeight:"bold"
    }
})

export default SatSangDetailsScreen;