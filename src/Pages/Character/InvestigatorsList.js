import React from 'react';
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
import PageContainer from '../../Components/PageContainer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function InvestigatorsList({navigation}) {

    const persons = [
        {
          id: "1",
          name: "Michael McGlen",
        },
        {
          id: "2",
          name: "Winston Orn",
        },
        {
          id: "3",
          name: "Carlton Collins",
        },
        {
          id: "4",
          name: "Malcolm Labadie",
        },
        {
          id: "5",
          name: "Michelle Dare",
        },
        {
          id: "6",
          name: "Carlton Zieme",
        },
        {
          id: "7",
          name: "Jessie Dickinson",
        },
        {
          id: "8",
          name: "Julian Gulgowski",
        },
        {
          id: "9",
          name: "Ellen Veum",
        },
        {
          id: "10",
          name: "Lorena Rice",
        },
      
        {
          id: "11",
          name: "Carlton Zieme",
        },
        {
          id: "12",
          name: "Jessie Dickinson",
        },
        {
          id: "13",
          name: "Julian Gulgowski",
        },
        {
          id: "14",
          name: "Ellen Veum",
        },
        {
          id: "15",
          name: "Lorena Rice",
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
export default InvestigatorsList;