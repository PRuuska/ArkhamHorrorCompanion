import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { View, Text, StyleSheet } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Login from './src/Pages/Login/Login'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './src/Pages/Login/Home'
import InvestigatorsList from './src/Pages/Character/InvestigatorsList'
import ScenarioList from './src/Pages/Scenario/ScenarioList'
import MainBottomTabs from './src/Navigation/MainBottomTabs'
import AuthStack from './src/Pages/Login/AuthStack'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      console.log(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log(session)

    })
  }, [])


  if(!session){
    return (
      <NavigationContainer>
      <AuthStack />
        {session && session.user && <Text>{session.user.id}</Text>}
        </NavigationContainer>
    )

  }

  return(
    <NavigationContainer>
      <MainBottomTabs/>
    </NavigationContainer>
  )
  
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})