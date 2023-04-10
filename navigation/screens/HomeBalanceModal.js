import { View, Text, StyleSheet, Pressable} from 'react-native'

export default function HomeBalanceModal({navigation}){
    return(
        <View style={styles.background}>
            <Text style={styles.prompts}>Current Balance</Text>
            <Pressable onPress={()=> navigation.navigate('Home')}>
                <View style={styles.button}>
                    <Text style={styles.prompts}>GO BACK</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        flex:1
        , backgroundColor: '#ffdeb7'
        , padding: 20
    },
    prompts:{
        textAlign: 'center'
        , fontWeight: 'bold'
        , fontSize: 17
    },
    button: {
        backgroundColor: '#ff8100'
        , borderRadius: 25
        , paddingVertical: 10
        , height: 50
        , width: 90
        , margin: 20
        , alignSelf: 'center'
    }
})