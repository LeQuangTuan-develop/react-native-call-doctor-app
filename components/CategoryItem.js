import React from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {color} from '../styles/styles'

export default function CategoryItem({category, onPressBtn}) {
    return (
        <TouchableOpacity activeOpacity={0.3} onPress={onPressBtn}>
            <View style={{...styles.categoryBox, backgroundColor: color[category.color]}}>
                <Image style={styles.image} source={{uri: category.image}} />
            </View>
            <Text style={styles.name}>{category.categoryname}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
        tintColor: "white"
    },
    categoryBox: {
        backgroundColor: color.PrimaryColor,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        padding: 40,
    },
    name: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20
    }
})
