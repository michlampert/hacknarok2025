import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text } from "react-native";
import { RootStackParamList } from "../App";

export default ({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, "Home"> }) => {
    return (
        <>
            <Text>{'dupa '.repeat(100)}</Text>
            <Button title="connect with others" onPress={() =>
                navigation.navigate('Home')
            } />
        </>
    );
};