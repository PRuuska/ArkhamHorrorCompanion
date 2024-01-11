import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './Login';
import Registration from './Registration';
import { SafeAreaView } from 'react-native-safe-area-context';
import {View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

const AuthStack = () => {

    const AuthStack = createNativeStackNavigator();

    return (

            <AuthStack.Navigator screenOptions={{headerShown:false}}>
                <AuthStack.Screen
                    name='Login'
                    component={Login}
                />
                <AuthStack.Screen
                    name='Registration'
                    component={Registration}
                />
            </AuthStack.Navigator>
        );

    }


export default AuthStack;