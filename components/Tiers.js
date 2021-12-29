import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text,View,Dimensions, StyleSheet, SectionList, StatusBar, TouchableOpacity} from 'react-native';
import TabSelectorAnimation from 'react-native-tab-selector'

const DATA = [
  {
    title: " Les dettes : 45000",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: " les prêts",
    data: ["French Fries", "Onion Rings", "Fried Shrimps", "Onion Rings", "Fried Shrimps"]
  }
];

const DATA_TAB = [{ title: 'Tous' }, { title: 'semaine' }, { title: 'mois' }]

function Tiers() {

  const [indexTab, setIndexTab] = useState(0)

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
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <View style={styles.tab_container}>
          <TabSelectorAnimation
            onChangeTab={setIndexTab}
            style={styles.tabSelector}
            tabs={DATA_TAB}
          />
          <Text style={styles.text}>{`Current tab is ${indexTab + 1}`}</Text>
        </View>
        <SectionList
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

export default Tiers;