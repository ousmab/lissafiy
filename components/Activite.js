import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker'

function Sortie(){

  const [date, setDate] = useState(new Date())

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={{ flex: 1,backgroundColor: 'red' }} ></View>
      <View style={{ flex: 4, alignItems: 'center' }} >

        <DatePicker 
          locale='fr'
          style = {{ height: 120, width : 600, }}
          androidVariant ="nativeAndroid"
          mode={"date"}
          date={date} 
          onDateChange={setDate} />
      </View>
      <View style={{ flex: 6,backgroundColor: '#ccc' }} ></View>
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