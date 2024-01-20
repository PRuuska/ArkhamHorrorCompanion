import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function InvestigatorDetails({ defaultInvestigator }) {
  // Check if defaultInvestigator is undefined
  if (!defaultInvestigator) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Log specific properties of defaultInvestigator
  console.log('Name:', defaultInvestigator.name);
  console.log('Special Ability:', defaultInvestigator.specialAbility);

  return (
    <SafeAreaView>
   
      <View style={{paddingTop:50}}>
        <Text>The Story So Far: </Text>
        <Text style={{paddingTop:10}}>{defaultInvestigator.story}</Text>
      </View>

      <View style={{paddingTop:10}}>
        <Text>Primary Role: {defaultInvestigator.primaryRole}</Text>
      </View>

      <View style={{paddingTop:10}}>
        <Text>Secondary Role: {defaultInvestigator.secondaryRole}</Text>
      </View>

    </SafeAreaView>
  );
}

export default InvestigatorDetails;
