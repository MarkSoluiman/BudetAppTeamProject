// Component imports
import { View, Text, StyleSheet, Pressable, Platform, Alert, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TextInput } from 'react-native-gesture-handler'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'
import { db, firebase } from '../../firebase.config'
import { getAuth } from 'firebase/auth'

// Exported function
export default function GoalsModal({navigation, route}){

    // Initialise constants
    const [date, setDate] = useState(new Date())
    const [oldName, setOldName] = useState('')
    const [newName, setName] = useState('')
    const [newAmount, setAmount] = useState(route.params?.goal_amount || '');
    const [showPicker, setShowPicker] = useState(false)
    const [goalDate, setGoalDate] = useState("Select your goal completion date")



    // Hook useEffect checks if user was navigated to page with route parameters, if the user wants to update a document
    useEffect(() => {
        if (route.params) {

            // Assign parameter as goal document ID
            const { goalID } = route.params;

            // Query to find goal document in firebase from assigned ID
            firebase
                .firestore()
                .collection('Goals')
                .doc(goalID)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {

                        // Set entry field variables to corresponding values in firebase
                        setName(documentSnapshot.data().goal_name);
                        setOldName(documentSnapshot.data().goal_name)
                        setAmount(documentSnapshot.data().goal_amount);
                        const goalDateTimestamp = documentSnapshot.data().goal_date;
                        const goalDate = goalDateTimestamp.toDate(); // Convert timestamp to Date object
                        setDate(goalDate);
                        setGoalDate(goalDate.toDateString());

                    // Possible error messages
                    } else {
                        console.log('Document not found!');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    // Constants used to determine if app should render components for a new goal to add, or an existing goal to update
    const shouldRenderName = route.params; 
    const shouldRenderAmount = !!route.params;
 
    // Initialise date picker for goal completed by date
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

    // Function is called on completion of a goal update, updates associated goal names of relevant transactions
    function updateLogs() {
        firebase
        .firestore()
        .collection('Logs')
        .where('uid','==',getAuth().currentUser.uid)
        .where('trans_goal', '==', oldName)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const updatedData = { trans_goal: newName }
                doc.ref.update(updatedData)
                .then(() => {
                    console.log('Associated transaction updated for new goal name')
                })
                .catch((error) => {
                    console.log('Error updating associated transactions: ', error)
                })
            })
        })
    }

    // Function is called on completion of a goal update, determines goal status with updated goal balance and amount, notifies user of goal completion if valid and necessary
    const goalNotifications = async (goalID) => {

        // Find if goal met, goal_balance >= goal_met
        firebase
            .firestore()
            .collection("Goals").
            doc(goalID)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists){
                    if (documentSnapshot.data().goal_balance >= documentSnapshot.data().goal_amount){

                        // Change goal status to true if complete
                        const goalRef = doc(db, 'Goals', goalID)
                        try{
                            updateDoc(goalRef, {
                                goal_complete: true
                            })
                            console.log('Goal status updated successfully')

                            // Find if goal notifications are on, if yes, alert user of goal completion
                            firebase.firestore().collection("Profile").where('uid', '==', getAuth().currentUser.uid).where("notifications", "==", true).get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(documentSnapshot => {
                                    if (documentSnapshot.data()['notifications'] === true){
                                        Alert.alert("Goal completed!")
                                        console.log("Goal completed as a console log")
                                    }
                                })
                            })

                            // Potential error messages
                            .catch((error) => {
                                console.log("Error getting documents: ", error)
                            })                            
                        } catch (error){
                            console.log('Goal document updated unsuccessfully')
                        }
                    }
                } else {
                    console.log('Document not found!')
                }
            })
            .catch((error) => {
                console.log(error)
            })        
    }

    // For new goals... validate entry input, if successful... write to firebase
    const handleSubmit = async () => {
        if(newName.length > 0){
            if (Number.isInteger(parseInt(newAmount)) && parseInt(newAmount) > 0) {
                if(date > new Date()){
                    amount = parseInt(newAmount, 10)

                    navigation.navigate('Goals-Goals')

                    const docRef = addDoc(collection(db, "Goals"),{
                        uid: getAuth().currentUser.uid
                        , goal_name: newName
                        , goal_amount: amount
                        , goal_date: date
                        , goal_balance: 0
                        , goal_complete: false
                    });
                    console.log('Document written with ID: ', (await docRef).id)
                    Alert.alert('Goal saved')
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

    // For existing goals to update... validate entry input, if successful... write to firebase
    const handleUpdate = async (goalID) => {
        if(newName.length > 0){
            if(newName.length > 0){
                if (Number.isInteger(parseInt(newAmount)) && parseInt(newAmount) > 0) {
                    if(date > new Date()){
                        amount = parseInt(newAmount, 10)
    
                        navigation.navigate('Goals-Goals')
                        
                        const goalRef = doc(db, 'Goals', goalID)
                        try{
                            await updateDoc(goalRef, {
                                goal_name: newName,
                                goal_amount: amount,
                                goal_date: date,
                            })
                            console.log('Goal document updated successfully')
                            Alert.alert('Goal updated')

                            updateLogs()
                            goalNotifications(goalID)
                        } catch (error){
                            console.log('Goal document updated unsuccessfully')
                        }
                    } else {
                        Alert.alert('Error: Goal date must be in the future')
                    }
                } else {
                    Alert.alert('Error: Goal amount must be an integer greater than 0')
                }
            } else {
                Alert.alert('Error: Goal name must be of length greater than 0')
            }
    }}

    // Exported function
    return(
        <View style={styles.background}>

            {/* Goal name prompt and entry */}
            <Text style={styles.prompts}>GOAL NAME</Text>
            {shouldRenderName ? (
                <TextInput value={newName} onChangeText={newName => setName(newName)} style={styles.entry}/>
            ) : (
                <TextInput placeholder="Write your goal name" onChangeText={newName => setName(newName)} style={styles.entry}/>
            )}

            {/* Goal amount prompt and entry */}
            <Text style={styles.prompts}>SAVING AMOUNT</Text>
            {shouldRenderAmount ? (
                <TextInput value={newAmount.toString()} keyboardType='numeric' onChangeText={newAmount => setAmount(newAmount)} style={styles.entry}/>
            ) : (
                <TextInput placeholder="Write your saving amount" keyboardType='numeric' onChangeText={newAmount => setAmount(newAmount)} style={styles.entry}/>
            )}

            
            {/* Completed  by date prompt and picker */}
            <Text style={styles.prompts}>COMPLETED BY DATE</Text>
            {!showPicker && (
                <Pressable style={styles.entry} onPress={toggleDatepicker}>
                    <Text>{goalDate}</Text>
                </Pressable>
            )}
            
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display="default"
                    value={date}
                    onChange={onChange}
                />
            )}

            {/* Buttons to save or cancel goal data entry */}
            <View style={styles.buttons}>

                {/* Cancel goal data entry */}
                <Pressable style={styles.button} onPress={()=> navigation.navigate('Goals-Goals')}>
                    <Text style={styles.prompts}>BACK</Text>
                </Pressable>

                {/* Update existing goal OR add new goal */}
                {shouldRenderName ? (
                    <Pressable style={styles.button} onPress={() => handleUpdate(route.params.goalID)}>
                        <Text style={styles.prompts}>UPDATE</Text>
                    </Pressable>
                ) : (
                    <Pressable style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.prompts}>SAVE</Text>
                    </Pressable>
                )}
            </View>
        </View>
    )
}


// Styling
const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: "#ffdeb7",
      justifyContent:'center',
      
     
    },
    entry: {
      borderRadius: 15,
      borderColor: "#ff8100",
      borderWidth: 6,
      width: 370,
      height: 50,
      backgroundColor: "#ffe9de",
      marginVertical: 15,
      paddingHorizontal: 15,
      alignSelf: "center",
      alignItems: "center",
      paddingVertical: 7,
    },
    drop: {
      borderRadius: 15,
      borderColor: "#ff8100",
      borderWidth: 6,
      width: 370,
      height: 50,
      backgroundColor: "#ffe9de",
      marginVertical: 15,
      paddingHorizontal: 15,
      alignSelf: "center",
      overflow: "hidden",
      justifyContent: "center",
    },
    prompts: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 17,
    },
    buttons: {
     
      justifyContent: "center",
      flexDirection: "row",
    },
    button: {
      backgroundColor: "#ff8100",
      borderRadius: 25,
      paddingVertical: 10,
      height: 50,
      width: 90,
      marginHorizontal: 20,
    },
  });