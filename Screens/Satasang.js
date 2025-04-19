import React from 'react';
import WorkArea from "../Components/WorkArea";
import {Text} from "react-native";
import Loading from "../Components/Loading";
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import colors from "../config/colors";

const Satasang = () => {
    return (
        <WorkArea style={{flex: 1}}>

            <Text>Satsang</Text>

            <AnimatedCircularProgress
                size={120}
                width={15}
                fill={70}
                tintColor={colors.darkGreen}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor={colors.lightGreen}>

                {
                    (fill)=><Text style={{fontSize:40}}>{fill}</Text>
                }
            </AnimatedCircularProgress>
        </WorkArea>
    );
};

export default Satasang;