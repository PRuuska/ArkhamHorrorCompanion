import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function StatValueContainer({ onPress, title, statsValue, disabled, defaultStatsValue  }) {
    return (
        <TouchableOpacity 
            style={[styles.container, disabled && styles.disabledContainer]}
            disabled={disabled}
            onPress={onPress}>
          <Text>{title}</Text>
          <View style={[styles.stats]}>
          <Text style={[
            styles.defaultTextColour,
            statsValue > defaultStatsValue ? styles.increasedTextColour : null,
            statsValue < defaultStatsValue ? styles.decreasedTextColour : null,
        ]}>
          {statsValue}
        </Text>          </View>
        </TouchableOpacity>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
      },
      stats: {
        borderWidth:1,
        alignItems: 'center', 
        width:80,
        height: 80, 
        justifyContent:'center',
        marginTop:5,
        fontSize:12,
      },
      disabledContainer: {
        opacity: 0.5, 
      },

      defaultTextColour:{
        color:"black"
      },
      increasedTextColour:{
        color: "green"
      },
      decreasedTextColour:{
        color: "red"
      }
    });
    