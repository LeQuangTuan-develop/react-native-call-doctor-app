import React from 'react'
import {color} from '../styles/styles'
import * as Animatable from 'react-native-animatable';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    Image, 
    TouchableOpacity,
    StatusBar
} from 'react-native'

export default function SignUp({navigation}) {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={color.PrimaryColor} barStyle="light-content"/>
            <View style={styles.header}>
                <Animatable.Image 
                    animation="bounceIn"
                    duration={1500}
                    source={require('../assets/logo1.png')} 
                    resizeMode='stretch'
                    style={styles.logo}
                />
            </View>
            <Animatable.View 
                style={styles.footer}
                animation="fadeInUpBig"
            >
                <Text style={styles.title}>
                    Người bạn sức khỏe luôn đồng hành cùng bạn
                </Text>
                <Text style={styles.text}>
                    Đăng nhập với tài khoản
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignIn')}
                    style={{
                        ...styles.button, 
                        backgroundColor: color.BlueColor, 
                        marginTop: 40
                    }}
                >
                    <Text style={{...styles.textSign, color: "white"}}>Bắt đầu</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

const {height} = Dimensions.get("screen")
const heightLogo = height * 0.28

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.PrimaryColor,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: heightLogo,
        height: heightLogo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5, 
        fontSize: 20
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    button: {
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

