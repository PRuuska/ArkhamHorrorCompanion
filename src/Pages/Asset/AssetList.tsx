import { StyleSheet, Text, View, ScrollView, TouchableOpacity,FlatList, Button } from 'react-native'
import React from 'react'
import { supabase } from '../../../supabase';
import { useState, useEffect} from 'react';

export default function AssetList({item}) {

    const [assets, setAssets] = useState<any>([])



    const onClick = (item) => {
        console.log(item)
      }

    /// read profile asset to check assets against user profile
    async function readAllAssets(userId) {
        try {
          
          // If there are profileInvestigators for the user, get the list of investigatorIds
    
          // Fetch data from the 'Investigator' table for the investigatorIds
          const { data: investigatorsData, error: investigatorsError } = await supabase
            .from('asset')
            .select('*');
    
    
          if (investigatorsError) {
            console.error('Error fetching Investigators data:', investigatorsError.message);
            return null; // or handle the error in your own way
          }
    
          // Data fetched successfully
          return investigatorsData;
        } catch (error) {
          console.error('Error in readInvestigatorsForUser:', error.message);
          return null; // or handle the error in your own way
        }
      }

      useEffect(() => {
        //get auth session
        supabase.auth.getSession().then(({ data: { session } }) => {
          const userId = session.user.id;
    
          // Call readProfileInvestigators with the current userId
          readAllAssets(userId).then((data) => {
            if (data) {
    
                setAssets(data);
            } else {
              console.log('Failed to fetch Profile Investigators data.');
              // Handle the error or absence of data
            }
          });
        });
      }, []);

  return (
    <ScrollView>
          <FlatList 
              data={assets}
              renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => onClick(item)}>
                      <View style={styles.itemContainer}>

                          <View>
                            <Text style={styles.InvestigatorTitle}>{item.name}</Text>
                          </View>

                          {/* <Button title='Add' onPress={() => addInvestigatorToProfile(item)}/> */}

                      </View>

                  </TouchableOpacity>
              }
              keyExtractor={(item) => item.id}
          />
      </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
      },
    
      itemContainer:{
        padding:10,
        flex:1,
        flexDirection: 'row',
        borderBottomWidth:1,
    
      },
      InvestigatorTitle: {
        paddingLeft: 20,
        paddingBottom: 5,
        fontSize: 15,
        marginTop: 5,
      },
    
      InvestigatorJob: {
        paddingLeft: 20,
        paddingBottom: 5,
        fontSize: 12,
        marginTop: 5,
      },
    
      stats:{
        width:70,
        height:70,
        borderWidth:1
    }
})