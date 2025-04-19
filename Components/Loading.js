import React from 'react';
import WorkArea from "./WorkArea";
import {Image, Text, View} from "react-native";
import HeadingText from "./HeadingText";

const Loading = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",

        }}>

            <HeadingText text={"Loading..."} size={40}/>
        </View>
    );
};

export default Loading;