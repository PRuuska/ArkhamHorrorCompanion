import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback, ScrollView } from 'react-native';
import PageContainer from '../../Components/PageContainer';


function InvestigatorStats({ route, navigation }) {
    const imgComponent = () => <img src={Agnes_Baker} />
    //investigator passed from list
    const { item } = route.params;
    const [modalVisible,setModalVisible] = useState(false)

    const [statTitle, setStatTitle] = useState("");
    const [statValue, setStatValue] = useState(0);

    const [health, setHealth] = useState(item.stats.health);
    const [sanity, setSanity] = useState(item.stats.sanity);
    const [money, setMoney] = useState(item.stats.money);
    const [focus, setFocus] = useState(item.stats.focus);
    const [lore, setLore] = useState(item.stats.lore);
    const [influence, setInfluence] = useState(item.stats.influence);
    const [observation, setObservation] = useState(item.stats.observation);
    const [strength, setStrength] = useState(item.stats.strength);
    const [will, setWill] = useState(item.stats.will);

    const [image, setImage] = useState(item.profilePhoto);

    const onStatPressHandler = (statValue, statTitle) =>{

        const statValues = {
            Health: health,
            Sanity: sanity,
            Money: money,
            Lore: lore,
            Influence: influence,
            Observation: observation,
            Strength: strength,
            Will: will,
            Focus: focus,
          };
        
          setStatTitle(statTitle);
          setStatValue(statValues[statTitle]);
      
        setModalVisible(!modalVisible);

    }

    const Increase = (statValue, statTitle) => {

        const statSetters = {
            Health: setHealth,
            Sanity: setSanity,
            Money: setMoney,
            Focus: setFocus,
            Lore: setLore,
            Influence: setInfluence,
            Obervation: setObservation,
            Strength: setStrength,
            Will: setWill,
            // Add more stat titles and setters here if needed
          };
        
          // Check if the statTitle exists in the map
          if (statSetters.hasOwnProperty(statTitle)) {
            const newval = statValue + 1;
            setStatValue(newval);
            statSetters[statTitle](newval);
          }

  }

  const Decrease = (statValue, statTitle) => {

    const statSetters = {
        Health: setHealth,
        Sanity: setSanity,
        Money: setMoney,
        Focus: setFocus,
        Lore: setLore,
        Influence: setInfluence,
        Obervation: setObservation,
        Strength: setStrength,
        Will: setWill,
        // Add more stat titles and setters here if needed
      };
    
      // Check if the statTitle exists in the map
      if (statSetters.hasOwnProperty(statTitle)) {
        const newval = statValue - 1;
        setStatValue(newval);
        statSetters[statTitle](newval);
      }

}

 

    return (
            
        <ScrollView>
            <View style={styles.backButtonContainer}>
            <TouchableOpacity 
                    onPress={() => navigation.goBack()}>
                        <Text style={{fontSize:12}}>Go Back</Text>
                </TouchableOpacity>
            </View>    

            <View style={{alignItems:'center', marginBottom:30}}>
                <Image style={styles.profileImage} source={require("../../assets/InvestigatorProfilePictures/" + item.profilePhoto)}></Image>
                <Text style={{marginTop:10}}>{item.name}</Text>
                <Text style={{padding:20,textAlign:'center', fontSize:12}}>{item.special_ability}</Text>
            </View>

            <View style={styles.healthContainer}>
                
                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Health")}>

                    <Text>Health</Text>
                    <View style={styles.stats}>
                        <Text>{health}</Text>
                    </View>

                </TouchableOpacity>
 
                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Money")}>
                    
                    <Text>Money</Text>
                    <View style={styles.stats}>
                        <Text>{money}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Sanity")}>

                    <Text>Sanity</Text>
                    <View style={styles.stats}>
                        <Text>{sanity}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>

                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Focus")}>

                    <Text>Focus</Text>
                    <View style={styles.stats}>
                        <Text>{focus}</Text>
                    </View>        
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Lore")}>

                    <Text>Lore</Text>
                    <View style={styles.stats}>
                        <Text>{lore}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{alignItems: 'center'}}
                    onPress={() => onStatPressHandler(item.stats, "Influence")}>

                        <Text>Influence</Text>
                        <View style={styles.stats}>
                            <Text>{influence}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>

                    <TouchableOpacity 
                        style={{alignItems: 'center'}}
                        onPress={() => onStatPressHandler(item.stats, "Observation")}>

                        <Text>Observation</Text>
                        <View style={styles.stats}>
                            <Text>{observation}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{alignItems: 'center'}}
                        onPress={() => onStatPressHandler(item.stats, "Strength")}>

                        <Text>Strength</Text>

                        <View style={styles.stats}>
                            <Text>{strength}</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{alignItems: 'center'}}
                        onPress={() => onStatPressHandler(item.stats, "Will")}>

                        <Text>Will</Text>

                        <View style={styles.stats}>
                            <Text>{will}</Text>
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
                        <Pressable
                            style={{padding:20}}
                            onPress={() => Increase(statValue, statTitle)}>
                            <Text>Increase</Text>
                        </Pressable>

                        <Text>{statTitle }</Text>
                        <View style={styles.stats}>
                            <Text>{statValue}</Text>
                        </View>

                        <Pressable
                            style={{padding:20}}
                            onPress={() => Decrease(statValue, statTitle)}>
                            <Text>Decrease</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text>Close</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>

        </ScrollView>
    );
}

export default InvestigatorStats;

const styles = StyleSheet.create({
    backButtonContainer:{
        padding:20



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
        marginTop:5,
        fontSize:12,
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