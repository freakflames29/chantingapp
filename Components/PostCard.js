import React from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import WorkArea from "./WorkArea";
import colors from "../config/colors";
const PostCard = ({image,username,desc,onPress}) => {
    
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={onPress}
                style={styles.cardContainer}>
                {image && <View style={styles.imageDiv}>
                    <Image
                        style={{
                            width: "100%",

                            height: "100%",
                            borderRadius: 24,

                        }}
                        resizeMode={"cover"}
                        source={{
                            uri:image
                        }}
                    />
                </View>}
                <View style={{
                    padding: 20,


                }}>
                    <Text style={{
                        fontSize: 20,
                        marginBottom: 10,
                        opacity: 0.5
                    }}>@{username}</Text>
                    <Text style={{
                        fontSize: 22,
                    }}>{desc}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        height: "auto",
        position: "relative",
        // padding:20,
        borderRadius: 24,
        backgroundColor: colors.lightBg,
        overflow:"hidden"

    },
    imageDiv: {
        width: "100%",
        aspectRatio: 1.5,
        // padding:20,
    }
    // height:"40%",
    //    backgroundColor:"blue"
})


export default PostCard;