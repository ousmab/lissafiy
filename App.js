import React, { useEffect, useState } from 'react';
import { Text, View , Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';



import Activite from './components/Activite';
import Historique from './components/Historique';
import Tiers from './components/Tiers';
import { getAllCategory,insertCategory,getAllCategoryByType, CATEGORY_IN, CATEGORY_OUT, CATEGORY_DETTE, CATEGORY_PRET, createCategorieTable } from './databases/categoryModel';
import { createOperationTable, getAllOperations } from './databases/operationModel';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();


function HomeScreen() { 

    const [categories, setCategories] = useState()

    
    useEffect(() => {

     
     /*insertCategory(["emprunts",CATEGORY_IN, CATEGORY_DETTE ],  (result)=>{
        console.log(result)
      })

      getAllCategoryByType(CATEGORY_IN,(categories)=>{
        console.log("BONJOURR",categories)
      })*/
      
      return () => { 
        
      }
    }, [])

  return (
    <Tab.Navigator
    
        screenOptions={{
          tabBarLabelStyle: { fontSize: 13, fontWeight:'bold' },
          tabBarStyle: { backgroundColor: '#fff', elevation:0 },
        }}

        screenListeners={({ navigation }) => ({
          state: (e) => {
            // Do something with the state
            let tab_index =  e.data.state.index;

            switch (tab_index) {
              case 0:// si on est sur le tab Activité
                
                break;
              
              case 1:// si on est sur le tab Historique
                alert("index historique", tab_index)
              break;
            
              case 2: // si on est sur le tab Tiers
              alert("index tiers", tab_index)
              break;

              default:
                break;
            }
            // si on est a activité on recupere les somme et ce qui est a afficher sur le graphz

            // si on es a historique on recuperer ce qui est a fficher a historique


           
          },
        })}
    >
        <Tab.Screen  
          name="activité" 
          component={Activite}></Tab.Screen>
          
        <Tab.Screen  
          name="historique" 
          component={Historique}
          
          listeners={({ navigation, route }) => ({
            tab: (e) => {
              // Prevent default action
              console.log("historiqsss")
              // Do something with the `navigation` object
              navigation.navigate("activité");
            },
          })}

          >

          </Tab.Screen>

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
    createCategorieTable()
    createOperationTable()
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

