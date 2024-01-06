import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InvestigatorsList from '../Character/InvestigatorsList';
import InvestigatorStats from './InvestigatorStats';
import InvestigatorDetails from './InvestigatorDetails';

const InvestigatorStack = () => {

    const InvestigatorStack = createNativeStackNavigator();
    
    return (
        <InvestigatorStack.Navigator screenOptions={{
            headerShown: false
          }}>
            <InvestigatorStack.Screen 
                name='InvestigatorList'
                component={InvestigatorsList}
            />
            <InvestigatorStack.Screen 
                name='InvestigatorStats'
                component={InvestigatorStats}
            />

            <InvestigatorStack.Screen 
                name='InvestigatorDetails'
                component={InvestigatorDetails}
            />

        </InvestigatorStack.Navigator>

        );

    }  


export default InvestigatorStack;