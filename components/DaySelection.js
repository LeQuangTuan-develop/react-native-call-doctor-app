import React from 'react'
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {color} from '../styles/styles'

export default function DaySelection() {
    return (
        <View style={styles.calender}>
            <CalendarStrip
                scrollable
                style={{height:150, paddingTop: 30, paddingBottom: 20}}
                calendarColor={'white'}
                calendarHeaderStyle={{color: 'black', fontSize: 20}}
                highlightDateNumberStyle={{color: color.PrimaryColor, fontSize: 18}}
                highlightDateNameStyle={{color: color.PrimaryColor, fontSize: 18}}
                dateNumberStyle={{color: 'black', fontSize: 14}}
                dateNameStyle={{color: 'black', fontSize: 14}}
                iconContainer={{flex: 0.1}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    calendar: {
        paddingHorizontal: 20,
    }
})
