import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import {color} from '../styles/styles'
import DaySelection from '../components/DaySelection';
import Api from '../util/Api'

export default function CallBooking({route, navigation}) {
    const {doctorId} = route.params 

    const hoursSelections = [
        { id: 1, hour: '8:00 SA'},
        { id: 2, hour: '9:00 SA'},
        { id: 3, hour: '10:00 SA'},
        { id: 4, hour: '11:00 SA'},
        { id: 5, hour: '1:00 PM'},
        { id: 6, hour: '2:00 PM'},
        { id: 7, hour: '3:00 PM'},
        { id: 8, hour: '4:00 PM'},
        { id: 9, hour: '5:00 PM'},
    ]

    const [doctor, setDoctor] = useState({})

    useEffect( async () => {
        const doctorData = await Api.get(`/doctors/detail/${doctorId}`)
        setDoctor(doctorData.data)
    }, [doctorId])

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <View style={styles.info}>
                    <Text style={styles.name}>{doctor.name}</Text>
                    <View style={styles.rateBox}>
                        <Image style={styles.rateIcon} source={require('../assets/star.png')} />
                        <Text style={styles.rateAverage}>{doctor.starAveraged}</Text>
                        <Text style={styles.rateNum}>{`(${doctor.starNum})`}</Text>
                    </View>
                </View>
                <View style={styles.avatarBox}>
                    <Image style={styles.avatar} source={{uri: doctor.img}}/>
                    <View style={doctor.online ? styles.online : styles.offline}></View>
                </View>
            </View>
            <DaySelection />
            <View style={styles.hoursSelections}>
                <Text style={{fontSize: 22}}>Giờ: </Text>
                <FlatList 
                    data={hoursSelections}
                    numColumns={3}
                    renderItem={({item}) => 
                        <TouchableOpacity style={styles.hourBox}>
                            <View>
                                <Text style={styles.hourText}>{item.hour}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={(item) => `${item.id}`}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity 
                    style={{
                        ...styles.btn,
                        backgroundColor: color.BlueColor,
                    }}
                >
                    <Text 
                        style={{
                            ...styles.textBtn,
                            color: 'white',
                        }}
                    >
                        Đặt lịch tư vấn
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("CallScreen", {doctorId: doctor._id})} style={{ marginLeft: 8}}>
                    <Image style={styles.phoneImg} source={require('../assets/phone.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    containerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        paddingVertical: 14,
        paddingHorizontal: 20
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
        fontSize: 22
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
        fontWeight: "300"
    },
    hoursSelections: {
        paddingHorizontal: 20
    },
    hourBox: {
        flex: 1,
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginHorizontal: 6, 
        marginVertical: 10,
        borderRadius: 10,
        textAlign: "center"
    },
    hourText: {
        fontSize: 20
    },
    button: {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 50,
        flexDirection: 'row'
    }, 
    btn: {
        flex: 4,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textBtn: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    phoneImg: {
        flex: 1,
        width: 42,
        resizeMode: 'contain',
        tintColor: color.PrimaryColor
    }
})
