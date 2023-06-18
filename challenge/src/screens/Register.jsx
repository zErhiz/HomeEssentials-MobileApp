import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from "react-native-elements";
import { StylesNew } from "../../styles/Stylescss";
import apiUrl from "../../api";
import axios from "axios";

import Icon from "react-native-vector-icons/FontAwesome";
import Camera from "react-native-vector-icons/MaterialCommunityIcons";
import User from "react-native-vector-icons/FontAwesome"

import { Text, View, TouchableOpacity, Alert, Image, ImageBackground, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../assets/Logos/logo-2-b.png'
import Fondo from '../../assets/Registermob.png'

const Register = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  console.log(photo)

  const handleForm = async () => {
    
    if (!email || !password || !photo) {
      Alert.alert('Missing Fields', 'Please fill in all the fields', [{ text: 'Ok' }]);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('photo', {
      uri: photo.uri,
      type: 'image/jpeg',
      name: new Date() + '_profile'
    });

    try {
      const res = await axios.post(apiUrl + 'auth/signup', formData, {
        headers: {
          Accept: "application/json",
          'Content-Type': 'multipart/form-data'
        }
      });

      Alert.alert('User registered', 'Check your email to verify your account', [{ text: 'Ok' }]);
      navigation.navigate('/');
      console.log(res.data)
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      Alert.alert('Check the fields', errorMessage, [{ text: 'Ok' }]);
    }
  };

  const selectPhoto = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const fileType = selectedAsset.uri.endsWith('.png') ? 'image/png' : 'image/jpeg';

      const photoData = {
        uri: selectedAsset.uri,
        type: fileType,
        name: `photo.${fileType.split('/')[1]}`,
      };

      setImage(photoData);
      setPhoto(photoData);
    }
  };

  const handleSignInPress = () => {
    navigation.navigate("SignIn")
  }

  return (
    <ScrollView
      style={{
        backgroundColor:"transparent"
      }}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}>

      <ImageBackground
        source={Fondo}
        style={{ flex: 1, height: 770 }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 13 }}>
          <View style={StylesNew.containerReg}>

            <Text style={{ fontSize: 32, marginTop: 5, color: '#7847E0', fontWeight: "bold" }}> Welcome!</Text>

            <View style={{
              width: "75%",
              height: 335,
              display: "flex",
              alignItems: "center"
            }}>
              <Input
                placeholder="Name"
                style={StylesNew.inputs}
                placeholderTextColor='#39393960'
                leftIcon={<User name="user-circle" size={15} color='#7847E0' />}
                value={name}
                onChangeText={text => setName(text)}
              />
              <Input
                placeholder="Last Name"
                style={StylesNew.inputs}
                placeholderTextColor='#39393970'
                leftIcon={<User name="user-circle-o" size={15} color='#7847E0' />}
                value={lastName}
                onChangeText={text => setLastName(text)}
              />
              <Input
                placeholder="Email"
                style={StylesNew.inputs}
                placeholderTextColor='#39393970'
                leftIcon={<Icon name="envelope" size={15} color='#7847E0' />}
                value={email}
                onChangeText={text => setEmail(text)}
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

              <TouchableOpacity style={{ height: 42, width: "95%" }} onPress={selectPhoto}>
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
                margin: 15
              }}>
                <View style={{
                  height: 3,
                  width: 230,
                  backgroundColor: "#7847E0",
                }}></View>
              </View>

            </View>

            {image && <Icon style={{ position: "absolute", bottom: 170, right: 30, zIndex: 2 }} name="check-circle-o" size={45} color='#2e2e' />}

            <View style={{
              alignItems: "center",
              height: 95,
              justifyContent: "space-evenly"
            }}>

              <TouchableOpacity style={{ width: "100%", justifyContent: "center", alignItems: "center" }} onPress={handleForm}>
                <LinearGradient
                  colors={['#FF8A00', '#FF8A00']}
                  style={{ width: 140, height: 45, justifyContent: "center", borderRadius: 50, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>Register</Text>
                </LinearGradient>
              </TouchableOpacity>

              <Text style={StylesNew.signUpText}>
                Already have an account? <Text onPress={handleSignInPress} style={StylesNew.signUpLink}>Sign In!</Text>
              </Text>

            </View>

          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default Register;