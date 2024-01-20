import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScenarioStack from '../Pages/Scenario/ScenarioStack';
import ProfileStack from '../Pages/Profile/ProfileStack';
import Account from '../Pages/Profile/Account';

const Tab = createBottomTabNavigator();

function MainBottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen name="Scenario" component={ScenarioStack} />
      {/* <Tab.Screen name="Investigator" component={InvestigatorStack} /> */}
      <Tab.Screen name="Investigators" component={ProfileStack} />
      <Tab.Screen name="Profile" component={Account} />


    </Tab.Navigator>
  );
}

export default MainBottomTabs;