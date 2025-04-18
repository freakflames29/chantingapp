import React from 'react';
import {Text, TouchableOpacity} from "react-native";

const TouchableText = ({text,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
                <Text>{text}</Text>
        </TouchableOpacity>
    );
};

export default TouchableText;