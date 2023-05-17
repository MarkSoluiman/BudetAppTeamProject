// Component imports
import { signOut } from 'firebase/auth'
import React, { Component } from 'react'
import { StyleSheet, Pressable, Text,View, SafeAreaView, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { auth } from '../../firebase.config'

//import { SafeAreaView } from 'react-native-safe-area-context'

// Exported function
export default function Home({navigation}){
    return(
       <View style={styles.background}>
            {/* Monthly Spending widget */}
            <Pressable style={styles.widget} onPress={()=> navigation.navigate('Current Balance')}>
                <Text style={styles.heading}>Current Balance</Text>
            </Pressable>

            {/* Monthly Spending widget */}
            <Pressable style={styles.widget} onPress={()=> navigation.navigate('Monthly Spending')}>
                <Text style={styles.heading}>Monthly Spending</Text>
            </Pressable>

            {/* Monthly Income widget */}
            <Pressable style={styles.widget} onPress={()=> navigation.navigate('Monthly Income')}>
                <Text style={styles.heading}>Monthly Income</Text>
            </Pressable>

            {/* Profit and Loss widget */}
            <Pressable style={styles.widget} onPress={()=> navigation.navigate('Profit and Loss')}>
                <Text style={styles.heading}>Profit/Loss</Text>
            </Pressable>

            {/* Goal Bars widget */}
            <Pressable style={styles.widget} onPress={()=> navigation.navigate('Goal Bars')}>
                <Text style={styles.heading}>Goal Bars</Text>
            </Pressable>
        </View>
    )
}


// Styling
const styles = StyleSheet.create({
    background:{
        flex:1
        , backgroundColor: '#ffdeb7'
        , alignItems: 'center'
        , justifyContent: 'center'
        , paddingTop: '5%'
        , alignItems: 'flex-start'
    },
    widget:{
        marginHorizontal: '5%'
        , marginBottom: '5%'
        , borderRadius: 200
        , borderColor: '#ff8100'
        , borderWidth: 6
        , width: 370
        , height: 80
        , backgroundColor: '#ffe9de'
        , justifyContent: 'space-evenly'
        , fontWeight: 'bold'
    },
    heading:{
        fontWeight: 'bold'
        , fontSize: 16
        , textAlign: 'center'
    },
})