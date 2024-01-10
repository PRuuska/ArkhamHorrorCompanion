import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

// import {firebase} from '../../../config'
import { setStatusBarHidden } from 'expo-status-bar';

function InvestigatorsList({navigation}) {

  const [investigators , setInvestigators] = useState([]);

  //reference investigators in firebase
  // const investigatorsRef = firebase.firestore().collection('Investigators');

      // const persons = require('../../Data/Investigator/Investigators.json');

      // const [profileImage, setProfileImage] = useState();
      
      const onClick = (item) => {
        console.log(item)
        navigation.navigate('InvestigatorStats',{item})
      }

      // useEffect(async () => {
        
      //   investigatorsRef
      //   .onSnapshot(
      //     querySnapshot => {

      //         const investigators = []

      //         querySnapshot.forEach((doc) => {
      //           const {Name, Occupation} = doc.data();

      //           investigators.push({
      //             id: doc.id,
      //             Name,
      //             Occupation
      //           })
      //         })
      //         setInvestigators(investigators)

      //         console.log(investigators)

      //     }
      //   )
      // }, [])

        return (
            <ScrollView>
                {/* <FlatList 
                    data={investigators}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => onClick(item)}>
                            <View style={styles.itemContainer}>
                                <Image 
                                  style={styles.stats} 
                                  source={require("../../assets/adaptive-icon.png")}/>

                                <View>
                                  <Text style={styles.InvestigatorTitle}>{item.Name}</Text>
                                  <Text style={styles.InvestigatorJob}>{item.Occupation}</Text>
                                </View>

                            </View>

                        </TouchableOpacity>
                    }
                    keyExtractor={(item) => item.id}
                /> */}
            </ScrollView>

          );
        }
        
        //styles to see the data more clearly
        
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
        });
export default InvestigatorsList;