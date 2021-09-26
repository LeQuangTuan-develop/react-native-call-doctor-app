import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Loading from '../components/LoadingItem'
import PostItem from '../components/PostItem'
import QuestionItem from '../components/QuestionItem'
import Api from '../util/Api'
import Feather from 'react-native-vector-icons/Feather'
import {color} from '../styles/styles'

export default function Community({navigation}) {
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect( async () => {
        const postList = await Api.get("/posts/all")
        setPosts(postList.data)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        navigation.setOptions({
            title: "Cộng đồng",
            headerRight: () => (
                <View style={{marginRight: 14}}>
                    <Feather color={color.PrimaryColor} name="search" size={30} />
                </View>
            ),
        })
    }, [navigation])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading 
                ?
                <Loading />
                :
                <FlatList data={posts} 
                    renderItem={({item}) => 
                        <View style={{paddingHorizontal: 10}}>
                            <PostItem post={item} onPressBtn={() => navigation.navigate('PostDetail', {postId: item._id})}/>
                        </View>
                    }
                    keyExtractor={(item) => `${item._id}`}
                    ListHeaderComponent={
                        <View style={styles.searchBox}> 
                            <QuestionItem />
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
        backgroundColor: '#f0f8fa',
        paddingBottom: 20,
    },
    searchBox: {
        flex: 1,
    }
})
