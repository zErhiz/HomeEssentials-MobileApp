import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, ImageBackground, Pressable, Alert, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StylesNew } from "../../styles/Stylescss";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';
import Fondo from '../../assets/Signin.png'
import User from "react-native-vector-icons/FontAwesome"
import axios from "axios";

import apiUrl from "../../api";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  console.log(email)
  console.log(password)
  console.log(apiUrl)

  //navigation 
  const handleSignUpPress = () => {
    navigation.navigate("Register");
  };
  const handleHomePress = () => {
    navigation.navigate("Home")
  }
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(apiUrl + "auth/signin", {
        email: email,
        password: password,
      });

      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      Alert.alert("Signed in!", "You have been successfully signed in.");


      navigation.navigate("Main");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while signing in.");
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      automaticallyAdjustKeyboardInsets={true}>

      <ImageBackground
        source={Fondo}
        style={{
          flex: 1,
          height: 770,
          paddingTop: 13,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center"
        }}>

        <View style={{
          backgroundColor: "#fff",
          height: "78%",
          width: "94%",
          borderRadius: 25,
          display: "flex",
          justifyContent: "center",
        }}>

          <View style={{ height: 145, justifyContent: "flex-start" }}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ fontSize: 32, color: '#7847E0', fontWeight: "bold" }}>Welcome back!</Text>
              <Text style={{ fontSize: 13, width: "80%", textAlign: "center", fontWeight: "200" }}>Welcome back, we are glad to see you here again, we wish you a happy purchase.</Text>
            </View>
          </View>

          <View style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <View style={{
              width: "75%",
              height: 250,
            }}>
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
            </View>
          </View>

          <View style={{
            alignItems: "center",
            height: 110,
            justifyContent: "space-evenly"
          }}>
            <TouchableOpacity style={{ alignItems: "center" }} onPress={handleFormSubmit}  >
              <LinearGradient
                colors={['#FF8A00', '#FF8A00']}
                style={{ width: 140, height: 45, justifyContent: "center", borderRadius: 50, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: "bold", textAlign: "center", fontSize: 15 }}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 10
            }}>
              <Text style={StylesNew.signUpText}>
                Don't have an account yet? <Text onPress={handleSignUpPress} style={StylesNew.signUpLink}>Sign up</Text>
              </Text>
              <Text style={StylesNew.signUpText}>
                Go back to <Text onPress={handleHomePress} style={StylesNew.signUpLink} >home page</Text>
              </Text>
            </View>
          </View>

        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default SignIn;