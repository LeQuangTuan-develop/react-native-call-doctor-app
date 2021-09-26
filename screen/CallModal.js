import React, { useEffect } from 'react'
import { Text, View, Button } from 'react-native'

export default function CallModal({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            title: "Liên lạc gần đây"
        })
    }, [navigation])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Chưa có cuộc gọi nào ở hiện tại!</Text>
            <Button onPress={() => navigation.goBack()} title="Trở lại" />
        </View>
    );
}
