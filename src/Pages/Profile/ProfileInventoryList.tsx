import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React from 'react'
import { supabase } from '../../../supabase';
import { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import InventoryManager from '../../Components/InventoryManager';

export default function ProfileInventoryList({item}, {navigation}) {

    const [modalVisible,setModalVisible] = useState(false);
    const [inventoryManagerModalVisible, setInventoryManagerModalVisible] = useState(false);


    const [profileAsset, setProfileAsset] = useState([]);

    const [assetName, setAssetName] = useState("");
    const [assetType, setassetType] = useState("");
    const [assetSubType, setAssetSubType] = useState("");
    const [assetDescription, setAssetDescription] = useState("");
    const [assetHands, setAssetHands] = useState(0);
    const [assetValue, setAssetValue] = useState(0);


    async function readProfileAsset(userId) {
        try {
          console.log("profile id",item.id)
          // Fetch data based on the userId and include all columns from the related 'Investigator' table
          const { data: profileInvestigators, error } = await supabase
            .from('profileAsset')
            .select('*')
            .eq('userId', userId)
            .eq('profileInvestigatorId', item.id)
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
          }else{

            return asset;
          }
    
        } catch (error) {
          console.error('Error in readInvestigatorsForUser:', error.message);
          return null; 
        }
      }

      const refreshData = useCallback(async () => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          const userId = session.user.id;
    
          // Call readProfileInvestigators with the current userId
          readProfileAsset(userId).then((data) => {
            if (data) {
              setProfileAsset(data);

              console.log("profile asset",profileAsset)
            } else {
              console.log('Failed to fetch Profile Investigators data.');
              // Handle the error or absence of data
            }
          });
    
        });
        
      }, []);
      

      
      useEffect(() => {
        refreshData();
      }, [refreshData]);
      
      useFocusEffect(
        useCallback(() => {
          refreshData();
        }, [refreshData])
      );
      const onClick = (item) => {

        setModalVisible(!modalVisible)
        readAsset(item.assetId).then((data) => {

          var asset = data[0]

          setAssetName(asset.name);
          setassetType(asset.type);
          setAssetSubType(asset.subType);
          setAssetDescription(asset.description);
          setAssetHands(asset.hands);
          setAssetValue(asset.value);
        })
      }


      const onInventoryManagerClick = () =>{

        setInventoryManagerModalVisible(!inventoryManagerModalVisible)

      }


  return (
    <ScrollView>

      <View>

        <TouchableOpacity onPress={() => onInventoryManagerClick()}>
              <View style={styles.itemContainer}>
                  <View>
                    <Text style={styles.InvestigatorTitle}>Inventor Manager</Text>
                  </View>
              </View>
        </TouchableOpacity>

      </View>
      <View>

        <Text>Inventory</Text>
        <FlatList 
            data={profileAsset}
            renderItem={({ item }) =>
                <TouchableOpacity onPress={() => onClick(item)}>
                    <View style={styles.itemContainer}>

                        <View>
                          <Text style={styles.InvestigatorTitle}>{item.name}</Text>
                          <Text style={styles.InvestigatorTitle}>{item.type} - {item.supType}</Text>
                          <Text style={styles.InvestigatorTitle}>Hands - {item.hands}</Text>

                        </View>

                        {/* <Button title='Add' onPress={() => addInvestigatorToProfile(item)}/> */}

                    </View>

                </TouchableOpacity>
            }
            keyExtractor={(item) => item.id}
          />
      </View>

      {/* ASSET MODAL */}

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
          <View style={styles.modalView}>

              <View style={{marginBottom:100}}>
                <Text style={{paddingBottom:20}}>{assetName}</Text>
                <Text>{assetType} - {assetSubType}</Text>
                <Text>Hands - {assetHands}</Text>
                <Text style={{paddingBottom:20}}>Value - {assetValue}</Text>

                <Text>{assetDescription}</Text>
              </View>
              
              <View>
                <Pressable
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text>Remove</Text>
                </Pressable>

                <Pressable
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text>Close</Text>
                </Pressable>
              </View>
              
              <View>
                
              </View>
          </View>
          </View>
      </Modal>

          {/* INVENTORY MANAGER MODAL */}
      <Modal
          animationType="slide"
          transparent={true}
          visible={inventoryManagerModalVisible}
          onRequestClose={() => {
          setInventoryManagerModalVisible(!inventoryManagerModalVisible);
          }}>
            
        

          <View style={styles.centeredView}>
            
            <View style={styles.modalView}>
              <ScrollView>
              <View style={{padding:0}}>
                  <InventoryManager/>
                </View>

                  <Pressable
                      onPress={() => setInventoryManagerModalVisible(!inventoryManagerModalVisible)}>
                      <Text>Close</Text>
                  </Pressable>
              </ScrollView>
               
                
            </View>
          </View>
      </Modal>
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

    backButtonContainer:{
      padding:20
  },

  statsContainer:{
      textAlign:'center',
      marginTop:50,
      flexDirection:'row',
      justifyContent:'space-around'

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