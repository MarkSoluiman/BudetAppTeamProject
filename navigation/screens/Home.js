import React, { Component } from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home({navigation}){

    return(
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <View style={styles.widget}>
                    <Text style={styles.text}>Current Balance</Text>
                </View>
                <View style={styles.widget}>
                    <Text style={styles.text}>Monthly Spending</Text>
                </View>
                <View style={styles.widget}>
                    <Text style={styles.text}>Monthly Income</Text>
                </View>
                <View style={styles.widget}>
                    <Text style={styles.text}>Profit/Loss</Text>
                </View>
                <View style={styles.widget}>
                    <Text style={styles.text}>Goal Bars</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background:{
        flex:1
        , backgroundColor: '#ffdeb7'
        , alignItems: 'center'
        , justifyContent: 'center'
    },
    widget:{
        marginHorizontal: 20
        , marginBottom: 20
        , borderRadius: 10
        , borderColor: '#ff8100'
        , borderWidth: 8
        , width: 370
        , height: 250
        , backgroundColor: '#ffe9de'
        , justifyContent: 'space-evenly'
        , fontWeight: 'bold'
    },
    text:{
        textAlign: 'center',
    }
})