import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert, PermissionsAndroid, Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';


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

  const onShare = async (url) => {
   
    try {
      const result = await Share.share({
        title: "Lissafiy",
        message: "Sauvegarde des données financières",
        url: url,
        subject: "sauvegarde",
    });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
          Alert.alert('reussi','votre sauvegarde a été effectué avec succès !')

        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert("Erreur ",error.message);
    }
  };

  const requestFileSystem = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permission",
          message:
            "Afin d'exporter la base des données, Lissafiy " +
            "a besoin de permission d'accès au système de fichier.",
          buttonNeutral: "plus tard",
          buttonNegative: "Refuser",
          buttonPositive: "Accepter"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        let file_name = 'Lissafiy_saved.xlsx'
        var data = [{
          "name": "John",
          "city": "Seattle"
        },
        {
          "name": "Mike",
          "city": "Los Angeles"
        },
        {
          "name": "Zach",
          "city": "New York"
        }
      ];
      var ws = XLSX.utils.json_to_sheet(data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Cities");
      const wbout = XLSX.write(wb, {
        type: 'base64',
        bookType: "xlsx"
      });
      const uri = FileSystem.cacheDirectory + file_name;
      //console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);

      await onShare(uri)

     
     /* try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        const album = await MediaLibrary.getAlbumAsync('Download');
        
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
      } catch (e) {
        console.log("erreur ", e)
      }*/


      } else {
        Alert.alert("echec sauvegarde",
        'la sauvegarde n\'a pas pu s\'effectuer veuiller authoriser la permission')
      }
    } catch (err) {
      console.warn(err);
    }
  };


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
              <Menu permissionFs={requestFileSystem} toggle={toggleOverlay}  visible={visible} setModalVisible={setModalVisible} />
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

