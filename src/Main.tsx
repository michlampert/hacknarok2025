import React from 'react';
import { Button } from 'react-native';
import AR from './AR';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default ({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, "History"> }) => {
    return (<>
        <AR />
        <Button title="check history" onPress={() =>
            navigation.navigate('History')
        } />
    </>
    );
};