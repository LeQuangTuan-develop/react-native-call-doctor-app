import React from 'react'
import {View, Image, TextInput, StyleSheet} from 'react-native'
import {color} from '../styles/styles'

export default function SearchVoice() {
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.searchIcon} source={require('../assets/Search.png')} />
            </View>
            <TextInput
                style={{flex: 1, paddingHorizontal: 18, fontSize: 20}} 
                placeholder="Tìm bác sĩ"
            />
            <View style={styles.voiceBox}>
                <Image style={styles.voiceIcon} source={require('../assets/Voice.png')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10
    },
    searchIcon: {
        width: 20,
        marginLeft: 8
    },
    voiceIcon: {
        width: 20,
    },
    voiceBox: {
        backgroundColor: color.PrimaryColor,
        borderRadius: 10, 
        paddingHorizontal: 14,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

