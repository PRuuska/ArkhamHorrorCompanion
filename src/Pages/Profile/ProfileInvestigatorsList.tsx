import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { supabase } from '../../../supabase';
import { Button } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome';

function ProfileInvestigatorsList({navigation}) {

  const [profileInvestigators , setProfileInvestigators] = useState([]);

  async function readInvestigatorsForUser(userId) {
    try {
      // Fetch data based on the userId and include all columns from the related 'Investigator' table
      const { data: profileInvestigators, error } = await supabase
        .from('profileInvestigators')
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

  const onClick = (item) => {
    console.log(item)
    navigation.navigate('InvestigatorStats',{item})
  }

  const navigateToInvestigatorList = () => {
    navigation.navigate('ProfileSelectInvestigators')
  }

  async function deleteInvestigator(item) {
    try {
      // Fetch data based on the userId and include all columns from the related 'Investigator' table
      const { error } = await supabase
        .from('profileInvestigators')
        .delete()
        .eq('id', item);
  
      if (error) {
        console.error('Error deleting data:', error.message);
      } else {
        // Deletion was successful, refresh the data
        await refreshData();
      }
    } catch (error) {
      console.error('Error in deleteInvestigator:', error.message);
      
    }
  }

  const refreshData = useCallback(async () => {
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

  useFocusEffect(
    useCallback(() => {
      refreshData();
    }, [refreshData])
  );

  return (
    <SafeAreaView>
      <ScrollView>
            <FlatList 
                data={profileInvestigators}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => onClick(item)}>
                        <View style={styles.itemContainer}>
                            <Image 
                              style={styles.stats} 
                              source={require("../../assets/adaptive-icon.png")}/>
                            <View style={{paddingRight:150}}>
                              <Text style={styles.InvestigatorTitle}>{item.name}</Text>
                              <Text style={styles.InvestigatorJob}>{item.occupation}</Text>
                            </View>

                            <Menu>
                              <MenuTrigger text='...'/>
                              <MenuOptions>
                                <MenuOption onSelect={() =>  deleteInvestigator(item.id)} >
                                  <Text style={{color: 'red'}}>Delete Investigator</Text>
                                </MenuOption>
                              </MenuOptions>
                            </Menu>

                        </View>

                    </TouchableOpacity>
                }
                keyExtractor={(item) => item.id}
            />
                <Button title={"Add Investigator"} onPress={() => navigateToInvestigatorList()}/>


 
        </ScrollView>
    </SafeAreaView>
      

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
    justifyContent:'space-between',
    alignItems:'flex-start'

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