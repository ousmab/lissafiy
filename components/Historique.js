import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, FlatList,SectionList,TouchableOpacity ,StyleSheet, StatusBar, Dimensions} from 'react-native';
import TabSelectorAnimation from 'react-native-tab-selector'
import { CheckBox} from 'react-native-elements';


function Historique() {

  const [indexTab, setIndexTab] = useState(0)
  const DATA_TAB = [{ title: 'Tous' }, { title: 'semaine' }, { title: 'mois' }]
 
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const DATA = [
    {
      title: " Lundi : 25/12/2021",
      data: ["Pizza", "Burger", "Risotto"]
    },
    {
      title: " Mardi : 26/12/2021",
      data: ["French Fries", "Onion Rings", "Fried Shrimps", "Onion Rings", "Fried Shrimps"]
    }
  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
       <TouchableOpacity
        onPress={()=>alert('afficher un modal pour modifier la selection')}
      >
          <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <View style={styles.tab_container}>
          <TabSelectorAnimation
            onChangeTab={setIndexTab}
            style={styles.tabSelector}
            tabs={DATA_TAB}
          />
          
            

          <View style={{ flexDirection:'row', alignItems:'flex-start', justifyContent:'center' }}>
          <CheckBox
                
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
          </View>
          
        </View>

        <SectionList
          style={{ marginTop:20}}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    fontSize: 18,
    color: '#4e4f4f'
  },
  tab_container: {
    
    paddingTop : 20,
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