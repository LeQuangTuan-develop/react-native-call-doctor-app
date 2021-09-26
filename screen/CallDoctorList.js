import React, {useState, useEffect} from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import DoctorItem from '../components/DoctorItem'
import Api from '../util/Api'
import Loading from '../components/LoadingItem'

export default function CallDoctorList({route, navigation}) {
    const {categoryName, itemId} = route.params 

    const [doctorList, setDoctorList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( async () => {
        const doctors = await Api.get(`/doctors/${itemId}`)
        setDoctorList(doctors.data)
        setIsLoading(false)
    }, [itemId])

    useEffect(() => {
        navigation.setOptions({
            title: categoryName
        })
    }, [categoryName, navigation])

    return (
        <View style={styles.container}>
            {isLoading 
                ?
                <Loading />
                :
                <FlatList data={doctorList} 
                    renderItem={({item}) => 
                        <View style={{paddingHorizontal: 20}}>
                            <DoctorItem doctor={item} onPressBtn={() => navigation.navigate('CallBooking', {doctorId: item._id})}/>
                        </View>
                    }
                    keyExtractor={(item) => `${item._id}`}
                    contentContainerStyle={styles.wrapper}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ffffff',
        flex: 1
    },
    wrapper: {
        paddingBottom: 20,
    }
})
