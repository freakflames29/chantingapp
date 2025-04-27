import React, {useState} from 'react';
import {Image, Modal, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import WorkArea from "../Components/WorkArea";
import {StatusBar} from "expo-status-bar";
import colors from "../config/colors";
import useTimeAgo from "../hooks/useTimeAgo";
import AntDesign from '@expo/vector-icons/AntDesign';

const SatSangDetailsScreen = ({route}) => {
    const itemInfo = route.params.item

    const [modal, setModal] = useState(false)

    const timeAgo = useTimeAgo(itemInfo.created_at)
    return (


        <ScrollView contentContainerStyle={{
            paddingBottom: 100,
            flexGrow: 1,

        }}>


            <Modal visible={modal} style={styles.modal} animationType={"slide"}>
                <WorkArea style={{padding: 0,flex:1}}>

                    <View style={{
                        width: "100%",
                        height: 80,
                        // backgroundColor:"red",
                        justifyContent: "end",
                        alignItems: "center"

                    }}>
                        <TouchableWithoutFeedback onPress={() => setModal(!modal)}>
                            <AntDesign name="closecircle" size={34} color="black"/>
                        </TouchableWithoutFeedback>
                    </View>
                    <Image source={{uri: itemInfo.image}} width={400} height={400} resizeMode={"contain"}/>
                </WorkArea>
            </Modal>

            {itemInfo.image &&
                <TouchableWithoutFeedback onPress={() => setModal(!modal)}>

                    <Image
                        source={{
                            uri: itemInfo.image
                        }}
                        width={"100%"}
                        height={"400"}
                        resizeMode={"cover"}
                        borderRadius={2}
                    />
                </TouchableWithoutFeedback>
            }

            <View style={{
                padding: 20,
                // justifyContent:"center",
                alignItems: "flex-start",
                alignSelf: "start",
                backgroundColor: colors.lightBg,
                height: "auto",
                margin: 20,
                borderRadius: 25


            }}>

                <Text style={{fontSize: 18}}>@{itemInfo.user.username}</Text>
                <Text>Posted: {timeAgo()}</Text>
                <Text style={styles.text}>{itemInfo.title}</Text>
                <Text style={styles.desc}>{itemInfo.desc}</Text>
            </View>

            <StatusBar style={"dark"}/>
        </ScrollView>


    );
};
const styles = StyleSheet.create({
    text: {
        textAlign: "left",
        fontSize: 50,
        // textTransform:"capitalize",
        fontWeight: "bold",
        paddingVertical: 10,

    },
    desc: {fontSize: 20, paddingBottom: 10},
    modal: {
        // flex:1,

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red"
    }
})

export default SatSangDetailsScreen;