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
import { supabase } from '../../../supabase';
import { Button } from 'react-native-elements';

function ProfileInvestigatorsList({navigation}) {

  const [profileInvestigators , setProfileInvestigators] = useState([]);

  async function readInvestigatorsForUser(userId) {
    try {
      // Fetch data based on the userId and include all columns from the related 'Investigator' table
      const { data: profileInvestigators, error } = await supabase
        .from('profileInvestigators')
        .select('*')
        .eq('userId', userId);

      if (error) {
        console.error('Error fetching data:', error.message);
        return null; // or handle the error in your own way
      }

      // If there are profileInvestigators for the user, get the list of investigatorIds
      const investigatorIds = profileInvestigators.map((profileInvestigator) => profileInvestigator.investigatorId);

      // Fetch data from the 'Investigator' table for the investigatorIds
      const { data: investigatorsData, error: investigatorsError } = await supabase
        .from('investigator')
        .select('*')
        .in('id', investigatorIds);

      if (investigatorsError) {
        console.error('Error fetching Investigators data:', investigatorsError.message);
        return null; // or handle the error in your own way
      }

      // Data fetched successfully
      return profileInvestigators;
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
      readInvestigatorsForUser(userId).then((data) => {
        if (data) {
          console.log('Profile Investigators:', data);
          // Handle the data as needed

          setProfileInvestigators(data);
        } else {
          console.log('Failed to fetch Profile Investigators data.');
          // Handle the error or absence of data
        }
      });
    });
  }, []);

  const onClick = (item) => {
    console.log(item)
    navigation.navigate('InvestigatorStats',{item})
  }

  const navigateToInvestigatorList = () => {
    navigation.navigate('ProfileSelectInvestigators')
  }

  return (
      <ScrollView>
          <FlatList 
              data={profileInvestigators}
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

                      </View>

                  </TouchableOpacity>
              }
              keyExtractor={(item) => item.id}
          />

          <Button title={"Add Investigator"} onPress={() => navigateToInvestigatorList()}/>
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
export default ProfileInvestigatorsList;