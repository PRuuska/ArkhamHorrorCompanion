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


function InvestigatorsList({navigation}) {

      const persons = require('../../Data/Investigator/Investigators.json');

      const [profileImage, setProfileImage] = useState();


      console.log(persons)

      const onClick = (item) => {
        console.log(item)
        navigation.navigate('InvestigatorStats',{item})
      }

        return (
            <ScrollView>
                <FlatList 
                    data={persons}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => onClick(item)}>
                            <View style={styles.itemContainer}>
                                <Image 
                                  style={styles.stats} 
                                  source={require("../../assets/InvestigatorProfilePictures/" + item.profilePhoto)}/>

                                <View>
                                  <Text style={styles.InvestigatorTitle}>{item.name}</Text>
                                  <Text style={styles.InvestigatorJob}>{item.occupation}</Text>
                                </View>

                            </View>

                        </TouchableOpacity>
                        
                    }
                    keyExtractor={(item) => item.id}
                />
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