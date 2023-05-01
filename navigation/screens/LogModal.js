// Component imports
import { View, Text, StyleSheet, Pressable} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

// Exported function
export default function LogModal({navigation}){
    return(
        <View style={styles.background}>

            {/* Text prompts and entry fields regarding new log data */}
            <Text style={styles.prompts}>TRANSACTION NAME</Text>
            <TextInput label="Write your transaction name here" style={styles.entry}/>
            <Text style={styles.prompts}>DATE</Text>
            <Pressable label="Write your transaction date here" style={styles.entry}>
                <Text>Select date...</Text>
            </Pressable>
            <Text style={styles.prompts}>TRANSACTION TYPE</Text>
            <Pressable label="Write your transaction type here" style={styles.entry}>
                <Text>Select type...</Text>
            </Pressable>
            <Text style={styles.prompts}>AMOUNT</Text>
            <TextInput label="Write your transaction amount here" style={styles.entry}/>
            <Text style={styles.prompts}>CATEGORY</Text>
            <Pressable label="Write your transaction category here" style={styles.entry}>
                <Text>Select category...</Text>
            </Pressable>
            <Text style={styles.prompts}>ASSOCIATE TO GOAL</Text>
            <Pressable label="Write your transaction goal here" style={styles.entry}>
                <Text>Select goal...</Text>
            </Pressable>

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
        , paddingVertical: '8%'
    },
    entry:{
        borderRadius: 15
        , borderColor: '#ff8100'
        , borderWidth: 6
        , width: 370
        , height: 50
        , backgroundColor: '#ffe9de'
        , marginVertical: '3.5%'
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