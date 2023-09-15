import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScenarioList from '../Pages/Scenario/ScenarioList';
import Inventory from '../Pages/Inventory/Inventory';
import InvestigatorsList from '../Pages/Character/InvestigatorsList';
import InvestigatorStack from '../Pages/Character/InvestigatorStack';

const Tab = createBottomTabNavigator();

function MainBottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Scenario" component={ScenarioList} />
      <Tab.Screen name="Inventory" component={Inventory} />
      <Tab.Screen name="Investigator" component={InvestigatorStack} />
    </Tab.Navigator>
  );
}

export default MainBottomTabs;