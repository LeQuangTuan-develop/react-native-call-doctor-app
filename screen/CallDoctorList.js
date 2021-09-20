import React, {useState, useEffect} from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import DoctorItem from '../components/DoctorItem'

export default function CallDoctorList({route, navigation}) {
    const {categoryName} = route.params 

    const doctors = [
        {id: 1, name: 'Bác sĩ Mua', starAveraged: 4.9, starNum: 411, img: "https://zpsocial-f42-org.zadn.vn/89418b993275de2b8764.jpg", online: true},
        {id: 2, name: 'Bác sĩ Lộc', starAveraged: 4.9, starNum: 389, img: "https://zpsocial-f44-org.zadn.vn/0e008aa58c0661583817.jpg", online: true},
        {id: 3, name: 'Bác sĩ Khánh', starAveraged: 4.7, starNum: 377, img: "https://zpsocial-f44-org.zadn.vn/9b1b247fed6b0135587a.jpg", online: true},
        {id: 4, name: 'Dược sĩ Tâm', starAveraged: 4.7, starNum: 365, img: "https://f37-org-zp.zdn.vn/787cdf681c17f149a806.jpg", online: false},
        {id: 5, name: 'Bác sĩ Duyên', starAveraged: 4.7, starNum: 362, img: "https://zpsocial-f47-org.zadn.vn/15a18b2294787b262269.jpg", online: false},
        {id: 6, name: 'Dược sĩ Nhi', starAveraged: 4.5, starNum: 375, img: "https://zpsocial-f46-org.zadn.vn/371b7c532fd8c3869ac9.jpg", online: false},
        {id: 7, name: 'Bác sĩ Khương', starAveraged: 4.3, starNum: 478, img: "https://zpsocial-f45-org.zadn.vn/8ae611918875642b3d64.jpg", online: false},
        {id: 8, name: 'Bác sĩ Phúc', starAveraged: 4.3, starNum: 312, img: "https://f32-org-zp.zdn.vn/7c2997da5f6cb532ec7d.jpg", online: false},
        {id: 9, name: 'Bác sĩ Hương', starAveraged: 4.3, starNum: 298, img: "https://zpsocial-f41-org.zadn.vn/4cb23a082d43c11d9852.jpg", online: false},
    ]

    const [doctorList, setDoctorList] = useState(doctors)

    // useEffect(() => {
    //     setDoctorList(doctors)
    // }, [doctors])

    useEffect(() => {
        navigation.setOptions({
            title: categoryName
        })
    }, [categoryName, navigation])

    return (
        <View style={styles.container}>
            <FlatList data={doctorList} 
                renderItem={({item}) => 
                    <View style={{paddingHorizontal: 20}}>
                        <DoctorItem doctor={item} onPressBtn={() => navigation.navigate('CallBooking', {doctorId: item.id})}/>
                    </View>
                }
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={styles.wrapper}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ffffff'
    },
    wrapper: {
        paddingBottom: 20,
    }
})
