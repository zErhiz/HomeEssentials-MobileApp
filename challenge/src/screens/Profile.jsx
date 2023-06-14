import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import apiUrl from '../../api';

import HomeScreen from './Home';

const Profile = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const isFocused = useIsFocused();

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, [isFocused]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener el usuario de AsyncStorage
    const getUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        setUser(JSON.parse(user));
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    getUser();
  }, [isFocused]);

  const backHome = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const headers = { headers: { Authorization: `Bearer ${token}` } };
  
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await axios.post(apiUrl + 'auth/signout', null, headers);
  
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
  
            Alert.alert('Goodbye', 'You have been logged out we hope to see you again ;( .', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('SignIn'),
              },
            ]);
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
if(token){
  return (
    <ImageBackground
    source={{ uri: 'https://i.pinimg.com/474x/9f/da/67/9fda674a358754b0831ab235f4bf4057.jpg' }}
    style={{flex: 1, }}>  
    <View style={{justifyContent:"center",gap:20,alignItems:"center",width:"100%"}}>
      {user && (
        <View style={{  width:"90%", height:"50%",alignItems:"center", gap:40}}>
          {user.photo ? (
            <Image style={{ width: "35%", height: "50%", }} source={{ uri: user.photo }} />
          ): <Image style={{ width: "35%", height: "50%", }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png" }} />}
          <Text style={{fontSize:24, color:"white",fontWeight:"bold"}}>{user.email}</Text>
        </View>
      )}

      <TouchableOpacity style={{borderColor:"black",borderWidth:2, height:"10%", width:"50%", alignItems:"center",justifyContent:"center", backgroundColor:"red", borderRadius:50}} onPress={backHome}>
        <Text style={{color:"white", fontWeight:"bold", fontSize:20}}>Logout</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );}
  else{
    return <HomeScreen/>
  }
};

export default Profile;