import { SafeAreaView } from 'react-native-safe-area-context';
import { Text} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


function Sortie(){
  return (
    <SafeAreaView>
      <Text>bottom 1</Text>
    </SafeAreaView>
  )
}

function Entree(){
  return (
    <SafeAreaView>
      <Text>bottom 2</Text>
    </SafeAreaView>
  )
}

const Tab = createMaterialBottomTabNavigator();

function ActivityBottomTabs() {
  return (
    <Tab.Navigator 
      
    screenOptions={{
      tabBarOptions: {
          style: {
              backgroundColor: '#ccc',
          },
      },
      tabBarBackground: '#cccccc'
  }}
    >
      <Tab.Screen name="Sortie" 
        component={Sortie} 
        options={{
          
          tabBarIcon: (color) => (
            <FontAwesome name="sign-out-alt" color={color} size={25} />
          ),
          style : {backgroundColor:'red'}
        }}
        />

      <Tab.Screen name="Entrée" 
        component={Entree} 
        options={{
          
          tabBarIcon: ({ color }) => (
            <FontAwesome name="sign-in-alt" color={color} size={24} />
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