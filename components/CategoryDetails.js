import React, { useState, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,View,Dimensions, StyleSheet, SectionList, StatusBar, TouchableOpacity} from 'react-native';
//import TabSelectorAnimation from 'react-native-tab-selector'
import {getAllOperationsTiers } from "../databases/dbConnexion"
import EmptySectionList from './EmptySectionList';
import { getSectionListDataStructure } from '../utils';

export default function CategoryDetails() {


    const [data, setData] = useState()

    useLayoutEffect(() => {

      
           
          
        return () => {
            
        };
    }, [])
    

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <View style={styles.tab_container}>

         {
          /*
          SELCTION TOUT SEMAINE ET MOIS
          ----------------------------
          <TabSelectorAnimation
              onChangeTab={setIndexTab}
              style={styles.tabSelector}
              tabs={DATA_TAB}
          />
          <Text style={styles.text}>{`Current tab is ${indexTab + 1}`}</Text>*/}

        </View>
        <SectionList
          sections={data}
          keyExtractor={item => item.id.toString() }
          renderItem={
            ({item})=>(
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={()=>alert('afficher un modal pour modifier la selection')}
                >
                    <Text style={styles.title}>{item.label}</Text>
                </TouchableOpacity>
                
              </View>
            )
          }
          renderSectionHeader={({section})=>{
            return  <Text style={styles.header}>{section.title }</Text>
          }}
          ListEmptyComponent={<EmptySectionList />}
          stickySectionHeadersEnabled

        />

    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#fff",
      padding: 20,
      marginVertical: 1,
      width : Dimensions.get('window').width-5
    },
      header: {
        fontSize: 20,
        height:50,
        paddingVertical:10,
        color:"#a2a5a6",
        backgroundColor: "#f2f4f5"
      },
    title: {
      fontSize: 18,
      color: '#4e4f4f'
    },
    tab_container: {
      
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:"#fff"
    },
    tabSelector: {
      marginHorizontal: 5,
    },
    text: {
      fontSize:30 ,
      marginTop: 20,
      marginBottom:30
    }
  });
  