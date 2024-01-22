import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { supabase } from '../../../supabase';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export default function ProfileInventoryList({item}) {

    const [profileAsset, setProfileAsset] = useState<any>([]);
    const [asset, setAsset] = useState<any>([]);


    async function readProfileAsset(userId) {
        try {

          console.log(userId)
          // Fetch data based on the userId and include all columns from the related 'Investigator' table
          const { data: profileInvestigators, error } = await supabase
            .from('profileAsset')
            .select('*')
            .eq('userId', userId)
            .order('id');
    
          if (error) {
            console.error('Error fetching data:', error.message);
            return null; // or handle the error in your own way
          }
    
          // Data fetched successfully
          return profileInvestigators;
        } catch (error) {
          console.error('Error in readInvestigatorsForUser:', error.message);
          return null; 
        }
      }

      async function readAsset(assetId) {
        try {
          // Fetch data based on the userId and include all columns from the related 'Investigator' table
          const { data: asset, error } = await supabase
            .from('asset')
            .select('*')
            .eq('id', assetId)
            .order('id');
    
          if (error) {
            console.error('Error fetching data:', error.message);
            return null; // or handle the error in your own way
          }
    
          // Data fetched successfully
          return asset;
        } catch (error) {
          console.error('Error in readInvestigatorsForUser:', error.message);
          return null; 
        }
      }



      const refreshData = useCallback(async () => {
        const idToUse = item.userId;
      
        const profileData = await readProfileAsset(idToUse);
      
        if (profileData) {
          setProfileAsset(profileData);
      
          // Assuming each profileAsset has an assetId
          const assetId = profileData[0].assetId;
      
          const assetData = await readAsset(assetId);
      
          if (assetData) {
            setAsset(assetData);
            console.log(asset);
          }
        } else {
          console.log('Failed to fetch Profile Investigators data.');
          // Handle the error or absence of data
        }
      }, [item.userId]); // Make sure to include item.userId in the dependency array
      
      useEffect(() => {
        refreshData();
      }, [refreshData]);
      
      useFocusEffect(
        useCallback(() => {
          refreshData();
        }, [refreshData])
      );
      const onClick = (item) => {
        console.log(item)
      }


  return (
    <ScrollView>
          <FlatList 
              data={profileAsset}
              renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => onClick(item)}>
                      <View style={styles.itemContainer}>

                          <View>
                            <Text style={styles.InvestigatorTitle}>{asset.name}</Text>
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