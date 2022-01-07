import React, { useState, useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,View,Dimensions, StyleSheet, SectionList, StatusBar, TouchableOpacity} from 'react-native';
//import TabSelectorAnimation from 'react-native-tab-selector'
import {getAllOperationsTiers, getBalanceByTiers } from "../databases/operationModel"
import { getSectionListDataStructure } from '../utils';
import EmptySectionList from './EmptySectionList';
import { CATEGORY_DETTE, CATEGORY_PRET } from '../databases/categoryModel';
import { ListItem, Icon } from 'react-native-elements';
/*const DATA = [
  {
    title: " Les dettes : 45000",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: " les prêts",
    data: ["French Fries", "Onion Rings", "Fried Shrimps", "Onion Rings", "Fried Shrimps"]
  }
];*/

//const DATA_TAB = [{ title: 'Tous' }, { title: 'semaine' }, { title: 'mois' }]

function Tiers({type_debt}) {

  const [dettesExpand, setDettesExpand] = useState(true)
  const [pretsExpand, setPretsExpand] = useState(true)

  const [dataDettes, setDataDettes] = useState([])
  const [dataPrets, setDataPrets] = useState([])


  useLayoutEffect(() => {

   


    getBalanceByTiers(CATEGORY_DETTE, (dettes)=>{
      
      setDataDettes(dettes)
    })

    getBalanceByTiers(CATEGORY_PRET, (prets)=>{
      
        setDataPrets(prets)
    })
   
    
    return () => {
    }
  }, [type_debt,pretsExpand, dettesExpand])

  //const [indexTab, setIndexTab] = useState(0)

  const Item = ({ title }) => (
    <View style={styles.item}>
      
      <TouchableOpacity
        
        onPress={()=>alert('afficher un model scrollable pour le listing')}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, marginTop :5 }}>

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
        <ListItem.Accordion
                content={
                  <>
                    {/**<Icon name="event" size={30}  /> */}
                    <ListItem.Content>
                      <ListItem.Title>Dettes</ListItem.Title>
                    </ListItem.Content>
                  </>
                }
                isExpanded={dettesExpand}
                onPress={() => {
                  getBalanceByTiers(CATEGORY_DETTE, (dettes)=>{
      
                    setDataDettes(dettes)
                  })
                  setDettesExpand(!dettesExpand);
                }}
              >
                {
                  <>
                    
                    {
                    dataDettes.map(element=>(
                      <ListItem key={element.tiers}  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                          <ListItem.Title>{element.tiers}</ListItem.Title>
                          <ListItem.Subtitle>{ element.solde }</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    ))
                   } 

                    
                   
                  </>
                }
        </ListItem.Accordion>
        


        <ListItem.Accordion
                content={
                  <>
                    {/**<Icon name="arrow-back" size={30}  /> */}
                    <ListItem.Content>
                      <ListItem.Title>Prêts</ListItem.Title>
                    </ListItem.Content>
                  </>
                }
                isExpanded={pretsExpand}
                onPress={() => {

                  
                  getBalanceByTiers(CATEGORY_PRET, (prets)=>{
      
                    setDataPrets(prets)
                  })
               
                  setPretsExpand(!pretsExpand);
                }}
              >
                {
                  <>
                    {
                      dataPrets.map(element=>(
                        <ListItem key={element.tiers}  onPress={()=>("")} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{element.tiers}</ListItem.Title>
                            <ListItem.Subtitle>{ element.solde }</ListItem.Subtitle>
                          </ListItem.Content>
                        </ListItem>
                      ))
                    }

                   
                  </>
                }
        </ListItem.Accordion>
    </SafeAreaView>
  );
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
    fontSize: 20,
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

export default Tiers;