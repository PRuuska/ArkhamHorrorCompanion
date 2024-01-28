import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import { supabase } from '../../supabase'
import { useState } from 'react'
import { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

export default function InventoryManager({item, setRefresh}) {

    const [userId, setUserId] = useState("")
    const [asset, setAsset] = useState<any>();
    const [modalVisible,setModalVisible] = useState(false);

    const [assetItem, setAssetItem] = useState<any>([])

    async function readAllAsset() {
        try {
          // Fetch data based on the userId and include all columns from the related 'Investigator' table
          const { data: asset, error } = await supabase
            .from('asset')
            .select('*')
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

      async function readAsset(assetId) {
        try {
          // Fetch data based on the userId and include all columns from the related 'Investigator' table
          const { data: asset, error } = await supabase
            .from('asset')
            .select('*')
            .eq('id', assetId);
    
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

      async function addAsset(assetItem) {

        const asset = {
          userId: userId,
          assetId: assetItem.id,
          name: assetItem.name,
          type: assetItem.type,
          supType: assetItem.subType,
          hands: assetItem.hands,
          profileInvestigatorId: item
        }
    
        //INSERT NEW INVESTIGATORS TO TABLE 
        const { error } = await supabase.from('profileAsset')
        .insert(asset).select()
    
        if (error) {
            alert(error.message);
          } else {
            setModalVisible(false);
            setRefresh(true); // Trigger refresh in ProfileInventoryList
          }
    }


      const refreshData = useCallback(async () => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          const userId = session.user.id;
    
          supabase.auth.getSession().then(({ data: { session } }) => {
            const userId = session.user.id;
  
            setUserId(userId);
      
            // Call readProfileInvestigators with the current userId
            readAllAsset().then((data) => {
              if (data) {
      
                setAsset(data);
              } else {
                console.log('Failed to fetch Profile Investigators data.');
                // Handle the error or absence of data
              }
            });
          });
    
         
        });
        
      }, []);


      useFocusEffect(
        useCallback(() => {
          refreshData();
        }, [refreshData])
      );


      const onClick = (item) => {

        setModalVisible(!modalVisible)
        readAsset(item.id).then((data) => {

          var asset = data[0];

          setAssetItem(asset)

  
        })
      }

  return (
    <ScrollView>
    <FlatList 
    style={{width:350}}
        data={asset}
        renderItem={({ item }) =>
            <TouchableOpacity onPress={() => onClick(item)}>
                <View style={styles.itemContainer}>
    
                        <View>
                          <Text >{item.name}</Text>
                          <Text >{item.type} - {item.subType}</Text>
                        </View>

                <Pressable
                    onPress={() => addAsset(item)}>
                    <Text>Add</Text>
                </Pressable>

                </View>

            </TouchableOpacity>
            
        }
        keyExtractor={(item) => item.id}
    />

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
                
                <Text style={{paddingBottom:20}}>{assetItem.name}</Text>
                <Text>{assetItem.type} - {assetItem.subType}</Text>
                <Text>Hands - {assetItem.hands}</Text>
                <Text style={{paddingBottom:20}}>Value - {assetItem.value}</Text>

                <Text>{assetItem.description}</Text>
              </View>
              
                <Pressable
                    onPress={() => addAsset(assetItem)}>
                    <Text>Add</Text>
                </Pressable>

                <Pressable
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text>Close</Text>
                </Pressable>
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