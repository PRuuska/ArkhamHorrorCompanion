import * as React from 'react';
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainBottomTabs from './src/Navigation/MainBottomTabs';
import Login from './src/Pages/Login/Login';
import Registration from './src/Pages/Login/Registeration';
import Dashboard from './src/Pages/Login/Home';


const Stack = createNativeStackNavigator();

function App() {

  return (
    <Stack.Navigator>
      <Stack.Screen 
            name = "Dashboard" 
            component={Dashboard}
            options={{
              headerTitle:"Dashboard"
            }}
            />
    </Stack.Navigator>
  );
}

export default App