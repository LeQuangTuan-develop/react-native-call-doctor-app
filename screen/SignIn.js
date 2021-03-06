import React, { useContext, useState } from 'react'
import {color} from '../styles/styles'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../context/Authcontext'
import Users from '../model/Users'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Platform, 
    TextInput,
    StatusBar,
    Alert
} from 'react-native'


export default function SignIn({navigation}) {

    const [data, setData] = useState({
        phone: '',
        password: '',
        checkPhoneInputChange: false,
        checkPassInputChange: false,
        secureTextEntry: true,
        isValidPhone: true,
        isValidPassword: true,
    })

    const { signIn } = useContext(AuthContext)

    const textPhoneInputChange = (val) => {
        if (val.trim().length == 10) {
            setData({
                ...data,
                phone: val,
                checkPhoneInputChange: true,
                isValidPhone: true
            })
        } else {
            setData({
                ...data,
                phone: val,
                checkPhoneInputChange: false,
                isValidPhone: true
            })
        }
    }

    const handleValidPhone = (val) => {
        if(val.trim().length == 10) {
            setData({
                ...data,
                isValidPhone: true
            })
        } else {
            setData({
                ...data,
                isValidPhone: false
            })
        }
    }

    const handleValidPassword = (val) => {
        if(val.trim().length >= 6) {
            setData({
                ...data,
                isValidPassword: true
            })
        } else {
            setData({
                ...data,
                isValidPassword: false
            })
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                password: val,
                checkPassInputChange: true,
                isValidPassword: true
            })
        } else {
            setData({
                ...data,
                password: val,
                checkPassInputChange: false,
                isValidPassword: true
            })
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const loginHandle = (phone, password) => {
        if (phone.length === 0 && password.length === 0) {
            Alert.alert("Th??ng tin tr???ng","S??? ??i???n tho???i v?? password kh??ng ???????c ????? tr???ng", [
                {text: "?????ng ??"}
            ])
            return
        }

        const userLogin = Users.filter(user => {
            return user.phone === phone && user.password === password;
        })

        if (userLogin.length > 0) {
            signIn(userLogin)
        } else {
            Alert.alert("Nh???p sai","sai m???t kh???u ho???c s??? ??i???n tho???i", [
                {text: "?????ng ??"}
            ])
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={color.PrimaryColor} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Ch??o m???ng b???n</Text>
            </View>
            <Animatable.View 
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.textFooter}>S??? ??i???n Tho???i</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#05375a" size={24}/>
                    <TextInput 
                        placeholder="Nh???p s??? ??i???n tho???i c???a b???n"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textPhoneInputChange(val)}
                        onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)}
                    />
                    {data.checkPhoneInputChange ?
                    <Animatable.View
                        animation='bounceIn'
                    >
                        <Feather name='check-circle' color="green" size={24}/>
                    </Animatable.View>
                    : null }
                </View>
                {!data.isValidPhone &&
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>S??? ??i???n tho???i ph???i c?? 10 k?? t???</Text>
                </Animatable.View> }
                <Text style={{...styles.textFooter, marginTop: 35}}>M???t kh???u</Text>
                <View style={styles.action}>
                    <Feather name="lock" color="#05375a" size={24}/>
                    <TextInput 
                        placeholder="Nh???p m???t kh???u c???a b???n"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={(val) => handlePasswordChange(val)}
                        onEndEditing={(elem) => handleValidPassword(elem.nativeEvent.text)}
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
                {!data.isValidPassword && 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>M???t kh???u ph???i d??i h??n 6 k?? t???</Text>
                </Animatable.View> }
                <View style={styles.button}>
                    <TouchableOpacity 
                        onPress={() => loginHandle(data.phone, data.password)}
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
                            ????ng nh???p
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
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
                            ????ng k??
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
        color: 'black',
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
    },
    errorMsg : {
        color: 'red',
        fontSize: 18
    }
})
