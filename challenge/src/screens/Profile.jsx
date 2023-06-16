import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import apiUrl from '../../api';
import Icons from "react-native-vector-icons/MaterialIcons"
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
  if (token) {
    return (
      <View
        style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
          {user && (
            <View style={{ width: "80%", height:400, alignItems: "flex-start", justifyContent: "center", gap: 20 }}>
              {user.photo ? (
                <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: user.photo }} />
              ) : <Image style={{ width: "35%" }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png" }} />}
              <Text style={{ fontSize: 16, color: "#393939", fontWeight: "400" }}>{user.name}</Text>
              <Text style={{ fontSize: 16, color: "#393939", fontWeight: "400" }}>{user.lastName}</Text>
              <Text style={{ fontSize: 16, color: "#393939", fontWeight: "400" }}>{user.email}</Text>
            </View>
          )}

        </View>
        <View style={{
          width: "100%",
          alignItems:"center",
          justifyContent: "flex-end",
        }}>
          <TouchableOpacity style={{
            position: "relative",
            height: 50,
            width: 140,
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "red",
            flexDirection: "row",
            borderRadius: 50
          }} onPress={backHome}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Logout</Text>
            <Icons name="logout" size={30} color='#fff' /> 
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  else {
    return <HomeScreen />
  }
};

export default Profile;