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
import { createOperationTable, getAllOperations, getAllDays, getAllLastNdaysOperations } from './databases/operationModel';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();


function HomeScreen() { 

    const [operation_dates, setOperation_dates] = useState()
    const [tiers_type, setTiers_type] = useState([1,2])

    useEffect(() => {

      getAllLastNdaysOperations(4,(operations,tab_jours)=>{
        console.log("les 3 derniers jours ", tab_jours,operations )
      })
     
      return () => { 
        
      }
    }, [
      //operation_dates ENGENDRE UNE MISE A JOUR
    ])

  return (
    <Tab.Navigator
        onIndexChange={(index)=>{
            console.log("on a changer ,",index)
        }}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 13, fontWeight:'bold' },
          tabBarStyle: { backgroundColor: '#fff', elevation:0 },
        }}

        screenListeners={({ navigation, route }) => ({
          state: (e) => {
            // Do something with the state
            let tab_index =  e.data.state.index;

            switch (tab_index) {
              case 0:// si on est sur le tab Activité
                  
                break;
              
              case 1:// si on est sur le tab Historique
                console.log(tab_index)
                getAllDays((dates)=>{
                  setOperation_dates(dates)
                })
                
                
              break;
            

              case 2: // si on est sur le tab Tiers
                  /*console.log(tab_index)

                  le tiers est sois 1 soit 2
                  getAllTiersType((dates)=>{
                    setOperation_dates(dates)
                  })*/
              break;

              default:
                break;
            }

          },
        })}
    >
        <Tab.Screen  
          name="activité" 
          >
            {
              ()=><Activite />
            }
          </Tab.Screen>
          
        <Tab.Screen  
          name="historique" 
         >
            {
              ()=> <Historique dates={operation_dates}/>
            }
          </Tab.Screen>

        <Tab.Screen  
          name="tiers" 
           >
            {
              ()=> <Tiers type_tiers = {tiers_type} /> 
            }

          </Tab.Screen>
          
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
                     fontSize:25
                   } }}
                /> 
              </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
          
    
  );
}

