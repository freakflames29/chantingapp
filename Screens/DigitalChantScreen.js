import {useEffect, useState} from 'react';
import WorkArea from "../Components/WorkArea";
import {Button, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";
import {StatusBar} from "expo-status-bar";
import AppButton from "../Components/AppButton";
import {useDispatch, useSelector} from "react-redux";
import {chantActions} from "../redux/chantSlice";
import useDate from "../hooks/useDate";
import axios from "axios";
import {ROOT_URL} from "../config/Constants";
import {useMutation} from "@tanstack/react-query";
import Toast from "../Components/Toast";
import useTimer from "../hooks/useTimer";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import HeadingText from "../Components/HeadingText";
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import * as Haptics from "expo-haptics"
import Bugsnag from "@bugsnag/expo";


const ChantScreen = () => {

    const chantInfo = useSelector(state => state.chantReducer.chantInfo)

    const userInfo = useSelector(state => state.userReducer.info)

    const [beads, setBeads] = useState(0)

    const progress = Math.round((beads / 108) * 100)

    const {startStop, formatTime, isRunning, reset, getTotalMinutes} = useTimer()


    const dispatch = useDispatch()


    const date = useDate()


    const addChant = () => {
        dispatch(chantActions.increase())
    }

    const addBead = () => {
        Haptics.impactAsync("heavy")
        setBeads(prevState => prevState + 1)
    }

    useEffect(() => {

        if (beads === 108) {
            addChant()
            setBeads(0)
        }

    }, [beads]);

    const updateChant = async () => {
        if (isRunning) {
            startStop()
        }
        const newTime = parseInt(chantInfo.time) + getTotalMinutes()

        const payload = {
            count: chantInfo.count,
            date: `${date}`,
            time: `${newTime}`
        }
        console.log(payload)
        const res = await axios.post(`${ROOT_URL}count/`, payload, {
            headers: {
                Authorization: `Token ${userInfo.token}`,
                "X-Authorization": `Token ${userInfo.token}`,
            }
        })

        return res.data

    }

    const {mutate, isSuccess, isPending, isError, error} = useMutation({
        mutationKey: ["updatechant"],
        mutationFn: updateChant
    })

    if (isSuccess) {
        console.log("Data updated successfully")
    }
    if (isError) {
        Bugsnag.notify(error)
        console.log("Error updating the chant, ", error.message)
    }


    return (
        <View style={styles.container}>
            {isSuccess && <Toast textColor={colors.darkGreen} msg={"Data updated successfully"} iconName={"check"}/>}

            <View style={styles.topPart}>
                <HeadingText text={"Digital Chanter"} size={40} color={colors.lightGreen}
                             style={{marginBottom: 30, marginTop: 30}}/>
                {/*<Text style={{fontSize: 15, color: colors.lightGreen}}>Rounds</Text>*/}
                {/*<Text style={styles.countText}>{chantInfo.count}</Text>*/}

                {/*<Text style={{fontSize:20,color:"white"}}>Beads</Text>*/}
                {/*<Text style={{fontSize:100,color:"white"}}>{beads}</Text>*/}

                {/*<AnimatedCircularProgress*/}
                {/*    size={250}*/}
                {/*    width={20}*/}
                {/*    fill={progress}*/}
                {/*    rotation={360}*/}
                {/*    lineCap={"round"}*/}
                {/*    tintColor={colors.darkGreen}*/}
                {/*    onAnimationComplete={() => console.log('onAnimationComplete')}*/}
                {/*    backgroundColor={colors.veryLightGreen}>*/}

                {/*    {*/}
                {/*        (fill) => <View style={{alignItems: "center"}}>*/}
                {/*            <Text style={{fontSize: 20, color: colors.darkGreen}}>Rounds: {chantInfo.count}</Text>*/}
                {/*            <Text style={{fontSize: 60, fontWeight: "bold", color: colors.darkGreen}}>{beads}</Text>*/}

                {/*        </View>*/}
                {/*    }*/}
                {/*</AnimatedCircularProgress>*/}
                <Text style={{fontSize: 20, color: colors.darkGreen}}>Rounds: {chantInfo.count}</Text>
               <Text style={{fontSize: 150, fontWeight: "bold", color: colors.darkGreen}}>{beads}</Text>

            </View>
            <View style={styles.downPart}>
                <View style={styles.time}>
                    <Text style={{fontSize: 20, color: colors.lightWhite}}>Time</Text>
                    <Text style={styles.timeText}>{formatTime()}</Text>

                    <View style={{
                        flexDirection: "row",
                        gap: 50,
                        marginTop: 10,
                    }}>

                        <TouchableOpacity onPress={startStop}>
                            <Text style={{
                                fontSize: 20,
                                color: colors.lightWhite

                            }}>{isRunning ? "Pause" : "Start"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={reset}>
                            <Text style={{
                                fontSize: 20,
                                color: colors.lightWhite
                            }}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>


                </View>

                <View style={styles.btnBox}>

                    <AppButton title={'Save'}
                               loading={isPending}
                               style={styles.saveBtn}
                               textColor={colors.darkGreen}
                               underlayColor={colors.lightGreen}
                               onPress={() => mutate()}
                               icon={<Entypo name="save" size={24} color={colors.lightGreen}/>}
                    />

                    <AppButton
                        title={"Add bead"}
                        style={styles.addBtn}
                        textColor={"white"}
                        underlayColor={colors.lightGreen}
                        onPress={addBead}
                        icon={<MaterialIcons name="add-circle" size={24} color="white"/>}
                    />
                </View>


            </View>


            <StatusBar style={"dark"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    btnBox: {
        flexDirection: "row",
        gap: 10,
        marginTop: 60,
    },
    saveBtn: {
        backgroundColor: colors.veryLightGreen,
        width: "35%",
        height: 60,
        color: colors.darkGreen
    },
    addBtn: {
        backgroundColor: colors.lightGreen,
        width: "45%",
        height: 60,

    },
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    downPart: {
        flex: 1.1,
        backgroundColor: "white",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        alignItems: "center",
        // gap: 60,
    },
    topPart: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    countText: {
        fontSize: 40,
        color: colors.lightGreen,
        fontWeight: "bold",
        marginBottom: 10,
    },
    time: {
        marginTop: 40,
        alignItems: "center",
        borderColor: colors.lightWhite,
        backgroundColor: colors.lightGreen,
        borderWidth: 2,
        borderRadius: 24,
        // elevation:1,
        padding: 20,
        width: "80%",
        height: "30%",
        justifyContent: 'center',

    },
    timeText: {
        fontSize: 40,
        color: colors.lightWhite,
        fontWeight: "700"
    }
})

export default ChantScreen;