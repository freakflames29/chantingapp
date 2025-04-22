import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import WorkArea from "../Components/WorkArea";
import colors from "../config/colors";

const SatSangCreateScreen = () => {

    const [imageShow,setImageShow] = useState(true)

    return (
        <WorkArea>

            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.cardContainer}>
                { imageShow && <View style={styles.imageDiv}>
                    <Image
                        style={{
                            width: "100%",

                            height: "100%",
                            borderRadius: 24,

                        }}
                        resizeMode={"cover"}
                        source={require("../assets/login.jpg")}
                    />
                </View>}
                <View style={{
                   padding:20,



                }}>
                    <Text style={{
                        fontSize:20,
                        marginBottom:10,
                        opacity:0.5
                    }}>Username</Text>
                    <Text style={{
                        fontSize:22,
                    }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius eos exercitationem porro tenetur. Cupiditate fuga nam omnis porro reiciendis,.</Text>
                </View>
            </TouchableOpacity>
        </WorkArea>
    );
};
const styles = StyleSheet.create({
    cardContainer:{
        width:"100%",
        height:"auto",
        position:"relative",
        // padding:20,
        borderRadius:24,
        backgroundColor:colors.lightBg,

    },
    imageDiv:{
        width:"100%",
         aspectRatio:1.5,
        // height:"40%",
        //    backgroundColor:"blue"

    }
})
export default SatSangCreateScreen;