// Component imports
import { View, Text, StyleSheet, Pressable} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import React, {useState, useEffect} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import {Picker} from '@react-native-picker/picker'

// Exported function
export default function LogModal({navigation}){
    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [tranDate, setTranDate] = useState("Select your transaction date")
 
    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({type}, selectedDate) => {
        if (type == "set"){
            const currentDate = selectedDate
            setDate(currentDate)

            if (Platform.OS === "android"){
                toggleDatepicker()
                setTranDate(currentDate.toDateString())
            }
        } else {
            toggleDatepicker()
        }
    }

    const [selectedType, setSelectedType] = useState()
    const [selectedCat, setSelectedCat] = useState()
    const [selectedGoal, setSelectedGoal] = useState()

    return(
        <View style={styles.background}>

            <Text style={styles.prompts}>DATE</Text>
            {!showPicker && (
                <Pressable style={styles.entry} onPress={toggleDatepicker}>
                    <TextInput placeholder={tranDate} editable={false}/>
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

            {/* Text prompts and entry fields regarding new log data */}
            <Text style={styles.prompts}>TRANSACTION NAME</Text>
            <TextInput placeholder="Write your transaction name" style={styles.entry}/>

            <Text style={styles.prompts}>TRANSACTION TYPE</Text>
            <View style={styles.drop}>
                <Picker
                    selectedValue={selectedType}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedType(itemValue)
                    }
                >
                    <Picker.Item label="Expenditure" value="Expenditure"/>
                    <Picker.Item label="Income" value="Income"/>
                </Picker>
            </View>
            
            
            <Text style={styles.prompts}>AMOUNT</Text>
            <TextInput placeholder="Write your transaction amount" style={styles.entry}/>

            <Text style={styles.prompts}>CATEGORY</Text>
            <View style={styles.drop}>
                <Picker
                    selectedValue={selectedCat}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedCat(itemValue)
                    }
                >
                    <Picker.Item label="Food" value="Food"/>
                    <Picker.Item label="Transport" value="Transport"/>
                    <Picker.Item label="Health" value="Health"/>
                    <Picker.Item label="Utilities" value="Utilities"/>
                    <Picker.Item label="Housing" value="Housing"/>
                    <Picker.Item label="Entertainment" value="Entertainment"/>
                    <Picker.Item label="Work" value="Work"/>
                    <Picker.Item label="Schooling" value="Schooling"/>
                    <Picker.Item label="Miscellaneous" value="Miscellaneous"/>
                </Picker>
            </View>

            <Text style={styles.prompts}>ASSOCIATE TO GOAL</Text>
            <View style={styles.drop}>
                <Picker
                    selectedValue={selectedGoal}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedGoal(itemValue)
                    }
                >
                    <Picker.Item label="Independent of Goal" value="Null"/>
                </Picker>
            </View>

            {/* Buttons to save or cancel log data entry */}
            <View style={styles.buttons}>
                <Pressable style={styles.button} onPress={()=> navigation.navigate('Log')}>
                    <Text style={styles.prompts}>BACK</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={()=> {alert('Transaction saved'); navigation.navigate('Log')}}>
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
        , paddingVertical: '6%'
    },
    entry:{
        borderRadius: 15
        , borderColor: '#ff8100'
        , borderWidth: 6
        , width: 370
        , height: 50
        , backgroundColor: '#ffe9de'
        , marginVertical: '3.5%'
        , paddingHorizontal: '5%'
        , alignSelf: 'center'
        , alignItems: 'center'
        , paddingVertical: 7
    },
    drop:{
        borderRadius: 15
        , borderColor: '#ff8100'
        , borderWidth: 6
        , width: 370
        , height: 50
        , backgroundColor: '#ffe9de'
        , marginVertical: '3.5%'
        , paddingHorizontal: '5%'
        , alignSelf: 'center'
        , overflow: 'hidden'
        ,justifyContent: 'center'
    },
    prompts:{
        textAlign: 'center'
        , fontWeight: 'bold'
        , fontSize: 17
    },
    buttons: {
        paddingTop: '2%'
        , justifyContent: 'center'
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