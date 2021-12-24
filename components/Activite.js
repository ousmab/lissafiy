import { SafeAreaView } from 'react-native-safe-area-context';
import { Text} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



function composant1(){
  return (
    <SafeAreaView>
      <Text>bottom 1</Text>
    </SafeAreaView>
  )
}

function composant2(){
  return (
    <SafeAreaView>
      <Text>bottom 2</Text>
    </SafeAreaView>
  )
}

const Tab = createMaterialBottomTabNavigator();

function ActivityBottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sortie" 
        component={composant1} 
        options={{
          tabBarLabel: 'mm',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        />
      <Tab.Screen name="Entrée" 
        component={composant2} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        />
    </Tab.Navigator>
  );
}


function Activite() {
    return (
      <ActivityBottomTabs/>
    );
  }

  export default Activite;