import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import { supabase } from '../../supabase'
import { useState } from 'react'
import { useEffect } from 'react'

export default function InventoryManager() {

    const [asset, setAsset] = useState<any>();
    const [modalVisible,setModalVisible] = useState(false);

    const [assetName, setAssetName] = useState("");
    const [assetType, setassetType] = useState("");
    const [assetSubType, setAssetSubType] = useState("");
    const [assetDescription, setAssetDescription] = useState("");
    const [assetHands, setAssetHands] = useState(0);
    const [assetValue, setAssetValue] = useState(0);

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



      useEffect(() => {
        //get auth session
        supabase.auth.getSession().then(({ data: { session } }) => {
          const userId = session.user.id;
    
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
      }, []);


      const onClick = (item) => {

        setModalVisible(!modalVisible)
        readAsset(item.id).then((data) => {

          var asset = data[0];

          setAssetName(asset.name);
          setassetType(asset.type);
          setAssetSubType(asset.subType);
          setAssetDescription(asset.description);
          setAssetHands(asset.hands);
          setAssetValue(asset.value);
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
                          <Text style={styles.InvestigatorTitle}>{item.name}</Text>
                          <Text style={styles.InvestigatorTitle}>{item.type} - {item.subType}</Text>
                          <Text style={styles.InvestigatorTitle}>Hands - {item.hands}</Text>

                        </View>

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
                <Text style={{paddingBottom:20}}>{assetName}</Text>
                <Text>{assetType} - {assetSubType}</Text>
                <Text>Hands - {assetHands}</Text>
                <Text style={{paddingBottom:20}}>Value - {assetValue}</Text>

                <Text>{assetDescription}</Text>
              </View>
              
                <Pressable
                    onPress={() => setModalVisible(!modalVisible)}>
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