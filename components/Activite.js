import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Alert, Modal,StyleSheet,SectionList, TouchableOpacity, ScrollView,Dimensions, TextInput,Pressable, Text, View} from 'react-native';
import { SpeedDial ,Input,Button ,Card} from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { Icon } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector'
import TextField from 'rn-md-textinput';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


function Activite() {

    const [date, setDate] = useState(new Date())
    const [modalVisible, setModalVisible] = useState(false)
    const [open, setOpen] = useState(false);
    const [bgColor, setBgColor] = useState("#f2f4f5")
    const [number, setNumber] = useState(1);
    const DATA = [
      {
        title: " détails entrées",
        data: ["jour", "semaine", "mois","toutes"]
      }
    ];
    
    const DATA2 = [
      {
        title: " détails des dettes",
        data: ["jour", "semaine", "mois","toutes"]
      }
    ];
    const DATA3 = [
      {
        title: " détails des sorties",
        data: ["jour", "semaine", "mois","toutes"]
      }
    ];

    const DATA4 = [
      {
        title: " détails des prêts",
        data: ["jour", "semaine", "mois","tous"]
      }]

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
          <Text style={{ fontSize:25, color :"#a2a5a6", margin :20 }}>Evolution des flux</Text>
        
              <LineChart
                data={{
                  labels: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.","dim."],
                  legend: ["sorties","entrées"] ,// optional,
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ],
                      color: (opacity = 1) => `rgba(184, 7, 48)`
                    },
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ],
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
           
          <View style={{ backgroundColor:"#fff", marginRight:10, marginLeft:10 }}>
            <SectionList
              style={{ marginTop:20}}
              sections={DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <Item title={item} />}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
          </View>
           
          <View style={{ backgroundColor:"#fff"}}>
            <SectionList
                style={{ marginTop:20}}
                sections={DATA2}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.header}>{title}</Text>
                )}
              />
          </View>

          
          <View style={{ backgroundColor:"#fff"}}>
            <SectionList
                style={{ marginTop:20}}
                sections={DATA3}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.header}>{title}</Text>
                )}
              />
          </View>

          
          <View style={{ backgroundColor:"#fff" }}>
            <SectionList
                style={{ marginTop:20}}
                sections={DATA4}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.header}>{title}</Text>
                )}
              />
          </View>
         
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
                data={[
                  { id: 1, name: 'Alimentaire' },
                  { id: 2, name: 'Transport' },
                  { id: 3, name: 'Logement' }
                ]}
               
                keyExtractor= {item => item.id}
                labelExtractor= {item => item.name} 
                initValue="catégorie Sortie"
                supportedOrientations={['landscape']}
                cancelText="Annuler"
                overlayStyle={{ flex: 1, padding: '5%', justifyContent: 'center', backgroundColor: "#fff" }}
                
            />
             

            </View>

            <View style={{ justifyContent:'center', alignItems:'center', marginTop:20}} >
            <ScrollView style={{width : 300 }}>
              <TextField 
                label={'Montant'} 
                highlightColor={'#00BCD4'}
                keyboardType={'numeric'} /> 
                
              <TextField 
                label={'Nature'} 
                highlightColor={'#00BCD4'}
               /> 
               <TextField 
                label={'Tiers'} 
                highlightColor={'#00BCD4'}
               /> 
            </ScrollView>
           
            
            </View>
                
           <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
              
                

              <Button
                title="Enregistrer"
                buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 50,
                  marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
              />

                <Button
                    onPress={()=>setModalVisible(!modalVisible) }
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
            
            isOpen={open}
            icon={{ name: 'edit', color: '#fff' }}
            openIcon={{ name: 'close', color: '#fff' }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
            color='black'
          >
            <SpeedDial.Action
              icon={{ name: 'remove', color: '#fff' }}
              title="saisir les sorties"
              onPress={() => setModalVisible(true)}
              color='#b80730'
            />
            <SpeedDial.Action
              icon={{ name: 'add', color: '#fff' }}
              title="saisir les entrées"
              onPress={() => setModalVisible(true)}
              color='#32a65c'
            />
        </SpeedDial>
        
    </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
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