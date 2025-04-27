import {View, Text, FlatList} from 'react-native'
import React from 'react'
import WorkArea from "../Components/WorkArea";
import {useSelector} from "react-redux";
import axios from "axios";
import {ROOT_URL} from "../config/Constants";
import {useQuery} from "@tanstack/react-query";
import Loading from "../Components/Loading";
import PostCard from "../Components/PostCard";
import HeadingText from "../Components/HeadingText";
import {useNavigation} from "@react-navigation/native";

const MyPosts = () => {
    const userInfo = useSelector(state => state.userReducer.info)
    const navigation = useNavigation()

    const fetchPost = async () => {
        const res = await axios(`${ROOT_URL}posts/`, {
            headers: {
                Authorization: `Token ${userInfo.token}`,
                "X-Authorization": `Token ${userInfo.token}`,
            }
        })
        return res.data

    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["fetchUserPost", `${userInfo.token}`],
        queryFn: fetchPost
    })

    if (isLoading) {
        return <Loading/>
    }
    if (isError) {
        console.log("Error fetching user post details ", error)
    }


    return (
        <View style={{flex: 1, paddingHorizontal: 20}}>

            <FlatList
                ListHeaderComponent={<HeadingText text={"My posts"} size={40}/>}
                style={{
                    marginTop: 20,
                    flex: 1
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 20,
                    paddingBottom: 200
                }}
                data={data}
                renderItem={({item}) => (
                    <PostCard username={item.user.username} desc={item.desc} image={item.image}
                              onPress={() => navigation.navigate("mypostsdetails", {item})}
                    />
                )}/>
        </View>
    )
}

export default MyPosts