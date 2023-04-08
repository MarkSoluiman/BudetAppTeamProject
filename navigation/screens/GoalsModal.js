import { View, Text, Button, StyleSheet, Pressable} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function GoalsModal({navigation}){
    return(
        <SafeAreaView style={styles.background}>
            <Text>Modal test</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background:{
        flex:1
        , backgroundColor: '#ffdeb7'
    },
    widget:{
        marginHorizontal: 20
        , marginVertical: 20
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