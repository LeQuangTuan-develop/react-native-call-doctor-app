import React, {useState, useEffect} from 'react'
import {View, FlatList, StyleSheet, StatusBar} from 'react-native'
import CategoryItem from '../components/CategoryItem'
import SearchVoice from '../components/SearchVoice'
import Api from '../util/Api'
import Loading from '../components/LoadingItem'

export default function CallHome({navigation}) {
    const [categoryList, setCategoryList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect( async () => {
        const cates = await Api.get("/categories/all")
        setCategoryList(cates.data)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            title: "Trang chủ"
        })
    }, [navigation])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor="white" barStyle="dark-content"/>
            {isLoading 
                ? 
                <Loading />
                :
                <FlatList data={categoryList}
                    renderItem={({item}) => 
                        <View style={styles.wrapper}>
                            <CategoryItem  
                                category={item} 
                                onPressBtn={() => 
                                    {navigation.navigate('CallDoctorList', {itemId: item._id, categoryName: item.categoryname})}
                                }
                            />
                        </View>
                    }
                    numColumns={2}
                    keyExtractor={(item) => `${item._id}`}
                    ListHeaderComponent={
                        <View style={styles.searchBox}> 
                            <SearchVoice />
                        </View>
                    }
                    contentContainerStyle={styles.container} 
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 14,
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
