import React from 'react';
import { View, Text } from 'react-native';

import styles from './ProgressStyles';

const Progress: React.FC = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={{color: 'white', fontSize: 18}}>Progress:</Text>
            <View style={styles.scaleWrap}>
                <View style={styles.scale}/>
            </View>
            <Text style={styles.fractions}>1/120</Text>
        </View>
    )
}

export default Progress;