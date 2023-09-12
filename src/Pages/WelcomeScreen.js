import React from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function WelcomeScreen({ navigation }) {

    return (
    <ImageBackground 
        source={require('../assets/background.jpg')}
        style={styles.background}
    >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Character</Text>
        <Button
            title="Character"
            onPress={() => navigation.navigate('Character')}
        />

        <Text style={{marginTop:10}}>Character Details</Text>
        <Button
            title="Character Details"
            onPress={() => navigation.navigate('CharacterDetails')}
        />
        </View>



    </ImageBackground>
        
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems:'center'
    },

    loginButton: {
        width:"100%",
        height:70,
        backgroundColor:'#fc5c65',

    },
    registerButton: {
        width:"100%",
        height:70,
        backgroundColor:'#4ecdc4',
    },
    logo:{
        width:100,
        height:100,
    },
    logoContainer:{
        position:'absolute',
        top: 70,
        alignItems: 'center'
    }
})

export default WelcomeScreen;   
