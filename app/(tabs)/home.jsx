import { View, Text, Platform } from 'react-native'
import React, { useContext } from 'react'
import Header from '../../components/Home/Header'
import { UserDetailContext } from '../../context/UserDetailContext';
import Colors from './../../constant/Colors';
import NoCourse from '../../components/Home/NoCourse';

export default function Home() {
    // const {userDetail, setUserDetail} = useContext(UserDetailContext);
    return (
        <View style={{
            padding: 25,
            paddingTop: Platform.OS === 'ios' && 45,
            backgroundColor: Colors.WHITE,
        }}>
        <Header />
        <NoCourse />
        </View>
    )
}