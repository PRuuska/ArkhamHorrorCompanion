import React, { useEffect } from 'react';
import {View, Text} from 'react-native'
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { supabase } from '../../../supabase';

async function signout() {

    supabase.auth.signOut()

}

const Home = (props) => {
    return (
        <View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title={"Sign Out"} onPress={() => signout()}></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})



export default Home;