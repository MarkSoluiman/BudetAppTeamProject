// Component imports
import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native'

// Exported function
export default function HomePLModal ({navigation}){
    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ]
    
    return(
        <View style={styles.background}>

            {/* Heading */}
            <Text style={styles.prompts}>Profit and Loss</Text>

            {/* Graph */}
            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar data={data} x="quarter" y="earnings"/>
            </VictoryChart>

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