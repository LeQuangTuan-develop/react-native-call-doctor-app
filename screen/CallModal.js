import React from 'react'
import { Text, View, Button } from 'react-native'

export default function CallModal({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Danh sách liên lạc gần đây!</Text>
            <Button onPress={() => navigation.goBack()} title="Trở lại" />
        </View>
    )
}
