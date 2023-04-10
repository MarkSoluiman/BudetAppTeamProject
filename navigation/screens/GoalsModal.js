import { View, Text, StyleSheet, Pressable} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function GoalsModal({navigation}){
    return(
        <View style={styles.background}>
            <Text style={styles.prompts}>GOAL NAME</Text>
            <TextInput label="Write your goal name here" style={styles.entry}/>
            <Text style={styles.prompts}>SAVING AMOUNT</Text>
            <TextInput label="Write your saving amount here" style={styles.entry}/>
            <Text style={styles.prompts}>COMPLETED BY DATE</Text>
            <Pressable label="Write your completion date here" style={styles.entry}>
                <Text>Select date...</Text>
            </Pressable>

            <View style={styles.buttons}>
                <Pressable style={styles.button} onPress={()=> navigation.navigate('Goals')}>
                    <Text style={styles.prompts}>BACK</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={()=> {alert('Goal saved'); navigation.navigate('Goals')}}>
                    <Text style={styles.prompts}>SAVE</Text>
                </Pressable>
            </View>
        </View>
    )
}

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