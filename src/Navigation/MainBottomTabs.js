import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InvestigatorStack from '../Pages/Character/InvestigatorStack';
import ScenarioStack from '../Pages/Scenario/ScenarioStack';
import ItemStack from '../Pages/Inventory/ItemStack';


const Tab = createBottomTabNavigator();

function MainBottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen name="Scenario" component={ScenarioStack} />
      <Tab.Screen name="Items" component={ItemStack} />
      <Tab.Screen name="Investigator" component={InvestigatorStack} />
    </Tab.Navigator>
  );
}

export default MainBottomTabs;