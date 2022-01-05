
import React, { useEffect, useState } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {View } from "react-native"
import { getAllDays } from '../databases/operationModel';
import Activite from "../components/Activite";
import Tiers from "../components/Tiers";
import Historique from "../components/Historique";



const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();



export default function HomeScreen({ navigation }) { 

    const [operation_dates, setOperation_dates] = useState()
    const [tiers_type, setTiers_type] = useState([1,2])

    useEffect(() => {
      
      

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
