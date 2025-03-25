import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from '../Shared/Button'

export default function NoCourse() {
  return (
    <View style={{
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
    }}>
      <Image style={{
        width: 200,
        height: 200,
      }} source={require('./../../assets/images/book.png')}></Image>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25,
        textAlign: 'center',
      }}>You don't have any course</Text>
      <Button text={'+ Create New Course'}/>
      <Button text={'Explore Existing Courses'} type='outline'/>

    </View>
  )
}