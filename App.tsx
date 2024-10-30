/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/presentation/screens/HomeScreen';
import ToDoScreen from './src/presentation/screens/ToDoScreen';
import PeerScreen from './src/presentation/screens/PeerScreen';
import { configureDependencies } from './src/module/toDoModule';
import NavigationBar from './src/presentation/components/NavigationBar';

const Stack = createNativeStackNavigator();




function App(): React.JSX.Element {
  configureDependencies()
  return (
    <PaperProvider>
      <SafeAreaProvider>
      <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              header: (props) => <NavigationBar {...props} />,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ToDos" component={ToDoScreen} />
            <Stack.Screen name="Peers" component={PeerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider> 
    </PaperProvider>
  );
}

export default App;
