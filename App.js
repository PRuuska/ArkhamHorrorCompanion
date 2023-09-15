import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/Pages/WelcomeScreen';
import InvestigatorStats from './src/Pages/Character/InvestigatorStats';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InvestigatorsList from './src/Pages/Character/InvestigatorsList';
import MainBottomTabs from './src/Navigation/MainBottomTabs';



const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();



function App() {
  return (
    <NavigationContainer>
      <MainBottomTabs />
    </NavigationContainer>
  );
}

export default App;