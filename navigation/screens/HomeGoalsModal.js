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


// Exported function
export default function HomeGoalsModal({ navigation }) {

  const [goalsList, setGoalsList] = useState([])
  const [transList, setTransList] = useState([])

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

const TransRef = firebase.firestore().collection('Logs').where('uid','==',getAuth().currentUser.uid).orderBy('trans_date', 'desc')
var sign = ''

// Use effect for fetching transaction log data
useEffect( () => {
  async function fetchData(){
    TransRef
    .onSnapshot(
      querySnapshot => {
        const transList = []
        querySnapshot.forEach((doc) => {
          const { day, month, year, trans_date, trans_name, trans_amount, trans_type } = doc.data()
          
          // Add a negative sign to expenditure entries
          if(trans_type==='Expenditure'){
            sign = '-'
          } else {
            sign = ''
          }
          transList.push({
            // Formatting date, converting from Firestore TIMESTAMP to DD/MM/YYYY
            day: trans_date.toDate().getDate().toString().padStart(2, '0'),
            month: (trans_date.toDate().getMonth() + 1).toString().padStart(2, '0'),
            year: trans_date.toDate().getFullYear().toString().slice(-2),
            trans_date,
            trans_name,
            sign,
            trans_amount,
          })
        }) 
        setTransList(transList)
      }
    )
  }
  fetchData()
}, [])


const generateDataForChart = () => {
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    legend: goalsList.map((goal) => goal.goal_name),
    data: [],
    barColors: ['#f2f25a', '#e3e31e', '#fa1eca', '#e3e31e','#f2f25a' ],
  };

  const goalBalancesByMonth = Array(12).fill().map(() => Array(data.legend.length).fill(0));

  for (const goal of goalsList) {
    const goalYear = parseInt(goal.year, 10);
    if (goalYear === yearPicker) {
      const monthIndex = parseInt(goal.month, 10) - 1;
      const goalIndex = data.legend.indexOf(goal.goal_name);
      goalBalancesByMonth[monthIndex][goalIndex] += goal.goal_balance;
    }
  }

  data.data = goalBalancesByMonth;

  return data;
};

const data = generateDataForChart();


  return (
    <View style={styles.background}>
      {/* Heading */}
      <Text style={styles.prompts}>Goal Bars</Text>
      <StackedBarChart
        data={data}
        width={Dimensions.get("window").width-30}
        height={350}
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