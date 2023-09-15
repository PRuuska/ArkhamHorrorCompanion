import React from 'react';

import { Image, Text, View, StyleSheet } from 'react-native';
import PageContainer from '../../Components/PageContainer';
import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

function InvestigatorStats() {
    return (
        <PageContainer>
            <View style={{alignItems:'center'}}>
                <Image style={styles.profileImage} source={require("../../assets/adaptive-icon.png")}></Image>
                <Text style={{marginTop:10}}>Character Name</Text>
            </View>

            <View style={styles.healthContainer}>
                <View style={{alignItems: 'center'}}>
                    <Text>Health</Text>
                    <Image style={styles.healthStats} source={require("../../assets/adaptive-icon.png")}/>    
                </View>
                    <View style={{alignItems: 'center'}}>
                    <Text>Money</Text>
                    <Image style={styles.healthStats} source={require("../../assets/adaptive-icon.png")}/>
                </View>
                    <View style={{alignItems: 'center'}}>
                    <Text>Sanity</Text>
                    <Image style={styles.healthStats} source={require("../../assets/adaptive-icon.png")}/>
                </View>
            </View>

            <View style={styles.statsContainer}>
            <View style={{alignItems: 'center'}}>
                <Text>Focus</Text>
                    <Image style={styles.stats} source={require("../../assets/adaptive-icon.png")}/>
                </View>

                <View style={{alignItems: 'center'}}>
                <Text>Lore</Text>

                    <Image style={styles.stats} source={require("../../assets/adaptive-icon.png")}/>
                </View>

                <View style={{alignItems: 'center'}}>
                <Text>Influence</Text>

                    <Image style={styles.stats} source={require("../../assets/adaptive-icon.png")}/>
                </View>
            </View>


            <View style={styles.statsContainer}>
                <View style={{alignItems: 'center'}}>
                    <Text>Observation</Text>
                    <Image style={styles.stats} source={require("../../assets/adaptive-icon.png")}/>
                </View>

                <View style={{alignItems: 'center'}}>
                <Text>Strength</Text>

                    <Image style={styles.stats} source={require("../../assets/adaptive-icon.png")}/>
                </View>

                <View style={{alignItems: 'center'}}>
                <Text>Will</Text>

                    <Image style={styles.stats} source={require("../../assets/adaptive-icon.png")}/>
                </View>
            </View>


        </PageContainer>
    );
}

export default InvestigatorStats;

const styles = StyleSheet.create({
    profileImageContainer:{



    },

    profileImage: {
            width:100,
            height:100,
            borderWidth:1,
            marginTop:10
    },

    healthContainer:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-around'
    },

    healthStats:{
        width: 80 ,
        height: 80,
        borderWidth:1,
    },

    statsContainer:{
        textAlign:'center',
        marginTop:80,
        flexDirection:'row',
        justifyContent:'space-around'

    },

    stats:{
        width:70,
        height:70,
        borderWidth:1
    }
})