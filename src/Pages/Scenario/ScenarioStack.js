import React from 'react';
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