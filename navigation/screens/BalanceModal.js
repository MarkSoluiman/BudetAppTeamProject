import React from 'react'
import { StyleSheet, View, Text, Modal, Button } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'

const BalanceModal = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>Balance Modal</Text>
        </SafeAreaView>
    )
}

export default BalanceModal;

const styles = StyleSheet.create({
    container:{
        background: '#ffdeb7',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
})