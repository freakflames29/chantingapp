import React from 'react';
import {SafeAreaView, StyleSheet, View, Platform, StatusBar} from "react-native";

const WorkArea = ({children, style}) => {
    return (<SafeAreaView style={{flex: 1}}>
        <View style={[styles.topPad, style]}>
            {children}
        </View>
    </SafeAreaView>);
};

const styles = StyleSheet.create({
    topPad: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        padding: 20,
    }
})
export default WorkArea;