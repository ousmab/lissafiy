import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View , Text } from 'react-native';

import HomeScreen from './components/HomeScreen';
import Menu from './components/Menu';

import CategoryDetails from "./components/CategoryDetails"
import About from "./components/About"
import FormCategory from "./components/FormCategory"

import { createCategorieTable } from './databases/categoryModel';
import { createOperationTable} from './databases/operationModel';

import Icon from "react-native-vector-icons/FontAwesome"
const Stack = createNativeStackNavigator();



export default function App({ navigation }) {

  
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    
    createCategorieTable()
    createOperationTable()
   
    return () => {
      
    }
  }, [])

  return (
    
    <SafeAreaProvider>
        
        <NavigationContainer >
              <Menu toggle={toggleOverlay}  visible={visible} setModalVisible={setModalVisible} />
              <FormCategory setModalVisible={setModalVisible} modalVisible={modalVisible}/>
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

