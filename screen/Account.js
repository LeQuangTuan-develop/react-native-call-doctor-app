import React, { useContext, useEffect } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import {AuthContext} from '../context/Authcontext'

export default function Account({navigation}) {
    const {signOut} = useContext(AuthContext)

    useEffect(() => {
        navigation.setOptions({
            title: "Tài khoản"
        })
    }, [navigation])

    return (
        <TouchableOpacity onPress={signOut} style={{flex: 1}} >
            <View style={{alignItems: 'center', marginTop: 10}}>
                <Text>Đăng xuất</Text>
            </View>
        </TouchableOpacity>
    )
}
