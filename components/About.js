import React, { useCallback } from "react";
import { Alert, Button,Text,Dimensions, Linking, StyleSheet, View } from "react-native";

const supportedURL = "https://google.com";



const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};


export default function About() {
  return (
    <View style={styles.container}>
         <View style={{ flex: 1,alignItems:'flex-start' , justifyContent: 'center'}} >
                <Text style={{ fontSize:17, color:"#787878", marginBottom:10, width : Dimensions.get('window').width-50 }}>
                  

                  
                  {`Author : Aboubakar Ousmanne\nmail      : aboousmane@gmail.com`}
                  </Text>

                <Text style={{fontWeight:'bold',fontStyle :'italic', fontSize:13, color:"#787878",width : Dimensions.get('window').width-50  }}>
                   </Text>
            </View>
      {/*<OpenURLButton color="red" url={supportedURL}>Github </OpenURLButton>*/}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});


