import { SafeAreaView } from 'react-native-safe-area-context';
import { Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


function Sortie(){
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Operations de sortie :</Text>
    </SafeAreaView>
  )
}

function Entree(){
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Operations de d'entrée :</Text>
    </SafeAreaView>
  )
}

const Tab = createBottomTabNavigator();

function ActivityBottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor : "#000000",
        tabBarActiveBackgroundColor :"#ebebeb",
        tabBarInactiveTintColor : "#cccccc"

      }}>

      <Tab.Screen name="Sortie" 
        component={Sortie} 
        options={{
          
          tabBarIcon: ({color}) => (
            <FontAwesome name="sign-out-alt" color={color} size={25} />
          ),
         
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