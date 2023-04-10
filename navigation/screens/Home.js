import React, { Component } from 'react'
import { StyleSheet, Pressable, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home({navigation}){

    return(
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <Pressable style={styles.widget} onPress={()=> navigation.navigate('Current Balance')}>
                    <Text style={styles.text}>Current Balance</Text>
                </Pressable>
                <Pressable style={styles.widget} onPress={()=> navigation.navigate('Monthly Spending')}>
                    <Text style={styles.text}>Monthly Spending</Text>
                </Pressable>
                <Pressable style={styles.widget} onPress={()=> navigation.navigate('Monthly Income')}>
                    <Text style={styles.text}>Monthly Income</Text>
                </Pressable>
                <Pressable style={styles.widget} onPress={()=> navigation.navigate('Profit and Loss')}>
                    <Text style={styles.text}>Profit/Loss</Text>
                </Pressable>
                <Pressable style={styles.widget} onPress={()=> navigation.navigate('Goal Bars')}>
                    <Text style={styles.text}>Goal Bars</Text>
                </Pressable>
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