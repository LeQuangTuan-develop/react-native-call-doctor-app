import React, { useEffect } from 'react'
import {View, Text, Button} from 'react-native'

export default function Appointment({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
            title: "Lịch hẹn",
        })
    }, [navigation])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Bạn chưa có lịch hẹn nào!</Text>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Đặt lịch ngay"
        />
      </View>
    );
  }
