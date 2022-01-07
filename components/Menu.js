
import React,{useState} from 'react'
import {Dimensions, StyleSheet} from "react-native"
import { Button, Overlay,Icon   } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


export default function Menu({toggle,visible,setModalVisible,permissionFs}) {

    const navigation = useNavigation();

    return (
        <Overlay 
            isVisible={visible} 
            onBackdropPress={toggle}
            overlayStyle={{
                width:Dimensions.get('window').width-50,

            }}
        >
                <Button
                    onPress={()=>{
                        setModalVisible(true)
                        toggle(false)
                    } }
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 35,
                        marginVertical: 10,
                    }}
                    title="Créer une catégorie"
                    type="clear"
                    titleStyle={{ color: '#5a5d63' }}    
                    icon={<Icon name="add" size={30} />}
                />

                {/*<Button
                    onPress={()=>{
                        navigation.navigate('CategoryDetails')
                        toggle(false)
                    } }
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 40,
                        marginVertical: 10,
                    }}
                    title="détail des catégories"
                    type="clear"
                    titleStyle={{ color: '#5a5d63' }}
                    
                    icon={<Icon name="list" size={30} />}
                />*/}

                <Button
                    onPress={()=>{
                        permissionFs();
                        toggle(false)
                    } }
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 45,
                        marginVertical: 10,
                    }}
                    title="Exporter Les données"
                    type="clear"
                    titleStyle={{ color: '#5a5d63' }}
                    
                    icon={<Icon name="save" size={30} />}
                />

                <Button
                    onPress={()=>{
                        navigation.navigate('About')
                        toggle(false)
                    } }
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 40,
                        marginVertical: 10,
                    }}
                    title="A propos"
                    type="light"
                    titleStyle={{ color: '#5a5d63', fontSize:12 }}

                />
                
        </Overlay>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    }
  });