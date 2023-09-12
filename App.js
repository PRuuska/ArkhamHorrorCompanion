import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/Pages/WelcomeScreen';
import Character from './src/Pages/Character/Character';
import CharacterDetails from './src/Pages/Character/CharacterDetails';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Character" component={Character} />
        <Stack.Screen name="Home" component={WelcomeScreen} />
        <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;