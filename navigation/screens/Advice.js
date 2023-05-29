// Component imports
import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';

// Exported function
export default function Advice({navigation}) {
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <View style={styles.container}></View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#ffdeb7',
    },
    widget: {
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: '#ff8100',
        borderWidth: 3,
        width: 370,
        padding: 15,
        backgroundColor: '#ffe9de',
        justifyContent: 'space-evenly',
    },
    footerWidget: {
        marginHorizontal: 20,
        marginBottom: 20,
        width: 370,
        padding: 15,
        justifyContent: 'space-evenly',
    },
});
