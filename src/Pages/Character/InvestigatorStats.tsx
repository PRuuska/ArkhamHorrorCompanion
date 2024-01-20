import React, { useState, useEffect,useCallback } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback, ScrollView, SafeAreaView } from 'react-native';
import PageContainer from '../../Components/PageContainer';
import { supabase } from '../../../supabase';
import { useFocusEffect } from '@react-navigation/native';
import StatValueContainer from '../../Components/StatValueContainer';
import Stats from '../../Components/Stats';
import InvestigatorDetails from './InvestigatorDetails';
import Carousel  from 'react-native-snap-carousel-new';
import { Pagination } from 'react-native-snap-carousel-new';
import AssetList from '../Asset/AssetList';
import ProfileInventoryList from '../Profile/ProfileInventoryList';

function InvestigatorStats({ route, navigation }) {

    //investigator passed from list
    const { item } = route.params;

    //DEFAULT INVESTIGATOR STATS
    const [defaultInvestigator, setdefaultInvestigator] = useState<any>([0]);

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

  
    const refreshData = useCallback(async () => {
      const idToUse = item.investigatorId !== undefined ? item.investigatorId : item.id;
  
      readDefaultInvestigorDetails(idToUse).then((data) => {
          if (data) {
              console.log(data[0])
              setdefaultInvestigator(data[0]);
          } else {
              console.log('Failed to fetch Profile Investigators data.');
              // Handle the error or absence of data
          }
      });
  }, [item.investigatorId, item.id]);


      useEffect(() => {
        console.log(defaultInvestigator); // Log the updated state here
      }, [defaultInvestigator]);
      

    useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [refreshData])
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselItems = [
    { title: 'Stats', component: <Stats profileItem={item} /> },
    { title: 'Details', component: <InvestigatorDetails defaultInvestigator={defaultInvestigator} /> },
    { title: 'Inventory', component: <ProfileInventoryList item={item} /> },
  ];

  const renderItem = ({ item }) => (
    <View >
      {item.component}
    </View>
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
                <Image style={styles.profileImage} source={{ uri: "../../assets/InvestigatorProfilePictures/" + defaultInvestigator.profilePhoto }} />
                    <Text style={{marginTop:10}}>{defaultInvestigator.name}</Text>
                    <Text style={{padding:20,textAlign:'center', fontSize:12}}>{defaultInvestigator.specialAbility}</Text>
                </View>

                <View style={styles.container}>
                <Carousel
                    layout='default'
                    data={carouselItems}
                    renderItem={renderItem}
                    sliderWidth={380}
                    itemWidth={350}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    />
                  <Pagination
                    dotsLength={carouselItems.length}
                    activeDotIndex={activeIndex}
                    containerStyle={styles.paginationContainer}
                    dotStyle={styles.paginationDot}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                  />
              </View>

                
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
      },
      container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 50
      },
    
      carouselItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      paginationContainer: {
        paddingTop: 50,
        paddingBottom: 10,
      },
      paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        // marginHorizontal: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
      },
})