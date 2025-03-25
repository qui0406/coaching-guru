import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Image, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { useRouter } from 'expo-router'

import Colors from './../../constant/Colors'
import {auth, db} from './../../config/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { UserDetailContext } from '../../context/UserDetailContext'

export default function signIn() {
    const router= useRouter()
    const [email, setEmail]= useState()
    const [password, setPassword]= useState()
    const {userDetail, setUserDetail}= useContext(UserDetailContext)
    const [loading, setLoading]= useState(false);

    const signInClick=()=>{
        setLoading(true)
         signInWithEmailAndPassword(auth, email, password)
        .then(async (res)=>{
            const user= res.user
            console.log(user)
            await getUserDetail()
            setLoading(false)
            router.replace('/(tabs)/home')}
            )
        .catch(err=> {
            console.log(err)
            setLoading(false)
            ToastAndroid.show('Incorrect Email or Password', ToastAndroid.BOTTOM)
        })
    }

    const getUserDetail= async ()=> {
        const result= await getDoc(doc(db, 'users', email))
        console.log(result.data())
        setUserDetail(result.data())
    }
  return (
    <View style={{
            display: 'flex', 
            flex: 1,
            alignItems: 'center', 
            paddingTop: 100, 
            backgroundColor: Colors.WHITE}}
            >
            <Image source={require('./../../assets/images/logo.png')} 
          style={{height: 180, width: 180}}></Image>
            <Text style={{fontSize: 30, fontFamily: 'outfit-bold'}}>Welcome back</Text>
            <TextInput onChangeText={(value)=>setEmail(value)} style={styles.textInput} placeholder="Email"></TextInput>
            <TextInput onChangeText={(value)=>setPassword(value)} style={styles.textInput} secureTextEntry={true} placeholder="Password"></TextInput>
    
            <TouchableOpacity onPress={signInClick} disabled={loading} style={{
                padding: 15,
                width: '80%',
                marginTop: 25,
                borderRadius: 10,
                backgroundColor: Colors.PRIMARY, 
                alignItems: 'center'}}>
                { !loading ? <Text style={{fontFamily:'outfit', fontSize: 20, color: Colors.WHITE, textAlign: 'center'}}>Sign In</Text>: <ActivityIndicator size="large" color={Colors.WHITE}></ActivityIndicator>}
                
            </TouchableOpacity>
            <View style={
                {display: 'flex', 
                flexDirection: 'row', 
                marginTop: 20, 
                gap: 5}
            }>
                <Text style={{fontFamily :'outfit'}}>Don't have an account</Text>
                <Pressable onPress={()=> router.push('/auth/signUp')}>
                    <Text style= {{fontFamily: 'outfit-bold', color: Colors.PRIMARY}}>
                        Create New Here
                    </Text>
                </Pressable>
            </View>
        </View>
  )
}

const styles= StyleSheet.create({
    textInput: {
        borderWidth: 1,
        width: '80%',
        padding: 15, 
        fontSize: 18,
        marginTop: 20,
        borderRadius: 8
    }
})