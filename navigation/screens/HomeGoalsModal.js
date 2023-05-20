// Component imports
import { useState , useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { app, auth, db, firebase } from '../../firebase.config'
import { collection, getDoc, deleteDoc } from 'firebase/firestore/lite'
import { QuerySnapshot } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";



const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  legend: ["G1, G2, G3"],
  data: [
    [60, 60, 30], // balance on Jan  
    [30, 30 , 30], // balance on feb 
    [60, 60, 30],  // balance on March 
    [30, 30],
    [60, 60],
    [30, 30],
    [60, 60],
    [30, 30],
    [30, 30],
    [30, 30],
    [60, 60],
    [30, 30],
    
  ],
  barColors: ["#f2f25a", "#e3e31e", "#fa1eca"],
  
};
// Exported function
export default function HomeGoalsModal({ navigation }) {

  const [goalsList, setGoalsList] = useState([])
  var [yearPicker, setYearPicker] = useState(2023)



  const handleDecrement = () => {
   
     setYearPicker(yearPicker = yearPicker -1);
     console.log(yearPicker)
  }
  const handleIncrement = () => {
    setYearPicker(yearPicker = yearPicker +1);
    console.log(yearPicker)
  }


  

  const todoRef = firebase.firestore().collection('Goals').where('uid', '==',getAuth().currentUser.uid).where('goal_complete','==', false).orderBy('goal_date', 'asc')
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
                        year: goal_date.toDate().getFullYear().toString().slice(0),
                        goal_date,
                        goal_name,
                        goal_balance,
                        goal_amount,
                    })
                })
                setGoalsList(goalsList)
                console.log(goalsList)
            }
        )
    }
    fetchData()
}, [] )

function deleteEntry(yearPicker, month_in_number, selectedGoalBalance){
  firebase.firestore()
    .collection('Goals')
    .where('uid', '==', getAuth().currentUser.uid)
    .where('year', '==', yearPicker.toString())
    .where('month', '==', month_in_number)
    .where('goal_balance', '==', selectedGoalBalance)
    .get()
    .then(querySnapshot => {
      const selectionIDs = []
      querySnapshot.forEach(documentSnapshot => {
        selectionIDs.push(documentSnapshot.id)
      })
      if (selectionIDs.length === 0){
        Alert.alert("No goals found")
      }

      // balance on jan 
      if(month_in_number = "01" && year == yearPicker.toString()){

      console.log(selectedGoalBalance)
      }


      const batch = firebase.firestore().batch()
      selectionIDs.forEach(selectionID => {
        const docRef = firebase.firestore().collection('Goals').doc(selectionID)
        //batch.delete(docRef)
      })
      batch.commit()
        .then(() => {
          setSelectionID("")
        })
        .catch((error) => {
          console.log("Error removing documents: ", error)
        })
    })
    .catch(error => {
      console.log(error)
  })
}



  return (
    <View style={styles.background}>
      {/* Heading */}
      <Text style={styles.prompts}>Goal Bars</Text>
      <StackedBarChart
        data={data}
        width={Dimensions.get("window").width-30}
        height={220}
        chartConfig = {{
            backgroundGradientFrom: '#ff8100',
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: '#ff8100',
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }}
          style= {{borderRadius: 10, alignSelf: 'center'}}
          accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
      />

      <View style = {{  marginTop: 5 , flexDirection : 'row', justifyContent: 'space-between'}}>
      <Ionicons name="caret-back-circle-sharp" size={35} color="black" onPress={handleDecrement} />
      <Text style = {{ marginTop: 12, fontSize : 20 , fontWeight : 5}}>
        {yearPicker}
      </Text>
      
      <MaterialCommunityIcons name="arrow-right-drop-circle" size={35} color="black"  onPress={handleIncrement}/>
      </View>

      {/* Button to return to home page */}
      <Pressable onPress={() => navigation.navigate("Home")}>
        <View style={styles.button}>
          <Text style={styles.prompts}>GO BACK</Text>
        </View>
      </Pressable>
    </View>
  )
}

// Styling
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ffdeb7",
    padding: 5,
  },
  prompts: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  button: {
    backgroundColor: "#ff8100",
    borderRadius: 25,
    paddingVertical: 10,
    height: 50,
    width: 90,
    margin: 20,
    alignSelf: "center",
  }
})
