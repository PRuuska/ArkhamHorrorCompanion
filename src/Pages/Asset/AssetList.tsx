import { StyleSheet, Text, View, ScrollView, TouchableOpacity,FlatList, Button } from 'react-native'
import React from 'react'

export default function AssetList({item}) {

    console.log("asset", item)


    /// read profile asset to check assets against user profile



  return (
    <ScrollView>
          <FlatList 
              data={assets}
              renderItem={({ item }) =>
                  <TouchableOpacity onPress={() => onClick(item)}>
                      <View style={styles.itemContainer}>

                          <View>
                            <Text style={styles.InvestigatorTitle}>{item.Name}</Text>
                            <Text style={styles.InvestigatorJob}>{item.Occupation}</Text>
                          </View>

                          {/* <Button title='Add' onPress={() => addInvestigatorToProfile(item)}/> */}

                      </View>

                  </TouchableOpacity>
              }
              keyExtractor={(item) => item.id}
          />
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
})