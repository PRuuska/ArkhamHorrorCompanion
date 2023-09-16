import React, { useState } from 'react';

import { Image, Text, View, StyleSheet, TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import PageContainer from '../../Components/PageContainer';

function InvestigatorStats({ route }) {

    //investigator passed from list
    const { item } = route.params;
    const [modalVisible,setModalVisible] = useState(false)

    const [statTitle, setStatTitle] = useState("");
    const [statValue, setStatValue] = useState();

    const onStatPressHandler = (stats, statTitle) =>{

        const statValues = {
            Health: stats.health,
            Sanity: stats.sanity,
            Money: stats.money,
            Lore: stats.lore,
            Influence: stats.influence,
            Observation: stats.observation,
            Strength: stats.strength,
            Will: stats.will,
            Focus: stats.focus,
          };
        
          setStatTitle(statTitle);
          setStatValue(statValues[statTitle]);
      
        setModalVisible(!modalVisible);


    }

    return (
        <PageContainer>
            <View style={{alignItems:'center', marginBottom:30}}>
                <Image style={styles.profileImage} source={require("../../assets/adaptive-icon.png")}></Image>
                <Text style={{marginTop:10}}>{item.name}</Text>
                <Text style={{padding:20,textAlign:'center'}}>{item.special_ability}</Text>
            </View>

            <View style={styles.healthContainer}>
                
                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Health")}>

                    <Text>Health</Text>
                    <View style={styles.stats}>
                        <Text>{item.stats.health}</Text>
                    </View>

                </TouchableOpacity>
 
                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Money")}>
                    
                    <Text>Money</Text>
                    <View style={styles.stats}>
                        <Text>{item.stats.money}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Sanity")}>

                    <Text>Sanity</Text>
                    <View style={styles.stats}>
                        <Text>{item.stats.sanity}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>

                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Focus")}>

                    <Text>Focus</Text>
                    <View style={styles.stats}>
                        <Text>{item.stats.focus}</Text>
                    </View>        
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Lore")}>

                    <Text>Lore</Text>
                    <View style={styles.stats}>
                        <Text>{item.stats.lore}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Influence")}>

                        <Text>Influence</Text>
                        <View style={styles.stats}>
                            <Text>{item.stats.influence}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>

                    <TouchableOpacity 
                        style={{alignItems: 'center'}}
                        onPress={() => onStatPressHandler(item.stats, "Observation")}>

                        <Text>Observation</Text>
                        <View style={styles.stats}>
                            <Text>{item.stats.observation}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{alignItems: 'center'}}
                        onPress={() => onStatPressHandler(item.stats, "Strength")}>

                        <Text>Strength</Text>

                        <View style={styles.stats}>
                            <Text>{item.stats.strength}</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{alignItems: 'center'}}
                        onPress={() => onStatPressHandler(item.stats, "Will")}>

                        <Text>Will</Text>

                        <View style={styles.stats}>
                            <Text>{item.stats.will}</Text>
                        </View>
                    </TouchableOpacity>
            </View>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={{alignItems: 'center', marginBottom:100}}>
                <Text>{statTitle }</Text>
                <View style={styles.stats}>
                    <Text>{statValue}</Text>
                </View>
            </View>

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
    </Modal>

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
        marginTop:50,
        flexDirection:'row',
        justifyContent:'space-around'

    },


    stats:{
        borderWidth:1,
        alignItems: 'center', 
        width:80,
        height: 80, 
        justifyContent:'center',
        marginTop:5
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },

    modalView: {
        width:'100%',
        height:'100%',
        marginTop:'50%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
})