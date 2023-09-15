import React from 'react';
import PageContainer from '../../Components/PageContainer';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Navigation } from '../../Models/Navigation';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ScenarioList from './ScenarioList';

const ScenarioStack = () => {

    const ScenarioStack = createNativeStackNavigator();
    
    return (
        <ScenarioStack.Navigator>
            <ScenarioStack.Screen 
                name='Scenario'
                component={ScenarioList}
            />
        </ScenarioStack.Navigator>

        );

    }  


export default ScenarioStack;