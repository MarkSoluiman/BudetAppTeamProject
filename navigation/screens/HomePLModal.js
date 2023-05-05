// Component imports
import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

// Exported function
export default function HomePLModal ({navigation}){
    
    return(
        <View style={styles.background}>

            {/* Heading */}
            <Text style={styles.prompts}>Profit and Loss</Text>

            {/* Button to return to home page */}
            <Pressable onPress={()=> navigation.navigate('Home')}>
                <View style={styles.button}>
                    <Text style={styles.prompts}>GO BACK</Text>
                </View>
            </Pressable>
        </View>
    )
}

// Styling
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