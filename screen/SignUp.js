import React, { useState } from 'react'
import {color} from '../styles/styles'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Platform, 
    TextInput,
    StatusBar
} from 'react-native'


export default function SignUp({navigation}) {

    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        checkTextInputChange: false,
        secureTextEntry: true, 
        confirmSecureTextEntry: true 
    })

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
                checkTextInputChange: true
            })
        } else {
            setData({
                ...data,
                email: val,
                checkTextInputChange: false
            })
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        })
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirmPassword: val,
        })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirmSecureTextEntry: !data.confirmSecureTextEntry
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={color.PrimaryColor} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Đăng ký tài khoản</Text>
            </View>
            <Animatable.View 
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.textFooter}>Số Điện Thoại</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={24}/>
                    <TextInput 
                        placeholder="Nhập số điện thoại của bạn"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.checkTextInputChange ?
                    <Animatable.View
                        animation='bounceIn'
                    >
                        <Feather name='check-circle' color="green" size={24}/>
                    </Animatable.View>
                    : null }
                </View>
                <Text style={{...styles.textFooter, marginTop: 35}}>Mật khẩu</Text>
                <View style={styles.action}>
                    <Feather name="lock" color="#05375a" size={24}/>
                    <TextInput 
                        placeholder="Nhập mật khẩu của bạn"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                        <Feather name="eye-off" color="grey" size={24}/>
                        : 
                        <Feather name="eye" color="grey" size={24}/> }
                    </TouchableOpacity>
                </View>
                <Text style={{...styles.textFooter, marginTop: 35}}>Nhập Lại Mật khẩu</Text>
                <View style={styles.action}>
                    <Feather name="lock" color="#05375a" size={24}/>
                    <TextInput 
                        placeholder="Nhập lại mật khẩu của bạn"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={data.confirmSecureTextEntry}
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecureTextEntry}
                    >
                        {data.confirmSecureTextEntry ?
                        <Feather name="eye-off" color="grey" size={24}/>
                        : 
                        <Feather name="eye" color="grey" size={24}/> }
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity 
                        style={{
                            ...styles.signIn,
                            backgroundColor: color.BlueColor,
                        }}
                    >
                        <Text 
                            style={{
                                ...styles.textSign,
                                color: 'white',
                            }}
                        >
                            Đăng Ký
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            ...styles.signIn, 
                            borderColor: color.BlueColor, 
                            borderWidth: 1, 
                            marginTop: 15   
                        }}
                    >
                        <Text 
                            style={{
                                ...styles.textSign,
                                color: color.BlueColor,
                            }}
                        >
                            Đăng Nhập
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.PrimaryColor,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    textHeader: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    textFooter: {
        color: color.BlueColor,
        fontSize: 22,
        marginBottom: 4
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        color: '#05375a',
        marginTop: Platform.OS === 'ios' ? 0 : -12, 
        paddingLeft: 10,
        fontSize: 20
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})
