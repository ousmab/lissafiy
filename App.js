import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View , Text } from 'react-native';

import HomeScreen from './components/HomeScreen';
import Menu from './components/Menu';
import CategoryAdd from "./components/CategoryAdd"
import CategoryDetails from "./components/CategoryDetails"
import About from "./components/About"


import { createCategorieTable } from './databases/categoryModel';
import { createOperationTable} from './databases/operationModel';

import Icon from "react-native-vector-icons/FontAwesome"
const Stack = createNativeStackNavigator();

const Home=()=>{

  return (
    <View>
      <Text>Autres</Text>
    </View>
  )
}

export default function App({ navigation }) {

  
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
   
    createCategorieTable()
    createOperationTable()
   
    return () => {

    }
  }, [])

  return (
    
    <SafeAreaProvider>
        
        <NavigationContainer >
              <Menu toggle={toggleOverlay}  visible={visible} />
              <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
                <Stack.Screen 
                    name="Home"
                    component={HomeScreen}
                    options={
                      { 
                        title: 'Lissafiy',  
                        headerStyle: {
                        fontSize:25
                        },
                        headerRight:()=>(
                          <Icon.Button 
                            name="bars" 
                            color="#575656"
                            size={25}
                            padding={10}
                            backgroundColor="#fff"
                            
                            onPress={()=>setVisible(true) }
                          >
                          
                        </Icon.Button>
                        )
                      }
                      
                  }
                /> 
                <Stack.Screen 
                    name="CategoryAdd"
                    component={CategoryAdd}
                    options={
                      { 
                        title: 'Ajouter une catégorie'
                      }
                    }
                />
                <Stack.Screen 
                    name="CategoryDetails"
                    component={CategoryDetails}
                    options={
                      { 
                        title: 'Détails catégories'
                      }
                    }
                /> 
                <Stack.Screen 
                    name="About"
                    component={About}
                    options={
                      { 
                        title: 'A propos'
                      }
                    }
                /> 
              </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
          
    
  );
}

