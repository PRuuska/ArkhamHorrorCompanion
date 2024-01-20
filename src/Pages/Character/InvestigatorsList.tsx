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
  TouchableOpacity,
  Button
} from 'react-native';
import { supabase } from '../../../supabase';

function InvestigatorsList({navigation}) {

  const [Investigators , setInvestigators] = useState([]);

  async function readInvestigatorsForUser(userId) {
    try {
      
      // If there are profileInvestigators for the user, get the list of investigatorIds

      // Fetch data from the 'Investigator' table for the investigatorIds
      const { data: investigatorsData, error: investigatorsError } = await supabase
        .from('investigator')
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

  function addInvestigatorToProfile (item) {
    console.log(item)

  }


  useEffect(() => {
    //get auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const userId = session.user.id;

      // Call readProfileInvestigators with the current userId
      readInvestigatorsForUser(userId).then((data) => {
        if (data) {

          setInvestigators(data);
        } else {
          console.log('Failed to fetch Profile Investigators data.');
          // Handle the error or absence of data
        }
      });
    });
  }, []);

  
  const onClick = (item) => {
    navigation.navigate('InvestigatorStats',{item})
  }

  return (
      <ScrollView>
          <FlatList 
              data={Investigators}
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

                          <Button title='Add' onPress={() => addInvestigatorToProfile(item)}/>

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