import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { color } from '../styles/styles'

export default function LoadingItem() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
            <ActivityIndicator size="large" color={color.PrimaryColor}/>
        </View>
    )
}
