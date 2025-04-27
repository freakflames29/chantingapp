import React from 'react';
import WorkArea from "../Components/WorkArea";
import {Image} from "react-native";

const ViewImageScreen = ({img,navigation}) => {
    return (
        <WorkArea>
            <Image
                source={{
                    uri:img

                }}
                width={400}
                height={400}
                resizeMode={"contain"}
            />
        </WorkArea>
    );
};

export default ViewImageScreen;