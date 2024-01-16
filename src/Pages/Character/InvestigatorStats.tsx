import React, { useState, useEffect,useCallback } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback, ScrollView, SafeAreaView } from 'react-native';
import PageContainer from '../../Components/PageContainer';
import { supabase } from '../../../supabase';
import { useFocusEffect } from '@react-navigation/native';
import StatValueContainer from '../../Components/StatValueContainer';

function InvestigatorStats({ route, navigation }) {

    //investigator passed from list
    const { item } = route.params;
    const [modalVisible,setModalVisible] = useState(false)

    const [statTitle, setStatTitle] = useState("");
    const [statValue, setStatValue] = useState(0);
    const [statDefaultValue, setDefultStatValue] = useState(0);

    //DEFAULT INVESTIGATOR STATS
    const [defaultInvestigator, setdefaultInvestigator] = useState<any>([]);
    const [investigatorId, setInvestigatorId] = useState(item.id);
    const [defaultHealth, setDefaultHealth] = useState(item.health);
    const [defaultSanity, setDefaultSanity] = useState(item.sanity);
    const [defaultMoney, setDefaultMoney] = useState(item.money);
    const [defaultFocus, setDefaultFocus] = useState(item.focus);
    const [defaultLore, setDefaultLore] = useState(item.lore);
    const [defaultInfluence, setDefaultInfluence] = useState(item.influence);
    const [defaultObservation, setDefaultObservation] = useState(item.observation);
    const [defaultStrength, setDefaultStrength] = useState(item.strength);
    const [defaultWill, setDefaultWill] = useState(item.will);


    //PROFILE STATS
    const [health, setHealth] = useState(item.health);
    const [sanity, setSanity] = useState(item.sanity);
    const [money, setMoney] = useState(item.money);
    const [focus, setFocus] = useState(item.focus);
    const [lore, setLore] = useState(item.lore);
    const [influence, setInfluence] = useState(item.influence);
    const [observation, setObservation] = useState(item.observation);
    const [strength, setStrength] = useState(item.strength);
    const [will, setWill] = useState(item.will);

    const [image, setImage] = useState(item.profilePhoto);

    const onStatPressHandler = (statValue, statTitle) =>{

        const statValues = {
            Id: investigatorId,
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

          const defaultStatValues = {
            Id: investigatorId,
            Health: defaultHealth,
            Sanity: defaultSanity,
            Money: defaultMoney,
            Lore: defaultLore,
            Influence: defaultInfluence,
            Observation: defaultInfluence,
            Strength: defaultStrength,
            Will: defaultWill,
            Focus: defaultFocus,
          };
          
        
          setStatTitle(statTitle);
          setStatValue(statValues[statTitle]);
          setDefultStatValue(defaultStatValues[statTitle]);

        //   console.log(de)
      
        setModalVisible(!modalVisible);
    }

    const Increase = (statValue, statTitle) => {


        const statSetters = {
            Id: setInvestigatorId,
            Health: setHealth,
            Sanity: setSanity,
            Money: setMoney,
            Focus: setFocus,
            Lore: setLore,
            Influence: setInfluence,
            Observation: setObservation,
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
        Observation: setObservation,
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

    //READ DEFAULT INVESTIGATOR DETAILS TO INPUT CHANGES
    async function readDefaultInvestigorDetails(id){
        try {
            // Fetch all data from the 'Investigator' table 
            const { data: investigatorData, error: investigatorsError } = await supabase
              .from('investigator')
                .select('*')
                .eq('id', id);
      
            if (investigatorsError) {
              console.error('Error fetching Investigators data:', investigatorsError.message);
              return null; 
            }else{
                // Data fetched successfully
                return investigatorData;
            }

          } catch (error) {
            console.error('Error in readInvestigatorsForUser:', error.message);
            return null;
          }

    }

    async function saveStatValue(statValue, statTitle) {

        let dbStatTitle = statTitle.toLowerCase();
        const updateObject = {};
            updateObject[dbStatTitle] = statValue;

            // Save stat value to profile investigator by id
            const { data, error } = await supabase
                .from('profileInvestigators')
                .update(updateObject)
                .eq('id', item.id)
                .select();

            if(error){
                alert(error.message)

            }else{
                setModalVisible(!modalVisible);
            }
    }

    const refreshData = useCallback(async () => {

        readDefaultInvestigorDetails(item.investigatorId).then((data) => {
            if (data) {

                setdefaultInvestigator(data[0])

            } else {
              console.log('Failed to fetch Profile Investigators data.');
              // Handle the error or absence of data
            }
          });

        setHealth(item.health);
        setSanity(item.sanity);
        setMoney(item.money);
        setFocus(item.focus);
        setLore(item.lore);
        setInfluence(item.influence);
        setObservation(item.observation);
        setStrength(item.strength);
        setWill(item.will);

      }, [item.investigatorId]);


    useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [refreshData])
  );

    return (
        <SafeAreaView>
                <ScrollView>
                <View style={styles.backButtonContainer}>
                <TouchableOpacity 
                        onPress={() => navigation.goBack()}>
                            <Text style={{fontSize:12}}>Go Back</Text>
                    </TouchableOpacity>
                </View>    

                <View style={{alignItems:'center', marginBottom:10}}>
                <Image style={styles.profileImage} source={{ uri: "../../assets/InvestigatorProfilePictures/" + item.profilePhoto }} />
                    <Text style={{marginTop:10}}>{item.name}</Text>
                    <Text style={{padding:20,textAlign:'center', fontSize:12}}>{defaultInvestigator.specialAbility}</Text>
                </View>

                <View style={styles.healthContainer}>
                        
                    <StatValueContainer
                        onPress={() => onStatPressHandler(item.stats, "Health")}
                        title="Health"
                        statsValue={health}
                        defaultStatsValue={defaultInvestigator.health}
                        disabled={false}
                        />

                    <StatValueContainer
                        onPress={() => onStatPressHandler(item.stats, "Money")}
                        title="Money"
                        statsValue={money}
                        defaultStatsValue={defaultInvestigator.money}
                        disabled={false}
                        />

                    <StatValueContainer
                        onPress={() => onStatPressHandler(item.stats, "Sanity")}
                        title="Sanity"
                        statsValue={sanity}
                        defaultStatsValue={defaultInvestigator.sanity}
                        disabled={false}
                        />
                </View>

                <View style={styles.statsContainer}>

                    <StatValueContainer
                        onPress={() => onStatPressHandler(item.stats, "Focus")}
                        title="Focus"
                        statsValue={focus}
                        defaultStatsValue={defaultInvestigator.focus}
                        disabled={false}
                        />

                    <StatValueContainer
                        onPress={() => onStatPressHandler(item.stats, "Lore")}
                        title="Lore"
                        statsValue={lore}
                        defaultStatsValue={defaultInvestigator.lore}
                        disabled={false}
                        />

                    <StatValueContainer
                        onPress={() => onStatPressHandler(item.stats, "Influence")}
                        title="Influence"
                        statsValue={influence}
                        defaultStatsValue={defaultInvestigator.influence}
                        disabled={false}
                        />
                    </View>

                    <View style={styles.statsContainer}>

                        <StatValueContainer
                            onPress={() => onStatPressHandler(item.stats, "Observation")}
                            title="Observation"
                            statsValue={observation}
                            defaultStatsValue={defaultInvestigator.observation}
                            disabled={false}
                        />

                        <StatValueContainer
                            onPress={() => onStatPressHandler(item.stats, "Strength")}
                            title="Strength"
                            statsValue={strength}
                            defaultStatsValue={defaultInvestigator.strength}
                            disabled={false}
                        />

                        <StatValueContainer
                            onPress={() => onStatPressHandler(item.stats, "Will")}
                            title="Will"
                            statsValue={will}
                            defaultStatsValue={defaultInvestigator.will}
                            disabled={false}
                        />
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
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
                            <Text style={[
                                styles.defaultTextColour,
                                statValue > statDefaultValue ? styles.increasedTextColour : null,
                                statValue < statDefaultValue ? styles.decreasedTextColour : null,
                            ]}>{statValue}</Text>
                            </View>

                            <Pressable
                                style={{padding:20}}
                                onPress={() => Decrease(statValue, statTitle)}>
                                <Text>Decrease</Text>
                            </Pressable>
                        </View>


                        {statTitle == "Focus" ? (
                               <>
                                    <View>
                                        <Text> Apply Focus </Text>

                                        

                                    </View> 
                               </>      
                            ) : null}

                        <Pressable
                            style={{marginBottom:20}}
                            onPress={() => saveStatValue(statValue, statTitle)}>
                            <Text>Confirm</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text>Close</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>

            </ScrollView>
        </SafeAreaView>
        
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
        marginTop:3,
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
      defaultTextColour:{
        color:"black"
      },
      increasedTextColour:{
        color: "green"
      },
      decreasedTextColour:{
        color: "red"
      }
})