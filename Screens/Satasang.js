import React, {useEffect, useState} from 'react';
import WorkArea from "../Components/WorkArea";
import {Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Loading from "../Components/Loading";
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import colors from "../config/colors";

import * as ImagePicker from "expo-image-picker"
import axios from "axios";
import {ROOT_URL} from "../config/Constants";
import {useMutation, useQuery} from "@tanstack/react-query";
import Toast from "../Components/Toast";
import {useDispatch, useSelector} from "react-redux";
import {allPostActions} from "../redux/allPostSlice";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import PostCard from "../Components/PostCard";

const Satasang = ({navigation}) => {

    const allPost = useSelector(state => state.allPostReducer.allPost)

    const dispatch = useDispatch()

    const fetchAllPost = async () => {
        const res = await axios(`${ROOT_URL}posts/all/`)
        return res.data
    }

    const {data, isError, error, isLoading} = useQuery({
        queryKey: ["fetchAllPost"], queryFn: fetchAllPost
    })


    useEffect(() => {

        if (data) {

            dispatch(allPostActions.setAllPost(data))
        }
    }, [data]);


    if (isLoading) {
        return <Loading/>
    }
    if (isError) {
        console.log("Error fetching all post ", error.message)
    }

    return (<WorkArea style={{flex: 1,padding:0}}>
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.createContainer}
            onPress={() => {
                navigation.navigate('satsangCreate')
            }}>

            <View style={styles.iconDiv}>
                <FontAwesome6 name="add" size={24} color="white"/>

            </View>
            <Text style={{fontSize: 20}}>Post your learnings</Text>

        </TouchableOpacity>


        <FlatList
            contentContainerStyle={{
                marginTop:20,
                paddingBottom: 200,
                width:"100%",
                paddingHorizontal:20,

            }}
            showsVerticalScrollIndicator={false}
            style={{
                width:"100%",

            }}
            ItemSeparatorComponent={() => <View style={{height: 20}}/>}
            data={allPost}
            keyExtractor={(post) => post.id.toString()}
            renderItem={({item}) => (
                <PostCard
                    image={item.image}
                    desc={item.desc}
                    username={item.user.username}
                />
            )}/>
    </WorkArea>);
};

const styles = StyleSheet.create({
    createContainer: {
        width: "90%",
        height: 70,
        backgroundColor: colors.lightBg,
        marginVertical: 20,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 20,

        marginHorizontal:20,

    }, iconDiv: {
        width: 45,
        height: 45,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lightGreen,
    },

})

export default Satasang;


// steps to upload image to server

// const [image, setImage] = useState()
//    const pickImage = async () => {
//        // No permissions request is necessary for launching the image library
//        let result = await ImagePicker.launchImageLibraryAsync({
//            mediaTypes: ['images', 'videos'],
//        });
//
//
//        if (!result.canceled) {
//            setImage(result.assets[0]);
//        }
//    };
//
//    const uploadServer = async () => {
//
//        const formData = new FormData()
//
//        formData.append('title', "krishna")
//        formData.append("image", {
//            uri: image.uri,
//            name: image.fileName || "photo.jpg",
//            type: image.type || "image/jpeg",
//        })
//
//
//        console.log("Payload", formData)
//        const res = await axios.post(`${ROOT_URL}test/`, formData, {
//            headers: {
//                "Content-Type": "multipart/form-data"
//            }
//        })
//        return res.data
//    }
//
//    const {mutate, data, isError, error, isPending, isSuccess} = useMutation({
//        mutationKey: ["upload test"],
//        mutationFn: uploadServer
//    })
//
//
//    if (isSuccess) {
//        console.log("Success")
//    }
//    if (isError) {
//        console.log("Error inuploading,", error.message)
//    }