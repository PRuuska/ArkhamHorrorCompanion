import React from 'react';
import PageContainer from '../../Components/PageContainer';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Navigation } from '../../Models/Navigation';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InvestigatorsList from '../Character/InvestigatorsList';
import InvestigatorStats from './InvestigatorStats';
import { HeaderTitle } from '@react-navigation/elements';

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