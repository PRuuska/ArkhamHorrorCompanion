import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inventory from './Inventory';

const InventoryStack = () => {

    const InventoryStack = createNativeStackNavigator();
    
    return (
        <InventoryStack.Navigator>
            <InventoryStack.Screen 
                name='Inventory'
                component={Inventory}
            />
            
        </InventoryStack.Navigator>

        );

    }  


export default InventoryStack;