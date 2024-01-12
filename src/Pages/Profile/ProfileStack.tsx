import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileInvestigatorsList from './ProfileInvestigatorsList';
import InvestigatorStats from '../Character/InvestigatorStats';
import InvestigatorsList from '../Character/InvestigatorsList';
import ProfileSelectInvestigators from './ProfileSelectInvestigators';


const ProfileStack = () => {

    const ProfileStack = createNativeStackNavigator();
    
    return (
        <ProfileStack.Navigator screenOptions={{
            headerShown: false
          }}>
            <ProfileStack.Screen 
                name='ProfileInvestigatorsList'
                component={ProfileInvestigatorsList}
            />
            <ProfileStack.Screen 
                name='InvestigatorStats'
                component={InvestigatorStats}
            />
            <ProfileStack.Screen 
                name='ProfileSelectInvestigators'
                component={ProfileSelectInvestigators}
            />

        </ProfileStack.Navigator>

        );

    }  


export default ProfileStack;