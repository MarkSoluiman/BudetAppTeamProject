// Component imports
import { signOut } from 'firebase/auth'
import React, { Component } from 'react'
import { StyleSheet, Pressable, Text,View, SafeAreaView, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { auth } from '../../firebase.config'

//import { SafeAreaView } from 'react-native-safe-area-context'

// Exported function
export default function Home({navigation}){
    const handleLogout = async ()=>{
        await signOut(auth);
    }




    return(
       <SafeAreaView style={styles.background}>
            <ScrollView >
                {/* Monthly Spending widget */}
                <Pressable style={styles.widget} onPress={()=> navigation.navigate('Monthly Spending')}>
                    <Text style={styles.text}>Monthly Spending</Text>
                </Pressable>

                {/* Monthly Income widget */}
                <Pressable style={styles.widget} onPress={()=> navigation.navigate('Monthly Income')}>
                    <Text style={styles.text}>Monthly Income</Text>
                </Pressable>

                {/* Profit and Loss widget */}
                <Pressable style={styles.widget} onPress={()=> navigation.navigate('Profit and Loss')}>
                    <Text style={styles.text}>Profit/Loss</Text>
                </Pressable>

                {/* Goal Bars widget */}
                <Pressable style={styles.widget} onPress={()=> navigation.navigate('Goal Bars')}>
                    <Text style={styles.text}>Goal Bars</Text>
                </Pressable>

                <TouchableOpacity 
                onPress={handleLogout}>
                    <Text> LOG OUT </Text>
                </TouchableOpacity>


               
             </ScrollView>
        </SafeAreaView>
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
    },
    widget:{
        marginHorizontal: '5%'
        , marginBottom: '5%'
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
        textAlign: 'center'
    }
})