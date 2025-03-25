import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native';
import Colors from './../constant/Colors';
import { useRouter } from 'expo-router';
import {onAuthStateChanged} from 'firebase/auth';
import { auth, db } from './../config/firebaseConfig';
import { UserDetailContext } from './../context/UserDetailContext';
import { useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';

export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  
  onAuthStateChanged(auth, async (user) => {  
    if (user) {
      console.log(user)
      const result = await getDoc(doc(db, 'users', user.uid))
      setUserDetail(result.data())
      router.replace('./(tabs)/home')
    }
  })
  
  return (
    <View>
      <Image source={require('./../assets/images/landing.png')} className='w-full mt-70 h-300'></Image>
      <View className='h-full rounded-tl-3xl rounded-tr-3xl pd-25' style={{ backgroundColor: Colors.PRIMARY }}>
        <Text className='mt-10 text-3xl font-bold text-center' style={{color: Colors.WHITE}}>Welcome Coaching Guru</Text>
        <Text style={{fontSize: 18, color: Colors.WHITE, margin: 10, textAlign: 'center'}}>Transform your ideas into engaging educational content, effortlessly with A!!!</Text>
        <View>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push('./auth/signUp')}>
            <Text style={styles.buttonText}>Get start!!!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {
            backgroundColor: Colors.PRIMARY,
            borderWidth: 1,
            borderColor: Colors.WHITE,
           
          }]} onPress={() => router.push('./auth/signIn')}>
            <Text style={[styles.buttonText, {color: Colors.WHITE}]}>Already an Acount!!!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.PRIMARY,
    fontSize: 18,
    fontFamily: 'outfit-bold',
  }
  
})