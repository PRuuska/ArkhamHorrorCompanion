import React from 'react';
import {View, Text, Button} from 'react-native'
import {supabase} from '../../../supabase'
import { useState, useEffect} from 'react';

function Items({navigation}) {

    const signout = () => {

        supabase.auth.signOut();

    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          console.log(session.user.id)
        })
    
      }, [])

    return (
        <View>
            <Button title='Sign Out' onPress={() => signout()}/>
        </View>
    );
}

export default Items;