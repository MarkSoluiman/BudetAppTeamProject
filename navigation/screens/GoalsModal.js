// Component imports
import { View, Text, Button, StyleSheet, Pressable, Platform, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TextInput } from 'react-native-gesture-handler'
import { collection, addDoc, getDocs } from 'firebase/firestore/lite'
import { auth, db, app } from '../../firebase.config'
import { firebase } from '@react-native-firebase/firestore'
import { getAuth } from 'firebase/auth'

// Exported function
export default function GoalsModal({navigation}){

    const [date, setDate] = useState(new Date())
    const [newName, setName] = useState('')
    const [newAmount, setAmount] = useState('')
    const [showPicker, setShowPicker] = useState(false)
    const [goalDate, setGoalDate] = useState("Select your goal completion date")
 

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({type}, selectedDate) => {
        if (type == "set"){
            const currentDate = selectedDate
            setDate(currentDate)

            if (Platform.OS === "android"){
                toggleDatepicker()
                setGoalDate(currentDate.toDateString())
            }
        } else {
            toggleDatepicker()
        }
    }

    const handleSubmit = async () => {
        if(newName.length > 0){
            if (Number.isInteger(parseInt(newAmount)) && parseInt(newAmount) > 0) {
                if(date > new Date()){
                    Alert.alert('Goal saved')
                    navigation.navigate('Goals')
                    const docRef = addDoc(collection(db, "Goals"),{
                        uid: getAuth().currentUser.uid
                        , goal_name: newName
                        , goal_amount: newAmount
                        , goal_date: date
                        , goal_balance: 0
                        , goal_complete: false
                    });
                    console.log('Document written with ID: ', docRef.id)
                } else {
                    Alert.alert('Error: Goal date must be in the future')
                }
            } else {
                Alert.alert('Error: Goal amount must be an integer greater than 0')
            }
        } else {
            Alert.alert('Error: Goal name must be of length greater than 0')
        }
    }

    return(
        <View style={styles.background}>

            {/* Text prompts and entry fields regarding new goal data */}
            <Text style={styles.prompts}>GOAL NAME</Text>
            <TextInput placeholder="Write your goal name" onChangeText={newName => setName(newName)} style={styles.entry}/>

            <Text style={styles.prompts}>SAVING AMOUNT</Text>
            <TextInput placeholder="Write your saving amount" keyboardType='numeric' onChangeText={newAmount => setAmount(newAmount)} style={styles.entry}/>
            
            <Text style={styles.prompts}>COMPLETED BY DATE</Text>
            {!showPicker && (
                <Pressable style={styles.entry} onPress={toggleDatepicker}>
                    <TextInput placeholder={goalDate} editable={false}/>
                </Pressable>
            )}
            
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange}
                />
            )}

            {/* Buttons to save or cancel goal data entry */}
            <View style={styles.buttons}>
                <Pressable style={styles.button} onPress={()=> navigation.navigate('Goals')}>
                    <Text style={styles.prompts}>BACK</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.prompts}>SAVE</Text>
                </Pressable>
            </View>
        </View>
    )
}

// Styling
const styles = StyleSheet.create({
    background:{
        flex:1
        , backgroundColor: '#ffdeb7'
        , paddingVertical: 120
    },
    entry:{
        borderRadius: 15
        , borderColor: '#ff8100'
        , borderWidth: 6
        , width: 370
        , height: 50
        , backgroundColor: '#ffe9de'
        , marginVertical: 30
        , paddingHorizontal: 20
        , alignSelf: 'center'
        , alignItems: 'center'
        , paddingVertical: 7
    },
    prompts:{
        textAlign: 'center'
        , fontWeight: 'bold'
        , fontSize: 17
    },
    buttons: {
        justifyContent: 'center'
        , flexDirection: 'row'
    },
    button: {
        backgroundColor: '#ff8100'
        , borderRadius: 25
        , paddingVertical: 10
        , height: 50
        , width: 90
        , marginHorizontal: 20
    }
})