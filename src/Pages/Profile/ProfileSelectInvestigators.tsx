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

function ProfileSelectInvestigators({navigation}) {

  const [loading, setLoading] = useState(true)
  const [investigators, setInvestigators] = useState<any>([]);
  const [userId, setUserId] = useState('')

  async function readInvestigatorsForUser(userId) {
    try {
      
      // Fetch all data from the 'Investigator' table 
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

  async function addInvestigatorToProfile( item) {
    setLoading(true);

    //UPDATES TO PROFILE INVESTIGATOR TABLE
    //POPULATE WITH DEFAULT INVESTIGATOR STATS AND DETAILS
    const investigator = {
      userId: userId,
      investigatorId: item.id,
      name: item.name,
      occupation: item.occupation,
      health: item.health,
      sanity:  item.sanity,
      lore: item.lore,
      will: item.will,
      influence: item.influence,
      observation: item.observation,
      strength: item.strength,
      focus: item.focus,
      money: item.money      
    }

    //INSERT NEW INVESTIGATORS TO TABLE 
    const { error } = await supabase.from('profileInvestigators').insert(investigator).select()

    if (error) {
      alert(error.message)
    }
    else {
      navigation.navigate('ProfileInvestigatorsList')
    }
    setLoading(false);
  }

  useEffect(() => {
    //get auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const userId = session.user.id;

      setUserId(userId);

      // Call readProfileInvestigators with the current userId
      readInvestigatorsForUser(userId).then((data) => {
        if (data) {
          console.log('Profile Investigators:', data);
          // Handle the data as needed

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
              data={investigators}
              renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => onClick(item)}>
                      <View style={styles.itemContainer}>
                          <Image 
                            style={styles.stats} 
                            source={require("../../assets/adaptive-icon.png")}/>

                          <View>
                            <Text style={styles.InvestigatorTitle}>{item.name}</Text>
                            <Text style={styles.InvestigatorJob}>{item.occupation}</Text>
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
export default ProfileSelectInvestigators;