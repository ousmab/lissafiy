import React, { useEffect, useState } from 'react';
import { Text, View , Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';



import Activite from './components/Activite';
import Historique from './components/Historique';
import Tiers from './components/Tiers';

import { createDBSchema} from './databases/dbConnexion';
import { getAllCategory } from './databases/categoryModel';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

// test de la bd


function HomeScreen() { 

    const [categories, setCategories] = useState()

    
    useEffect(() => {
      
      return () => {
        
      }
    }, [])

  return (
    <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 13, fontWeight:'bold' },
          tabBarStyle: { backgroundColor: '#fff', elevation:0 },
        }}
    >
        <Tab.Screen  
          name="activité" 
          component={Activite}></Tab.Screen>
          
        <Tab.Screen  
          name="historique" 
          component={Historique}></Tab.Screen>

        <Tab.Screen  
          name="tiers" 
          component={Tiers}
          //options={{tabBarIcon:<Icon name="facebook" /> }}
          ></Tab.Screen>
          
    </Tab.Navigator>
  );
}
export default function App() {

  useEffect(() => {
    createDBSchema()
    return () => {
      
    }
  }, [])

  return (
    
    <SafeAreaProvider>
        <NavigationContainer >
              <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
                <Stack.Screen 
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Lissafiy', headerStyle: {
                     
                   } }}
                /> 
              </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
          
    
  );
}