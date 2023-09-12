import React from 'react';

import { Image, Text, View, StyleSheet } from 'react-native';
import PageContainer from '../../Components/PageContainer';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

function Character() {
    return (
        <PageContainer>
            <View>
                <Image style={styles.profileImage} source={require("../../assets/adaptive-icon.png")}></Image>
            </View>

            <View>
                <Text>Character Name</Text>
            </View>

            <View style={styles.statsContainer}>

                <View>
                    <Text>Health</Text>
                    <Image style={styles.stats} source={require("../../assets/adaptive-icon.png")}/>    
                </View>

                <View>
                    <Text>Sanity</Text>
                    <Image style={styles.stats} source={require("../../assets/adaptive-icon.png")}/>
                </View>
               
            </View>
        </PageContainer>
    );
}

export default Character;

const styles = StyleSheet.create({
    profileImageContainer:{


        
    },

    profileImage: {
            width:100,
            height:100,
            borderWidth:1,
            marginTop:10
    },

    statsContainer:{
        flexDirection:'row',
        justifyContent:'space-around'
    },

    stats:{
        width: 50,
        height: 50,
        borderWidth:1,
    }
})