import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from "react-native-elements";
import { StylesNew } from "../../styles/Stylescss";
import apiUrl from "../../api";

import Icon from "react-native-vector-icons/FontAwesome";
import Camera from "react-native-vector-icons/MaterialCommunityIcons";
import User from "react-native-vector-icons/FontAwesome"

import { Text, View, TouchableOpacity, Alert, Image, ImageBackground } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../assets/Logos/logo-2-b.png'
import Fondo from '../../assets/Registermob.png'

const Register = () => {
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const handleForm = () => {
    if (!email || !password || !photo) {
      Alert.alert('Missing Fields', 'Please fill in all the fields', [{ text: 'Ok' }]);
      return;
    }

  }
  const handleSignInPress = () => {
    navigation.navigate("SignIn")
  }

  return (
    <ImageBackground
      source={Fondo}
      style={{ flex: 1, height: 780 }}
    >
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", paddingTop: 13, marginHorizontal: 10 }}>
        <View style={StylesNew.containerRegAndSignin}>

          <Text style={{ fontSize: 32, marginTop: 5, color: '#7847E0', fontWeight: "bold" }}> Welcome!</Text>

          <View style={{
            width: "80%",
            height: 340,
            display: "flex",
            alignItems: "center"
          }}>
            <Input
              placeholder="Name"
              style={StylesNew.inputs}
              placeholderTextColor='#39393960'
              leftIcon={<User name="user-circle" size={15} color='#7847E0' />}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <Input
              placeholder="Last Name"
              style={StylesNew.inputs}
              placeholderTextColor='#39393970'
              leftIcon={<User name="user-circle-o" size={15} color='#7847E0' />}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <Input
              placeholder="Email"
              style={StylesNew.inputs}
              placeholderTextColor='#39393970'
              leftIcon={<Icon name="envelope" size={15} color='#7847E0' />}
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <Input
              placeholder="Password"
              style={StylesNew.inputs}
              placeholderTextColor='#39393970'
              leftIcon={<Icon name="lock" size={20} color='#7847E0' />}
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity style={{ height: 50, width: "95%" }} /* onPress={selectPhoto} voton elegir image */>
              <LinearGradient
                colors={['#7847E040', '#fff']}
                start={{ x: 0, y: 2 }}
                end={{ x: 0, y: 0 }}
                style={{
                  width: "100%", flex: 1, height: 20, flexDirection: "row", borderRadius: 5, justifyContent: "space-evenly", alignItems: "center"
                }}>
                <Text style={{ fontSize: 16, color: "#393939" }}>Select an profile image</Text>
                <Camera name="camera-plus-outline" size={25} color='#393939' />
              </LinearGradient>
            </TouchableOpacity>

            <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20
            }}>
              <View style={{
                height: 3,
                width: 230,
                backgroundColor: "#7847E0",
              }}></View>
            </View>

          </View>

          {image && <Text>Selected Photo: {image}</Text>}
          <View style={{ 
            alignItems: "center", 
            height: 95, 
            justifyContent: "space-evenly" 
          }}>

            <TouchableOpacity style={{ width: "100%", justifyContent: "center", alignItems: "center" }}/*  onPress={handleForm} boton pa cuando ande */>
              <LinearGradient
                colors={['#FF8A00', '#FF8A00']}
                style={{ width: 140, height: 45, justifyContent: "center", borderRadius: 50, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={StylesNew.signUpText}>
              Already have an account? <Text onPress={handleSignInPress} style={StylesNew.signUpLink} >Sign In!</Text>
            </Text>

          </View>

        </View>
      </View>
    </ImageBackground>
  );
}

export default Register;