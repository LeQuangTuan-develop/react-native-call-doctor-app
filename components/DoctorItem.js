import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {color} from '../styles/styles'

export default function DoctorItem({doctor, onPressBtn}) {
    return (
        <TouchableOpacity onPress={onPressBtn} style={styles.container} activeOpacity={0.8}>
            <View style={styles.wrapper}>
                <View style={styles.avatarBox}>
                    <Image style={styles.avatar} source={{uri: doctor.img}}/>
                    <View style={doctor.online ? styles.online : styles.offline}></View>
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{doctor.name}</Text>
                    <View style={styles.rateBox}>
                        <Image style={styles.rateIcon} source={require('../assets/star.png')} />
                        <Text style={styles.rateAverage}>{doctor.starAveraged}</Text>
                        <Text style={styles.rateNum}>{`(${doctor.starNum})`}</Text>
                    </View>
                </View>
                <View>
                    <Image style={styles.phoneImg} source={require('../assets/phone.png')} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
        elevation: 5,
        marginTop: 10,
        paddingVertical: 14,
        paddingHorizontal: 20
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
    },
    avatarBox: {
        position: 'relative',
    },
    online: {
        width: 14,
        height: 14,
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 7,
        position: 'absolute',
        top: '94%',
        left: '46%',
        backgroundColor: '#00B8FF'
    },
    offline: {
        width: 14,
        height: 14,
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 7,
        position: 'absolute',
        top: '94%',
        left: '46%',
        backgroundColor: color.GrayColor
    },
    avatar: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 40
    },
    name: {
        flex: 1,
        marginTop: 6,
        fontSize: 14
    },
    info: {
        alignItems: 'stretch',
        maxWidth: 250
    },
    rateBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rateIcon: {
        width: 20,
        marginRight: 4
    },
    rateAverage: {
        fontSize: 18,
        marginRight: 4
    },
    rateNum: {
        fontSize: 16,
        color: '#666',
        fontWeight: "200"
    },
    phoneImg: {
        width: 30,
        resizeMode: 'contain',
        tintColor: color.PrimaryColor
    }
})
