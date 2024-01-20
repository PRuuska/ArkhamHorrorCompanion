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
      <View>
        <Text>Name: {defaultInvestigator.name}</Text>
        <Text>Special Ability: {defaultInvestigator.specialAbility}</Text>
      </View>

      <View style={{paddingTop:50}}>
        <Text>The Story So Far: {defaultInvestigator.story}</Text>
      </View>

      
    </SafeAreaView>
  );
}

export default InvestigatorDetails;
