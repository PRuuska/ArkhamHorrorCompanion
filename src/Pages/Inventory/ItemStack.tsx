import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Items from './Items';

const ItemStack = () => {

    const ItemStack = createNativeStackNavigator();
    
    return (
        <ItemStack.Navigator>
            <ItemStack.Screen 
                name='Inventory'
                component={Items}
            />
            
        </ItemStack.Navigator>

        );

    }  


export default ItemStack;