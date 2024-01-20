import { StyleSheet, Text, View , Button} from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { supabase } from '../../../supabase'

export default function Account() {

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

const styles = StyleSheet.create({})