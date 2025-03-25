import { View, Text, Image, StyleSheet, InputText, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from './../../constant/Colors'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../config/firebaseConfig'
import {UserDetailContext} from './../../context/UserDetailContext';



export default function signUp() {
    const router= useRouter()

    const [fullName, setFullName]= useState()
    const [email, setEmail]= useState()
    const [password, setPassword]= useState()
    const {userDetail, setUserDetail}= useContext(UserDetailContext)

    const CreateNewAccount= ()=> {
        createUserWithEmailAndPassword(auth, email, password)
        .then( async res=>{
            const user= res.user
            console.log(user)
            await SaveUser(user)
        })
        .catch(err=> console.log(err))
    }

    const SaveUser= async (user)=> {
        const data= {
            name: fullName,
            email: email,
            member: false,
            uid: user?.uid
        }
        await setDoc(doc(db, 'users', email),data )
        setUserDetail(data)
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
        <Text style={{fontSize: 30, fontFamily: 'outfit-bold'}}>Create An Account</Text>
        <TextInput style={styles.textInput} onChangeText={(value)=>setFullName(value)} placeholder="Full Name"></TextInput>
        <TextInput style={styles.textInput} onChangeText={(value)=>setEmail(value)} placeholder="Email"></TextInput>
        <TextInput style={styles.textInput} onChangeText={(value)=> setPassword(value)} secureTextEntry={true} placeholder="Password"></TextInput>

        <TouchableOpacity style={{
            padding: 15,
            width: '80%',
            marginTop: 25,
            borderRadius: 10,
            backgroundColor: Colors.PRIMARY, 
            alignItems: 'center'}} onPress={CreateNewAccount}>
            <Text style={{fontFamily:'outfit', fontSize: 20, color: Colors.WHITE, textAlign: 'center'}}>Create Account</Text>
            
        </TouchableOpacity>
        <View style={
            {display: 'flex', 
            flexDirection: 'row', 
            marginTop: 20, 
            gap: 5}
        }>
            <Text style={{fontFamily :'outfit'}}>Already have an account?</Text>
            <Pressable onPress={()=> router.push('/auth/signIn')}>
                <Text style= {{fontFamily: 'outfit-bold', color: Colors.PRIMARY}}>
                    Sign In Here
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
