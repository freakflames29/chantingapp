import React, {useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import WorkArea from "../Components/WorkArea";
import colors from "../config/colors";
import CountBar from "../Components/CountBar";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {ROOT_URL} from "../config/Constants";
import {useQuery} from "@tanstack/react-query";
import Loading from "../Components/Loading";
import {chantActions} from "../redux/chantSlice";

import {StatusBar} from "expo-status-bar";

const ChantRecordsScreen = () => {

    const userInfo = useSelector(state => state.userReducer.info)

    const allCount = useSelector(state => state.chantReducer.allCount)

    const dispatch = useDispatch()

    const fetchAllCount = async () => {
        const res = await axios.get(`${ROOT_URL}count/`, {
            headers: {
                Authorization: `Token ${userInfo.token}`,
                "X-Authorization": `Token ${userInfo.token}`,
            }
        })
        return res.data
    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["fetchAllCount"],
        queryFn: fetchAllCount
    })


    const calculateTime = () => {
        let time = 0;
        allCount.forEach((itm) => {
            time += parseInt(itm.time)
        })
        // console.log("time:=== ",time)
        if (time < 60) {
            return `${time}min`
        }
        let hour = Math.round(time / 60)
        let min = time % 60
        return `${hour}hr ${min}min`
    }


    useEffect(() => {
        if (data) {
            console.log(data)
            if (data.length > 0) {
                dispatch(chantActions.setAllCount(data))
            } else {
                dispatch(chantActions.removeAllCount())
            }
        }

    }, [data]);

    if (isError) {
        console.log("Error while loading the all count ", error)
    }


    return (
        <>
            {isLoading ? <Loading/> :
                <>
                    {/*<View style={styles.topArea}>*/}
                    {/*    <WorkArea style={styles.workArea}>*/}

                    {/*        <Text style={{*/}
                    {/*            fontSize: 30,*/}
                    {/*            fontWeight: "600",*/}

                    {/*        }}>Total Days: 3</Text>*/}
                    {/*        <Text style={{*/}
                    {/*            fontSize: 30,*/}
                    {/*            fontWeight: "600",*/}

                    {/*        }}>Total Hours: 10hr 40min</Text>*/}
                    {/*    </WorkArea>*/}
                    {/*</View>*/}


                    {/*<View style={{marginTop: 20, gap: 20, paddingHorizontal: 20,}}>*/}


                    <FlatList data={data}
                              ListHeaderComponent={
                                  <View style={styles.topArea}>
                                      <WorkArea style={styles.workArea}>

                                          <Text style={{
                                              fontSize: 30,
                                              fontWeight: "600",

                                          }}>Total Days: {data.length}</Text>
                                          <Text style={{
                                              fontSize: 30,
                                              fontWeight: "600",

                                          }}>Total Time: {calculateTime()}</Text>
                                      </WorkArea>
                                  </View>
                              }
                              contentContainerStyle={{marginTop: 20, gap: 20, width: "100%", paddingBottom: 200}}
                              keyExtractor={(item) => item.date}
                              renderItem={({item}) => (
                                  <View style={{paddingHorizontal: 20}}>

                                      <CountBar count={item.count} hour={item.time}/>
                                  </View>
                              )}
                    />


                    {/*</View>*/}
                    <StatusBar style={"dark"}/>
                </>
            }
        </>
    );
};
const styles = StyleSheet.create({


    topArea: {
        top: 0,
        // height: 250,
        width: "100%",
        borderBottomLeftRadius: 54,
        borderBottomRightRadius: 54,
        // backgroundColor: colors.lightBg
    },
    workArea: {
        width: "100%",
        gap: 10,
        marginTop: 60,

    },
})
export default ChantRecordsScreen;