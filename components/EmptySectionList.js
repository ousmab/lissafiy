import React from 'react';
import {Text, StyleSheet } from 'react-native';


export default function EmptySectionList() {
    return (
        <Text style={styles.emptyText}>Chargement des données ... </Text>
    )
}

const styles = StyleSheet.create({
    emptyText:{
        fontSize : 17,
        color : "#5e5e5e",
        marginTop:50
    }
})