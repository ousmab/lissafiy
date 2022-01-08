import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Alert, Modal,StyleSheet, TouchableOpacity, ScrollView,Dimensions, TextInput, Text, View} from 'react-native';
import { SpeedDial ,Button , ListItem } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { Icon } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector'

import { ToastAndroid, Platform } from 'react-native';
import moment from 'moment';

import {
  LineChart
} from "react-native-chart-kit";
import { CATEGORY_OUT, CATEGORY_IN, getAllCategoryByType  } from '../databases/categoryModel';
import {insertOperation , getAllLastNdaysOperations, getSumInOrOout, getTiersBalance } from '../databases/operationModel'
import { getDatasets } from '../utils';




function Activite({setOperation_dates}) {

 
  
    const [modalVisible, setModalVisible] = useState(false)
    const [openSpeed, setOpenSpeed] = useState(false);
    const [bgColor, setBgColor] = useState("#f2f4f5")
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [recetteExpanded, setRecetteExpanded] = useState(false)
    const [depenseExpand, setDepenseExpandExpanded] = useState(false)
    const [tiersExpand, setTiersExpand] = useState(false)
    
    // les champs à enregistrer en BD
      // 1 TYPE D'OPERATION 
      // 1 DATE
      // MONTANT
      // LABEL
      // TIERS SI CATEGORY EST TIERS
      const [date, setDate] = useState(new Date())
      const [operation_type, setOperation_type] = useState()
      const [category_to_select, setCategory_to_select] = useState()
      const [category_selected, setCategory_selected] = useState(null)
      const [tiers_operation, setTiers_operation] = useState(null) //est une dette ou une creance
      const [onChangeMontant, setonChangeMontant] = useState()
      const [onChangeNature, setonChangeNature] = useState()
      const [onChangeTiers, setonChangeTiers] = useState()
      const [displayingDataChart, setDisplayingDataChart] = useState()
      
      const [recetteJour, setRecetteJour] = useState(0)
      const [recetteSemaine, setRecetteSemaine] = useState(0)
      const [recetteMois, setRecetteMois] = useState(0)
      const [recetteTout, setRecetteTout] = useState(0)



      const [depenseJour, setDepenseJour] = useState(0)
      const [depenseSemaine, setDepenseSemaine] = useState(0)
      const [depenseMois, setDepenseMois] = useState(0)
      const [depenseTout, setDepenseTout] = useState(0)
      const [soldeDette, setSoldeDette] = useState()
      const [soldePret, setSoldePret] = useState()
     
      const init_values_graph = {
        'label':['0j','1j','2j','3j','4j','5j','6j'].reverse(),
        'data':[0,0,0,0,0,0,0]
      }
      useEffect(() => {
        //LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
      

        getTiersBalance(CATEGORY_OUT, (result)=>{
          setSoldePret(result)
          console.log("prets ", result)
        })

        getTiersBalance(CATEGORY_IN, (result)=>{
          setSoldeDette(result)
          console.log("dettes ", result)
        })
        
        getAllLastNdaysOperations(7,(operations, days_arry)=>{
            setDisplayingDataChart(getDatasets(operations, days_arry.reverse()))
        })

       // criteria = 'day' , 'week' ,'month' ,'all'
        getSumInOrOout(CATEGORY_IN,"day", (somme)=>{
            setRecetteJour(somme)  
        })
        getSumInOrOout(CATEGORY_IN,"week", (somme)=>{
          setRecetteSemaine(somme)  
        })
        getSumInOrOout(CATEGORY_IN,"month", (somme)=>{
          setRecetteMois(somme)  
        })
        getSumInOrOout(CATEGORY_IN,"all", (somme)=>{
          setRecetteTout(somme)  
        })

        //
      getSumInOrOout(CATEGORY_OUT,"day", (somme)=>{
          setDepenseJour(somme)  
      })
      getSumInOrOout(CATEGORY_OUT,"week", (somme)=>{
        setDepenseSemaine(somme)  
      })
      getSumInOrOout(CATEGORY_OUT,"month", (somme)=>{
        setDepenseMois(somme)  
      })
      getSumInOrOout(CATEGORY_OUT,"all", (somme)=>{
        setDepenseTout(somme)  
      })
       
      
     

        console.log("montant : ",onChangeMontant,"nature : ",onChangeNature,"tiers : ",onChangeTiers, "oT>",tiers_operation)
        
        console.log(category_selected,"bravo")

        
        if(tiers_operation != null){
          if(category_selected !=null && onChangeMontant != "" && onChangeNature !="" && onChangeTiers != ""  ){
            setBtnDisabled(false)
          }else{
            setBtnDisabled(true)
          }
        }else{
          if(category_selected !=null && onChangeMontant != "" && onChangeNature !=""  ){
            setBtnDisabled(false)
          }else{
            setBtnDisabled(true)
          }
        }

        return () => {
          
        }
      }, [onChangeMontant,
          onChangeNature,
          onChangeTiers,
          category_selected,
          tiers_operation,
          operation_type 
          //displayingDataChart
        ])

    const Item = ({ title }) => (
      <View style={styles.item}>
         <TouchableOpacity
          onPress={()=>alert('afficher un modal pour modifier la selection')}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        
      </View>
    );
  
    
    

    return (
      
    <SafeAreaView 
    
    style={{ flex: 1, backgroundColor :bgColor}}>
    
   

      {/**
       * 
       */}
    <ScrollView > 
        <Text style={{ fontSize:25, color :"#a2a5a6", margin :10 }}>Evolution des flux</Text>
      
            
             
           <LineChart
              data={{
                labels:displayingDataChart ? displayingDataChart['dates'].map(date=>moment(date).format('ddd')) : init_values_graph['label'] ,
                legend: ["sorties","entrées"] ,// optional, 
                datasets: [
                  {
                    data: displayingDataChart ? displayingDataChart['out']: init_values_graph['data'] ,
                    color: (opacity = 1) => `rgba(184, 7, 48)`
                  },
                  {
                    data:displayingDataChart ? displayingDataChart['in']: init_values_graph['data'] ,
                    color: (opacity = 1) => `rgba(7, 184, 48)`
                  }
                ]
              }}
              width={Dimensions.get("window").width} // from react-native
              fromZero={true}
              height={200}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#ededed",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: () => `rgba(50, 51, 51)`,
                labelColor: () => `rgba(50, 51, 51)`,
                style: {
                  borderRadius: 0,
                 
                 
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#ccc"
                }
              }}
              bezier
              style={{
                marginVertical: 0,
                borderRadius: 0,
                
                
              }}
            />
            
     
     <Text style={{ fontSize:25, color :"#a2a5a6", margin :10 }}>Résumé Financière</Text>
        <View style={{ backgroundColor:"#fff", marginRight:10, marginLeft:10, marginTop :10 }}>
              
              <ListItem.Accordion
                content={
                  <>
                    <Icon name="arrow-back" size={30}  />
                    <ListItem.Content>
                      <ListItem.Title>Détails Dépenses</ListItem.Title>
                    </ListItem.Content>
                  </>
                }
                isExpanded={depenseExpand}
                onPress={() => {
                  setDepenseExpandExpanded(!depenseExpand);
                }}
              >
                {
                  <>
                    <ListItem  onPress={()=>("")} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{"Aujourd'hui"}</ListItem.Title>
                        <ListItem.Subtitle>{ depenseJour }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>

                    <ListItem  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{"semaine en cours"}</ListItem.Title>
                        <ListItem.Subtitle>{ depenseSemaine }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{"Mois en cours"}</ListItem.Title>
                        <ListItem.Subtitle>{ depenseMois }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{"Toutes"}</ListItem.Title>
                        <ListItem.Subtitle>{ depenseTout }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </>
                }
              </ListItem.Accordion>

              <ListItem.Accordion
                content={
                  <>
                    <Icon name="note-add" size={30}   />
                    <ListItem.Content>
                      <ListItem.Title>Détails recettes</ListItem.Title>
                    </ListItem.Content>
                  </>
                }
                isExpanded={recetteExpanded}
                onPress={() => {
                  setRecetteExpanded(!recetteExpanded);
                }}
              >
                {
                  <>
                    <ListItem  onPress={()=>("")} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{"Aujourd'hui"}</ListItem.Title>
                        <ListItem.Subtitle>{ recetteJour }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>

                    <ListItem  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{"semaine en cours"}</ListItem.Title>
                        <ListItem.Subtitle>{ recetteSemaine }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{"Mois en cours"}</ListItem.Title>
                        <ListItem.Subtitle>{ recetteMois }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{"Toutes"}</ListItem.Title>
                        <ListItem.Subtitle>{ recetteTout }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </>
                }
              </ListItem.Accordion>

              <ListItem.Accordion
                style={{marginTop:10}}
                content={
                  <>
                    <Icon name="people-alt"  size={30} />
                    <ListItem.Content>
                      <ListItem.Title>Etats dettes / prêts</ListItem.Title>
                    </ListItem.Content>
                  </>
                }
                isExpanded={tiersExpand}
                onPress={() => {
                  setTiersExpand(!tiersExpand);
                }}
              >
                {
                  <>
                    <ListItem  onPress={()=>("")} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{"soldes dettes"}</ListItem.Title>
                        <ListItem.Subtitle>{ soldeDette }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>

                    <ListItem  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{"solde prêts"}</ListItem.Title>
                        <ListItem.Subtitle>{ soldePret }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                   
                   
                  </>
                }
              </ListItem.Accordion>
        </View>
        {/*<Text style={{ fontSize:25, color :"#a2a5a6", margin :10 }}>Etat par catégorie</Text> 
              
              <ListItem.Accordion
                content={
                  <>
                    <Icon name="arrow-back" size={30}  />
                    <ListItem.Content>
                      <ListItem.Title>Détails catégories</ListItem.Title>
                    </ListItem.Content>
                  </>
                }
                isExpanded={depenseExpand}
                onPress={() => {
                  setDepenseExpandExpanded(!depenseExpand);
                }}
              >
                {
                  <>
                    <ListItem  onPress={()=>("")} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{"Aujourd'hui"}</ListItem.Title>
                        <ListItem.Subtitle>{ depenseJour }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>

                    <ListItem  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{"semaine en cours"}</ListItem.Title>
                        <ListItem.Subtitle>{ depenseSemaine }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{"Mois en cours"}</ListItem.Title>
                        <ListItem.Subtitle>{ depenseMois }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                    <ListItem  onPress={()=>("")} bottomDivider>
                      <ListItem.Content>
                        <ListItem.Title>{"Toutes"}</ListItem.Title>
                        <ListItem.Subtitle>{ depenseTout }</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  </>
                }
              </ListItem.Accordion>*/}

    </ScrollView>

    
   


    <View style={{ flex: 6,alignItems: 'center' }} >
    
    <Modal
      
      style={{flex:1, alignItems:'center',justifyContent: 'center'}}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >

          <View style={{ flex: 1,alignItems:'center' , justifyContent: 'center', marginTop:30}} >
          <DatePicker
              
              style={{width: 300, marginTop:30}}
              date={date}
              mode="date"
              placeholder="Choisir une date"
              format="MMMM Do YYYY"
              iconComponent={<Icon name="calendar" type='font-awesome' />}
              
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                  
                },
                dateInput: {
                  
                  borderRadius:5
                }
               
              }}
              onDateChange={(date) => {setDate(date)}}
            />

            
            
            <ModalSelector
              
             style={{marginTop:20, width:300}}
              data={category_to_select}
             
              keyExtractor= {item => item.id}
              labelExtractor= {item => item.categorie} 
              initValue= {operation_type==CATEGORY_OUT ? "catégorie Sortie" : "catégorie d'entrée" }
              supportedOrientations={['landscape']}
              cancelText="Annuler"
              overlayStyle={{ flex: 1, padding: '5%', justifyContent: 'center', backgroundColor: "#fff" }}
              onChange={
                (option)=>{  
                    
                  setTiers_operation(null)
                    
                    if (option.id){
                      console.log("object", option.id)
                      setCategory_selected(option.id)
                    }
                    if (option.type_tiers){
                      setTiers_operation(option.type_tiers)
                    }
                }
              }
          />
           

          </View>

          <View style={{ justifyContent:'center', alignItems:'center', marginTop:20}} >
          <ScrollView style={{width : 300 }}>
             
            <TextInput
                highlightColor={'#00BCD4'}
                style={styles.input}
                onChangeText={setonChangeMontant}
                value={onChangeMontant}
                placeholder="Montant"
                keyboardType="numeric"
              />

            <TextInput 
              style={styles.input}
              highlightColor={'#00BCD4'}
              placeholder={'Nature'} 
              highlightColor={'#00BCD4'}
              onChangeText={setonChangeNature}
              value={onChangeNature}
             /> 
            {
               tiers_operation != null && (
                  <TextInput 
                  style={styles.input}
                  placeholder={'Tiers'} 
                  highlightColor={'#00BCD4'}
                  onChangeText={setonChangeTiers}
                  value={onChangeTiers}
                /> 
               ) 
            }
          </ScrollView>
         
          
          </View>
              
         <View style={{flex:1,justifyContent:'center', alignItems:'center', marginTop:20}}>
            
              

            <Button
              disabled={btnDisabled}
              title="Enregistrer"
              buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
              containerStyle={{
                width: 200,
                marginVertical: 10,
                
              }}
              titleStyle={{ color: 'white', marginHorizontal: 20 }}
              onPress={()=>{
               
                // on converti la date 
                // et on voi si cest une entre ou une sortie pour le coté (entre ou sortie amount)
                let date_convert = String(moment(date, 'MMMM Do YYYY').format('YYYY-MM-DD'));
                let montant_entree = operation_type == CATEGORY_IN ? onChangeMontant : 0
                let monant_sortie = operation_type == CATEGORY_OUT ? onChangeMontant: 0
                let tiers = onChangeTiers != null ? onChangeTiers.trim().toLowerCase() : null
                let to_insert = [date_convert,
                                category_selected, 
                                onChangeNature.trim(), 
                                montant_entree, 
                                monant_sortie, 
                                tiers ]
                
                insertOperation(to_insert, (result)=>{
                  if(result){
                     // aficher un toast
                     

                      if(Platform.OS=='android'){
                        ToastAndroid.showWithGravity("Enregistrement reussi !",
                        ToastAndroid.LONG,
                        ToastAndroid.TOP);
                      }else{
                        Alert.alert("Succès", "Enregistrement reussi")
                      }

                      setonChangeMontant("")
                      setonChangeNature("")
                      setonChangeTiers("")

                      // mise a jour de l'historique et des tiers
                    

                  }else{
                   Alert.alert("Echec","echec d'enregistrement !")
                  }
                })
               
              } }
            />

              <Button
                  onPress={()=>{
                    setDate(new Date())
                    setModalVisible(!modalVisible)
                    setonChangeMontant("")
                    setonChangeNature("")
                    setonChangeTiers(null)
                    setOperation_type(null)
                  } }
                  containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                  }}
                  title="terminer"
                  type="clear"
                  titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
                />
         </View>

          
          
    </Modal>
   
    
    
   
    </View>

    
    <SpeedDial
          title={""}
          transitionDuration={10}
          isOpen={openSpeed}
          icon={{ name: 'edit', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={() => setOpenSpeed(!openSpeed)}
          onClose={() => setOpenSpeed(!openSpeed)}
          color='black'
        >
          <SpeedDial.Action
          useNativeDriver={true}
            icon={{ name: 'remove', color: '#fff' }}
            title="saisir les sorties"
            onPress={() => {
                setOpenSpeed(false)
                setCategory_selected(null)
                setTiers_operation(null)
                setModalVisible(true)
                setOperation_type(CATEGORY_OUT)
                getAllCategoryByType(CATEGORY_OUT,setCategory_to_select)
              }
            }
            color='#b80730'
          />
          <SpeedDial.Action
            
            icon={{ name: 'add', color: '#fff' }}
            title="saisir les entrées"
            onPress={() => {
              setOpenSpeed(false)
              setCategory_selected(null)
              setTiers_operation(null)
              setModalVisible(true)
              setOperation_type(CATEGORY_IN)
              getAllCategoryByType(CATEGORY_IN,setCategory_to_select)
              }
            }
            color='#32a65c'
          />
      </SpeedDial>
      
          </SafeAreaView>
      
    );
  }

  const styles = StyleSheet.create({
    input: {
      height: 50,
      marginBottom:20,
      borderRadius:5,
      borderWidth: 1,
      padding: 10,
      borderColor:"#696969"
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#ccc",
    },
    buttonClose: {
      backgroundColor: "red",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    item: {
      borderBottomWidth:1,
      borderBottomColor:"#ccc",
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 0,
      marginHorizontal: 0,
      elevation:1,
      width : Dimensions.get('window').width-5
    },
    header: {
      fontSize: 25,
      height:50,
      paddingVertical:10,
      color:"#a2a5a6",
      backgroundColor: "#f2f4f5"
    },
    title: {
      fontSize: 12,
      color: '#4e4f4f'
    },
  });


  export default Activite;