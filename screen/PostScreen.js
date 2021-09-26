import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Api from '../util/Api'

export default function PostScreen({route, navigation}) {
    const {postId} = route.params 
    const [post, setPost] = useState({})
    const [doctor, setDoctor] = useState({})

    useEffect( async () => {
        const postData = await Api.get(`/posts/${postId}`)
        setPost(postData.data)
        const doctor = await Api.get(`/doctors/detail/${postData.data.userId}`)
        setDoctor(doctor.data)
    }, [postId])

    return (
        <ScrollView style={styles.container}>
            { post.img !== "" && <Image style={styles.image} source={{uri: post.img}} />}
            <Text style={styles.title}>{post.title}</Text>
            <View style={styles.wrapper}>
                <Text style={styles.label}>Câu hỏi:</Text>
                <Text style={styles.description}>{post.description}</Text>
                <Text style={styles.label}>Trả lời: </Text>
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
                <Text style={styles.description}>{post.reply}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        width: "100%",
        height: 150,
        resizeMode: 'cover',
        zIndex: -1
    }, 
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 20,
        marginVertical: 16
    },
    wrapper: {
        paddingHorizontal: 18
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 6
    },
    description: {
        fontSize: 16,
        marginBottom: 6
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInfo: {
        marginLeft: 10,
        marginVertical: 10
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
