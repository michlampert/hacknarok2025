import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/Main';
import { NavigationContainer } from '@react-navigation/native';
import History from './src/History';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Main}
          options={{ title: 'Connect' }}
        />
        <Stack.Screen name="History" component={History}
          options={{ title: 'History' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
