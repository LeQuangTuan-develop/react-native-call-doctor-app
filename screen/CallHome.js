import React, {useState, useEffect} from 'react'
import {View, FlatList, StyleSheet, ScrollView} from 'react-native'
import CategoryItem from '../components/CategoryItem'
import SearchVoice from '../components/SearchVoice'
import {color} from '../styles/styles'

export default function CallHome({navigation}) {
    const categories = [
        { id: 1, categoryName: 'Tim Mạch', image: 'https://i.ibb.co/MsxNC8w/heart.png', color: 'white', color: color.PrimaryColor },
        { id: 2, categoryName: 'Não', image: 'https://i.ibb.co/8M6vS26/fa-solid-brain.png', color: color.OrangeColor},
        { id: 3, categoryName: 'Huyết Áp', image: 'https://i.ibb.co/CbpzfNp/huyetap.png', color: color.BlueColor},
        { id: 4, categoryName: 'Tiểu Đường', image: 'https://i.ibb.co/hK3d6ML/tieuduong.png', color: color.RedColor},
        { id: 5, categoryName: 'Thận', image: 'https://i.ibb.co/CzR90Lp/whh-kidney.png', color: color.PrimaryColor},
        { id: 6, categoryName: 'Mắt', image: 'https://i.ibb.co/fxK5vpP/eyes.png', color: color.BlueColor},
        { id: 7, categoryName: 'Xương Khớp', image: 'https://i.ibb.co/gFX6ksQ/teeth.png', color: color.OrangeColor },
        { id: 8, categoryName: 'Thần Kinh', image: 'https://i.ibb.co/HYVyMhr/stomach.png', color: color.RedColor},
    ]

    const [categoryList, setCategoryList] = useState(categories)

    useEffect(() => {
        setCategoryList(categories)
    }, [categories])

    return (
        <FlatList data={categoryList}
            renderItem={({item}) => 
                <View style={styles.wrapper}>
                    <CategoryItem  
                        category={item} 
                        onPressBtn={() => 
                            {navigation.navigate('CallDoctorList', {itemId: item.id, categoryName: item.categoryName})}
                        }
                    />
                </View>
            }
            numColumns={2}
            keyExtractor={(item) => `${item.id}`}
            ListHeaderComponent={
                <View style={styles.searchBox}> 
                    <SearchVoice />
                </View>
            }
            contentContainerStyle={styles.container} 
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 14
    },
    searchBox: {
        flex: 1,
        paddingHorizontal: 10, 
        paddingBottom: 16
    }, 
    wrapper: {
        flex: 1,
        marginHorizontal: 8
    }
})
