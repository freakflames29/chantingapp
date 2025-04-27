import React, {useState} from 'react';
import {
    Button,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import WorkArea from "../Components/WorkArea";
import colors from "../config/colors";
import * as ImagePicker from "expo-image-picker"
import AppTextInput from "../Components/AppTextInput";
import HeadingText from "../Components/HeadingText";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppButton from "../Components/AppButton";
import {useSelector} from "react-redux";
import axios from "axios";
import {ROOT_URL} from "../config/Constants";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Platform} from "react-native";
import Toast from "../Components/Toast";
import {StatusBar} from "expo-status-bar";

const SatSangCreateScreen = ({navigation}) => {
    const [img, setImg] = useState(null)
    const userInfo = useSelector(state => state.userReducer.info)

    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const qclient = useQueryClient()


    const pickImg = async () => {
        try {

            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"]
            })

            if (!res.canceled) {

                setImg(res.assets[0])
            }


        } catch (e) {
            console.log("Error picking img from the library ", e)
        }

    }


    const uploadToServer = async () => {
        const formdata = new FormData()
        if (img) {
         
            formdata.append("title", title)
            formdata.append("desc", desc)
            formdata.append("image", {
                uri: img.uri,
                name: img.fileName || `photo_${Date.now()}.jpg`,
                type: img.mimeType || "image/jpeg"

            })
            console.log("Formdata image ", img.uri)
        } else {
            formdata.append("title", title)
            formdata.append("desc", desc)
        }

        const res = await axios.post(`${ROOT_URL}posts/create/`, formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${userInfo.token}`,
                "X-Authorization": `Token ${userInfo.token}`,
            },
            transformRequest: () => formdata
        })

        return res.data

    }


    const {mutate, isPending, isError, error, isSuccess} = useMutation({
        mutationKey: ["uploadToServer"],
        mutationFn: uploadToServer,
        onSuccess:()=> {
            qclient.invalidateQueries({queryKey: ["fetchAllPost"]})
            navigation.navigate("satsang")
        }
    })

    if (isError) {
        console.log("Error in posting ", error)
    }
    if (isSuccess) {

        console.log("Sucess in posting")

    }


    return (
        <WorkArea>

            {isSuccess &&  <Toast msg={"Posted successfully"} iconName={"check"} textColor={colors.darkGreen}/>}
            {isError &&  <Toast msg={error.message} iconName={"circle-with-cross"} textColor={colors.red} />}

            <HeadingText
                text={"Share your learning"}
                size={40}
                style={{marginVertical: 20}}
            />
            <ScrollView contentContainerStyle={styles.scrollView}
                        showsVerticalScrollIndicator={false}>


                <AppTextInput
                    placeholder={"Title"}
                    autoCapitalize={"none"}
                    value={title}
                    onChangeText={(t) => setTitle(t)}
                    // icon={"title"}
                />

                <AppTextInput
                    placeholder={"Details"}
                    value={desc}
                    onChangeText={(t) => setDesc(t)}
                    numberOfLines={10}
                    autoCapitalize={"none"}
                    multiline={true}
                    style={styles.bigTextBox}
                />

                {img &&

                    <Image
                        source={{
                            uri: img.uri
                        }}
                        width={200}
                        height={200}

                        resizeMode={"contain"}
                    />
                }

                <TouchableOpacity style={styles.chooseImg} activeOpacity={0.5} onPress={pickImg}>
                    <MaterialCommunityIcons name="file-image-plus" size={24} color="black"/>
                    <Text style={{fontSize: 20}}>Select Image</Text>
                </TouchableOpacity>

                <AppButton
                    title={isPending ? "Posting..." : "Post"}
                    textColor={colors.lightBg}

                    style={{
                        marginTop: 20,
                        backgroundColor: colors.darkGreen
                    }}
                    onPress={mutate}
                />


            </ScrollView>

        <StatusBar style={"dark"}/>
        </WorkArea>
    );
};
const styles = StyleSheet.create({
    scrollView: {
        gap: 10,
        paddingBottom: 200,
        flexGrow: 1,
        // alignItems: "center"
    },
    bigTextBox:{
        height:200,
        // justifyContent:"flex-start",
        // alignItems:"flex-start",
        flex:1,
        textAlignVertical:"top"

    },
    cardContainer: {
        width: "100%",
        height: "auto",
        position: "relative",
        // padding:20,
        borderRadius: 24,
        backgroundColor: colors.lightBg,

    },
    imageDiv: {
        width: "100%",
        aspectRatio: 1.5,
        // height:"40%",
        //    backgroundColor:"blue"

    },
    chooseImg: {
        width: "100%",
        height: 80,
        backgroundColor: colors.lightBg,
        borderRadius: 20,
        // borderStyle:"dotted",
        borderWidth: 1,
        borderColor: colors.lightGreen,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }
})
export default SatSangCreateScreen;

// old card

// <TouchableOpacity
//             activeOpacity={0.6}
//             style={styles.cardContainer}>
//             { imageShow && <View style={styles.imageDiv}>
//                 <Image
//                     style={{
//                         width: "100%",
//
//                         height: "100%",
//                         borderRadius: 24,
//
//                     }}
//                     resizeMode={"cover"}
//                     source={require("../assets/login.jpg")}
//                 />
//             </View>}
//             <View style={{
//                padding:20,
//
//
//
//             }}>
//                 <Text style={{
//                     fontSize:20,
//                     marginBottom:10,
//                     opacity:0.5
//                 }}>Username</Text>
//                 <Text style={{
//                     fontSize:22,
//                 }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius eos exercitationem porro tenetur. Cupiditate fuga nam omnis porro reiciendis,.</Text>
//             </View>
//         </TouchableOpacity>