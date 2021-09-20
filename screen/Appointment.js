import React, { useContext } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import {AuthContext} from '../context/Authcontext'

export default function Appointment() {

    const {signOut} = useContext(AuthContext)

    return (
        <TouchableOpacity onPress={signOut} style={{flex: 1}} >
            <View style={{alignItems: 'center', marginTop: 10}}>
                <Text>Lịch Hẹn</Text>
            </View>
        </TouchableOpacity>
    )
}
