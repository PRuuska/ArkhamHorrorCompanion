import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InvestigatorStack from '../Pages/Character/InvestigatorStack';
import ScenarioStack from '../Pages/Scenario/ScenarioStack';
import InventoryStack from '../Pages/Inventory/InventoryStack';


const Tab = createBottomTabNavigator();

function MainBottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen name="Scenario" component={ScenarioStack} />
      <Tab.Screen name="Inventory" component={InventoryStack} />
      <Tab.Screen name="Investigator" component={InvestigatorStack} />
    </Tab.Navigator>
  );
}

export default MainBottomTabs;