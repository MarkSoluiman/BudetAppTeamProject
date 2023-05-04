// Component imports
import { View, Text, SafeAreaView, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { app, auth, db, firebase } from '../../firebase.config'
import { collection, getDoc } from 'firebase/firestore/lite'
import { QuerySnapshot } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'

// Exported function
export default function Goals({navigation}){

    // Initialise constants
    const [goalsList, setGoalsList] = useState([])

    // User-specific data fetching where goals are incomplete, ordered from nearest due entries
    const todoRef = firebase.firestore().collection('Goals').where('uid', '==',getAuth().currentUser.uid).where('goal_complete','==', false).orderBy('goal_date', 'asc')

    // Use effect for fetching goals log data
    useEffect( () => {
        async function fetchData(){
            todoRef
            .onSnapshot(
                querySnapshot => {
                    const goalsList = []
                    querySnapshot.forEach((doc) => {
                        const {day, month, year, goal_date, goal_name, goal_balance, goal_amount} = doc.data()
                        goalsList.push({

                            // Formatting date, converting from Firestore TIMESTAMP to DD/MM/YYYY
                            day: goal_date.toDate().getDate().toString().padStart(2, '0'),
                            month: (goal_date.toDate().getMonth() + 1).toString().padStart(2, '0'),
                            year: goal_date.toDate().getFullYear().toString().slice(-2),
                            
                            goal_name,
                            goal_balance,
                            goal_amount,
                        })
                    })
                    setGoalsList(goalsList)
                }
            )
        }
        fetchData()
    }, [])

    return(
        <SafeAreaView style={styles.background}>

            {/* New goal button */}
            <Pressable style={styles.button} onPress={()=> navigation.navigate('New Goal')}>
                <Text style={styles.buttonText}>NEW GOAL</Text>
            </Pressable>

            {/* List of goals */}
            <View style={styles.widget}>
                <FlatList
                    data={goalsList}
                    numColumns={1}
                    renderItem={({item}) => (
                    <Pressable
                    >
                        <View>
                        
                        {/* Formatting of entries */}
                        <Text>{item.day}/{item.month}/{item.year}{'\n'}{item.goal_name}{'\n'}${item.goal_balance}/${item.goal_amount}{'\n'}</Text>
                        </View>
                    </Pressable>
                    )}
                >
                </FlatList>
            </View>
        </SafeAreaView>
    )
}

// Styling
const styles = StyleSheet.create({
    background:{
        flex:1
        , paddingTop: '5%'
        , backgroundColor: '#ffdeb7'
    },
    widget:{
        marginHorizontal: '5%'
        , marginVertical: '5%'
        , borderRadius: 15
        , width: 370
        , height: 605
        , padding: 15
        , backgroundColor: '#ff8100'
        , justifyContent: 'space-evenly'
    },
    button:{
        width: 370
        , height: 55
        , borderRadius: 30
        , marginHorizontal: 20
        , backgroundColor: '#bd5100'
        , justifyContent: 'center'
    },
    buttonText:{
        textAlign: 'center'
        , fontSize: 17
        , fontWeight: 'bold'
    }
})