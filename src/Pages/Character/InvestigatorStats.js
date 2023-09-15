import React, { useState } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import PageContainer from '../../Components/PageContainer';

function InvestigatorStats({ route }) {

    //investigator passed from list
    const { item } = route.params;

    const onStatPressHandler = (statValue) =>{
        console.log(statValue)

    }

    return (
        <PageContainer>
            <View style={{alignItems:'center'}}>
                <Image style={styles.profileImage} source={require("../../assets/adaptive-icon.png")}></Image>
                <Text style={{marginTop:10}}>{item.name}</Text>
            </View>

            <View style={styles.healthContainer}>
                <TouchableOpacity 
                    tyle={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats.health)}>
                    <Text>Health</Text>
                    <View style={styles.stats}>
                        <Text>{item.stats.health}</Text>
                    </View>
                </TouchableOpacity>
 
                <View style={{alignItems: 'center'}}>
                    <Text>Money</Text>
                    <View style={styles.stats}>
                        <Text>1</Text>
                    </View>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text>Sanity</Text>
                    <View style={styles.stats}>
                        <Text>{item.stats.sanity}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={{alignItems: 'center'}}>
                    <Text>Focus</Text>
                    <View style={styles.stats}>
                        <Text>{item.stats.focus}</Text>
                    </View>        
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text>Lore</Text>
                    <View style={styles.stats}>
                        <Text>{item.stats.lore}</Text>
                    </View>
                </View>

                    <View style={{alignItems: 'center'}}>
                        <Text>Influence</Text>
                        <View style={styles.stats}>
                            <Text>{item.stats.influence}</Text>
                        </View>
                    </View>
                </View>


                <View style={styles.statsContainer}>
                    <View style={{alignItems: 'center'}}>
                        <Text>Observation</Text>
                        <View style={styles.stats}>
                            <Text>{item.stats.observation}</Text>
                        </View>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <Text>Strength</Text>

                        <View style={styles.stats}>
                            <Text>{item.stats.strength}</Text>
                        </View>

                    </View>

                    <View style={{alignItems: 'center'}}>
                        <Text>Will</Text>

                        <View style={styles.stats}>
                            <Text>{item.stats.will}</Text>
                        </View>
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
        borderWidth:1,
        alignItems: 'center', 
        width:80,
        height: 80, 
        justifyContent:'center'
    }
})