import React, {useState, useEffect} from 'react'
import {Platform, ToastAndroid, Alert, Text, Modal, ScrollView, TextInput, View, StyleSheet, Dimensions} from 'react-native';
import { Button, CheckBox } from "react-native-elements"
import { CATEGORY_DETTE, CATEGORY_IN, CATEGORY_OUT, CATEGORY_PRET, insertCategory } from '../databases/categoryModel';

export default function FormCategory({setModalVisible, modalVisible}) {

    const [checkIn, setCheckIn] = useState(false);
    const [checkOut, setCheckOut] = useState(false);
    const [checkDebt, setCheckDebt] = useState(false);
    const [checkClaim, setCheckClaim] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [onchangeCategorieInput, setOnchangeCategorieInput] = useState()

    useEffect(() => {
      
      if(onchangeCategorieInput != "" && ( checkIn || checkOut) ){
        setBtnDisabled(false)
      }else{
        setBtnDisabled(true)
      }
      return () => {
       
      }
    }, [modalVisible,onchangeCategorieInput, checkIn, checkOut, checkClaim, checkDebt])

    return (
        <Modal
      
        style={{flex:1, alignItems:'center',justifyContent: 'center'}}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
       >
  
            <View style={{ flex: 1,alignItems:'center' , justifyContent: 'center'}} >
                <Text style={{fontWeight:'bold', fontSize:17, color:"#787878", marginBottom:10, width : Dimensions.get('window').width-50 }}>
                  Avec Lissafiy vous pouvez catégoriser vos postes des dépenses et de recettes
                  </Text>

                <Text style={{fontWeight:'bold',fontStyle :'italic', fontSize:13, color:"#787878",width : Dimensions.get('window').width-50  }}>
                   Exemple : Transport, Alimentaires, vêtements, Salaires etc..</Text>
            </View>
  
            <View style={{ justifyContent:'center', alignItems:'center'}} >
            <ScrollView style={{width : 300 }}>
               
              <TextInput
                  highlightColor={'#00BCD4'}
                  style={styles.input}
                  onChangeText={setOnchangeCategorieInput }
                  value={onchangeCategorieInput}
                  placeholder="Nom de la catégorie"
                  
                />

           
            
              
            <View style={{ flexDirection:'row', justifyContent:'center'}}>
                <View style={{   }}>
                  <CheckBox
                      title="sorties"
                      checked={checkOut}
                      onPress={() => {
                        setCheckOut(true)
                        setCheckIn(false)
                      }}
                      textStyle={{fontSize :12, color:"red" }}
                      containerStyle={{
                        width:135
                      }}
                      />
                </View>
                <View style={{   }}>
                    <CheckBox
                    
                    title="entrées"
                    checked={checkIn}
                    onPress={() => {
                     
                        setCheckOut(false)
                        setCheckIn(true)
                    }}
                    textStyle={{fontSize :12, color:"green" }}
                    containerStyle={{
                      width:135
                    }}
                  />
                </View>
            </View>
            <View style={{ flexDirection:'row', justifyContent:'center'}}>
                <View style={{   }}>
                  <CheckBox
                      title="prêts"
                      checked={checkClaim}
                      onPress={() =>{
                        setCheckClaim(!checkClaim)
                        setCheckDebt(checkClaim && false)
                      }}
                      textStyle={{fontSize :12 }}
                      containerStyle={{
                        width:135
                      }}
                      />
                </View>
                <View style={{   }}>
                    <CheckBox
                    
                    title="emprunts"
                    checked={checkDebt}
                    onPress={() => {
                      setCheckDebt(!checkDebt)
                      setCheckClaim(checkDebt && false)
                    }
                    
                    }
                    textStyle={{fontSize :12 }}
                    containerStyle={{
                      width:135
                    }}
                  />
                </View>
            </View>
            </ScrollView>
           
            
            </View>
                
           <View style={{flex:1,justifyContent:'center', alignItems:'center', marginTop:5}}>
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
                    
                    //[name, category_type,type_debt]
                    let category_type = checkIn ? CATEGORY_IN : CATEGORY_OUT
                    let type_debt = null
                    if (checkClaim){
                      type_debt = CATEGORY_PRET
                    }

                    if(checkDebt){
                      type_debt = CATEGORY_DETTE
                    }

                    let to_insert = [onchangeCategorieInput, category_type, type_debt]
                    
                    insertCategory(to_insert,(result)=>{
                      if(result){

                        if(Platform.OS=='android'){
                          ToastAndroid.showWithGravity(`${onchangeCategorieInput} enregistré avec succès !`,
                          ToastAndroid.LONG,
                          ToastAndroid.TOP);
                        }else{
                          Alert.alert("Succès", "Enregistrement reussi")
                        }

                        setOnchangeCategorieInput('')
                        setCheckClaim(false)
                        setCheckDebt(false)
                        setCheckIn(false)
                        setCheckOut(false)
  
                      }else{
                        Alert.alert("Echec",`echec d'enregistrement ! ${onchangeCategorieInput} semble déjà existé dans vos catégories !`)
                      }
                    })
                  }}
    
              />
  
                <Button
                    onPress={()=>{
                      setModalVisible(false)
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
     
    )
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