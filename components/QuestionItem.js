import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {color} from '../styles/styles'

export default function QuestionItem() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đặt câu hỏi cho bác sĩ</Text>
            <TextInput
                style={styles.input}
                placeholder="Tôi là nam 55 tuổi. Tôi bị đau lưng..."
            />
            <View style={{...styles.info, marginTop: 6}}>
                <View style={{...styles.info, marginRight: 20}}>
                    <Entypo color={color.PrimaryColor} name="attachment" size={18} />
                    <Text style={{marginLeft: 4}}>Thêm file đính kèm</Text>
                </View>
                <View style={styles.info}>
                    <Ionicons color={color.BlueColor} name="information-circle" size={20} />
                    <Text style={{marginLeft: 4}}>Xem hướng dẫn</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
    },  
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 6
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

