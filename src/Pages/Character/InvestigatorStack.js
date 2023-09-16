import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InvestigatorsList from '../Character/InvestigatorsList';
import InvestigatorStats from './InvestigatorStats';

const InvestigatorStack = () => {

    const InvestigatorStack = createNativeStackNavigator();
    
    return (
        <InvestigatorStack.Navigator>
            <InvestigatorStack.Screen 
                name='InvestigatorList'
                component={InvestigatorsList}
            />
            <InvestigatorStack.Screen 
                name='InvestigatorStats'
                component={InvestigatorStats}
            />

        </InvestigatorStack.Navigator>

        );

    }  


export default InvestigatorStack;