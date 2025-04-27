import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

const Toast = ({textColor, msg,iconName}) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
        const time = setTimeout(() => {
            setShow(false)
        }, 2000)


        return () => clearTimeout(time)
    }, []);

    return (
        <>

            {show && <View style={styles.container}>

                <Entypo name={iconName} size={24} color={textColor} />
                <Text style={{
                    fontSize: 15,
                    color: textColor
                }}>{msg}</Text>
            </View>}
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 70,
        zIndex: 100,
        backgroundColor: 'white',
        elevation: 10,
        position: "absolute",
        marginHorizontal: "10%",
        top: 80,
        borderRadius: 20,
        paddingHorizontal: 30,
        alignItems:"center",
        // justifyContent: "center",
        flexDirection:"row",
        gap:5,
    }
})

export default Toast;