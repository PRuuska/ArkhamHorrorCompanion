import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import StatValueContainer from './StatValueContainer';
import { Modal } from 'react-native';
import { useState, useEffect , useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../supabase';

export default function Stats({profileItem}) {

    //investigator passed from list
    const { item } = profileItem;

    const [modalVisible,setModalVisible] = useState(false)

    const [statTitle, setStatTitle] = useState("");
    const [statValue, setStatValue] = useState(0);
    const [statDefaultValue, setDefultStatValue] = useState(0);

    //DEFAULT INVESTIGATOR STATS
    const [defaultInvestigator, setdefaultInvestigator] = useState<any>([]);
    const [investigatorId, setInvestigatorId] = useState(profileItem.id);
    const [defaultHealth, setDefaultHealth] = useState(profileItem.health);
    const [defaultSanity, setDefaultSanity] = useState(profileItem.sanity);
    const [defaultMoney, setDefaultMoney] = useState(profileItem.money);
    const [defaultFocus, setDefaultFocus] = useState(profileItem.focus);
    const [defaultLore, setDefaultLore] = useState(profileItem.lore);
    const [defaultInfluence, setDefaultInfluence] = useState(profileItem.influence);
    const [defaultObservation, setDefaultObservation] = useState(profileItem.observation);
    const [defaultStrength, setDefaultStrength] = useState(profileItem.strength);
    const [defaultWill, setDefaultWill] = useState(profileItem.will);


    //PROFILE STATS
    const [health, setHealth] = useState(profileItem.health);
    const [sanity, setSanity] = useState(profileItem.sanity);
    const [money, setMoney] = useState(profileItem.money);
    const [focus, setFocus] = useState(profileItem.focus);
    const [lore, setLore] = useState(profileItem.lore);
    const [influence, setInfluence] = useState(profileItem.influence);
    const [observation, setObservation] = useState(profileItem.observation);
    const [strength, setStrength] = useState(profileItem.strength);
    const [will, setWill] = useState(profileItem.will);

    const [image, setImage] = useState(profileItem.profilePhoto);

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
            Health: defaultInvestigator.health,
            Sanity: defaultInvestigator.sanity,
            Money: defaultInvestigator.money,
            Lore: defaultInvestigator.lore,
            Influence: defaultInvestigator.influence,
            Observation: defaultInvestigator.observation,
            Strength: defaultInvestigator.strength,
            Will: defaultInvestigator.will,
            Focus: defaultInvestigator.focus,
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

    const resetToDefaultStatValue = (statTitle) => {
        const defaultStatValues = {
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
        console.log(statTitle)
        // Check if the statTitle exists in the map
        if (statSetters.hasOwnProperty(statTitle) && defaultStatValues.hasOwnProperty(statTitle)) {
          const defaultValue = defaultStatValues[statTitle];
          setStatValue(defaultValue);
          statSetters[statTitle](defaultValue);
        }
      };

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
                .eq('id', profileItem.id)
                .select();

            if(error){
                alert(error.message)

            }else{
                setModalVisible(!modalVisible);
            }
    }

    const refreshData = useCallback(async () => {

        readDefaultInvestigorDetails(profileItem.investigatorId).then((data) => {
            if (data) {

                setdefaultInvestigator(data[0])

            } else {
              console.log('Failed to fetch Profile Investigators data.');
              // Handle the error or absence of data
            }
          });

        setHealth(profileItem.health);
        setSanity(profileItem.sanity);
        setMoney(profileItem.money);
        setFocus(profileItem.focus);
        setLore(profileItem.lore);
        setInfluence(profileItem.influence);
        setObservation(profileItem.observation);
        setStrength(profileItem.strength);
        setWill(profileItem.will);

      }, [profileItem.investigatorId]);


    useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [refreshData])
  );

  return (
    <View>
        <View style={styles.healthContainer}>
            <StatValueContainer
                onPress={() => onStatPressHandler(profileItem.stats, "Health")}
                title="Health"
                statsValue={health}
                defaultStatsValue={defaultInvestigator.health}
                disabled={false}
                />

            <StatValueContainer
                onPress={() => onStatPressHandler(profileItem.stats, "Money")}
                title="Money"
                statsValue={money}
                defaultStatsValue={defaultInvestigator.money}
                disabled={false}
                />

            <StatValueContainer
                onPress={() => onStatPressHandler(profileItem.stats, "Sanity")}
                title="Sanity"
                statsValue={sanity}
                defaultStatsValue={defaultInvestigator.sanity}
                disabled={false}
                />
        </View>
    
        <View style={styles.statsContainer}>
            <StatValueContainer
                onPress={() => onStatPressHandler(profileItem.stats, "Focus")}
                title="Focus"
                statsValue={focus}
                defaultStatsValue={defaultInvestigator.focus}
                disabled={false}
                />

            <StatValueContainer
                onPress={() => onStatPressHandler(profileItem.stats, "Lore")}
                title="Lore"
                statsValue={lore}
                defaultStatsValue={defaultInvestigator.lore}
                disabled={false}
                />

            <StatValueContainer
                onPress={() => onStatPressHandler(profileItem.stats, "Influence")}
                title="Influence"
                statsValue={influence}
                defaultStatsValue={defaultInvestigator.influence}
                disabled={false}
                />
        </View>
    
        <View style={styles.statsContainer}>
            <StatValueContainer
                onPress={() => onStatPressHandler(profileItem.stats, "Observation")}
                title="Observation"
                statsValue={observation}
                defaultStatsValue={defaultInvestigator.observation}
                disabled={false}
            />

            <StatValueContainer
                onPress={() => onStatPressHandler(profileItem.stats, "Strength")}
                title="Strength"
                statsValue={strength}
                defaultStatsValue={defaultInvestigator.strength}
                disabled={false}
            />

            <StatValueContainer
                onPress={() => onStatPressHandler(profileItem.stats, "Will")}
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
                            statValue > statDefaultValue ? styles.increasedTextColour : (statValue < statDefaultValue ? styles.decreasedTextColour : null),
                            ]}>{statValue}</Text>
                    </View>

                    <Pressable
                        style={{padding:20}}
                        onPress={() => Decrease(statValue, statTitle)}>
                        <Text>Decrease</Text>
                    </Pressable>

                    <Pressable
                        style={{padding:20}}
                        onPress={() => resetToDefaultStatValue(statTitle)}>
                        <Text>Reset</Text>
                    </Pressable>
                </View>

                {/* {statTitle == "Focus" ? (
                        <>
                            <View>
                                <Text> Apply Focus </Text>

                                <Pressable
                                    style={{padding:20}}
                                    onPress={() => Increase(item.str, "Strength")}>
                                    <Text>Strength</Text>
                                </Pressable>

                            </View> 
                        </>      
                    ) : null} */}

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
    </View>
  )
}

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