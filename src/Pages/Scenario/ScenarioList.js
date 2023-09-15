import React from 'react';
import {  FlatList, TouchableOpacity, View ,ScrollView, StyleSheet, Image, Text} from 'react-native';

function ScenarioList({navigation}) {

    const persons = [
        {
          id: "1",
          name: "Scenario 01",
        },
        {
          id: "2",
          name: "Scenario 02",
        },
        {
          id: "3",
          name: "Scenario 03",
        },
        {
          id: "4",
          name: "Scenario 04",
        },
        {
          id: "5",
          name: "Scenario 05",
        },
      ];

      const onClick = (id) => {
        navigation.navigate('InvestigatorStats')
      }
        

    return (
        <ScrollView>
                <FlatList 
                    data={persons}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => onClick(item.id)}>
                            <View style={styles.itemContainer}>
                                <Image style={styles.stats} source={require("../../assets/adaptive-icon.png")}/>

                                <Text style={styles.item}>{item.name}</Text>
                                
                            </View>

                        </TouchableOpacity>
                        
                    }
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>
    );
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
    item: {
      padding: 20,
      fontSize: 15,
      marginTop: 5,
    },

    stats:{
      width:70,
      height:70,
      borderWidth:1
  }
  });

export default ScenarioList;