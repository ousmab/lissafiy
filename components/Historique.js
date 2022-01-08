import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, FlatList,SectionList,TouchableOpacity ,StyleSheet, StatusBar, Dimensions} from 'react-native';
import TabSelectorAnimation from 'react-native-tab-selector'
import { CheckBox} from 'react-native-elements';
import { getAllOperations, getAllDays,getAllOperationsByDate } from '../databases/operationModel'
import { getSectionListDataStructure } from '../utils';


import EmptySectionList from './EmptySectionList';
import { CATEGORY_IN } from '../databases/categoryModel';


function Historique({dates}) {
 

  const [data, setData] = useState([])
  

  

  useEffect(() => {


    
    /*insertCategory(["Emprunts", CATEGORY_IN, CATEGORY_DETTE],(result)=>{

        console.log("categorie",result)
    })
   
    getAllOperationsByDate("2022-01-03",(operations)=>{
      console.log("opxxx", operations)
    })*/
    /*
    getAllOperations((operations)=>{
      console.log("historique,", operations)
    })*/

  console.log("sss ",data)    

    if(dates){


      getAllOperations((data)=>{

        let structured_data = getSectionListDataStructure('date',dates,data)
        setData(structured_data)
      })

    }else{ 

      // aficher une chargeur loading...
    }

   
    
    /**
     * {
     *    "date operation",
     *    [
     *  {'id','label','categorie','montant'},{}   
     * ]
     * }
     * 
     */

    return () => {
      
    }
  }, [dates])

  //const [indexTab, setIndexTab] = useState(0)
  //const DATA_TAB = [{ title: 'Tous' }, { title: 'semaine' }, { title: 'mois' }]
 
  //const [check1, setCheck1] = useState(false);
  //const [check2, setCheck2] = useState(false);
 




  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <View style={styles.tab_container}>
          {/*
          * SELECTION DES TOUTS MOIS SEMAINE
          ----------------------------------
          <TabSelectorAnimation
            onChangeTab={setIndexTab}
            style={styles.tabSelector}
            tabs={DATA_TAB}
          />*/}
          
            

          <View style={{ flexDirection:'row', alignItems:'flex-start', justifyContent:'center' }}>
         
         {/*
          <CheckBox
                SELECTION DES ENTREE OU DES SORTIES
                 ----------------------------------
                title="sorties"
                checked={check1}
                onPress={() => setCheck1(!check1)}
                textStyle={{fontSize :12, color:"red" }}
                containerStyle={{flex : 1}}
              />
            <CheckBox
                
                title="entrées"
                checked={check2}
                onPress={() => setCheck2(!check2)}
                textStyle={{fontSize :12, color:"green" }}
                containerStyle={{flex : 1}}
              />
         
         
         */}
          </View>
          
        </View>

        <SectionList
          sections={data}
          keyExtractor={item => item.id.toString() }
          renderItem={
            ({item})=>(
              <View style={styles.item}>
                <TouchableOpacity
                  onPress={()=>('afficher un modal pour modifier la selection')}
                >
                    <Text style={ styles.title }>{item.label}</Text>
                    <Text style={styles.amount,{color:item.category_type== CATEGORY_IN ? '#10c25d' :'#c21810'} }>{item.category_type == CATEGORY_IN ? item.in_amount : item.out_amount }</Text>
                    <Text style={ {alignSelf:"flex-end", color:"#ccc"} }>{item.categorie}</Text>
                </TouchableOpacity>
                
              </View>
            )
          }
          renderSectionHeader={({section})=>{
            return   (
              <Text style={styles.header}>{section.title} (
                <Text style={{ fontSize:15, color :"red", alignSelf:"flex-end" }} >  5000</Text> 
                <Text style={{ fontSize:15, color :"green", alignSelf:"flex-end" }} > --   5000</Text> )
              </Text>
  
            )
            }}
          ListEmptyComponent={<EmptySectionList />}
          stickySectionHeadersEnabled

        />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  amount:{
    fontSize:15,
    fontWeight:"bold",
    
    marginTop:5,
    alignSelf:'flex-end'
  },
  item: {
    
    borderBottomColor:"#ccc",
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 1,
    marginHorizontal: 0,
    elevation:0,
    width : Dimensions.get('window').width-5
  },
    header: {
      fontSize: 18,
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

export default Historique;


