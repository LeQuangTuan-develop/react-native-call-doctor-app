import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Api from '../util/Api'

export default function PostItem({post, onPressBtn}) {
    const [doctor, setDoctor] = useState({})

    useEffect(async() => {
        const doctorData = await Api.get(`/doctors/detail/${post.userId}`)
        setDoctor(doctorData.data)
    }, [post.userId])

    return (
        <TouchableOpacity onPress={onPressBtn} style={styles.container} activeOpacity={0.8}>
            <View style={styles.wrapper}>
                {(post.img !== "") &&
                    (<Image 
                        style={styles.image}
                        source={{uri: post.img}}
                    />)
                }      
                <Text style={styles.title}>{post.title}</Text>
                <View style={styles.info}>
                    <Image style={styles.avatar} source={{uri: doctor.img}}/>
                    <View style={styles.textInfo}>
                        <Text style={{color: '#666', fontSize: 13}}>Được trả lời bởi</Text>
                        <Text style={{fontSize: 16}}>{doctor.name}</Text>
                        <View style={styles.info}>
                            <Text style={{marginRight: 4}}>{doctor.exp} năm kinh nghiệm</Text>
                            <View style={styles.rateBox}>
                                <Image style={styles.rateIcon} source={require('../assets/star.png')} />
                                <Text style={styles.rateAverage}>{doctor.starAveraged}</Text>
                                <Text style={styles.rateNum}>{`(${doctor.starNum})`}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.55,
        elevation: 2,
        marginVertical: 8, 
        padding: 12
    },
    wrapper: {
        width: '100%',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 8
    },
    image: {
        width: "100%",
        height: 150,
        resizeMode: 'cover',
        borderRadius: 8
    }, 
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInfo: {
        marginLeft: 10
    },
    avatar:{
        width: 36,
        height: 36,
        resizeMode: 'cover',
        borderRadius: 40
    }, 
    rateBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rateIcon: {
        width: 12,
        height: 12,
        marginRight: 4
    },
    rateAverage: {
        fontSize: 14,
        marginRight: 4
    },
    rateNum: {
        fontSize: 12,
        color: '#666',
        fontWeight: "300"
    },
})
