import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, ImageBackground, Pressable, Alert, TouchableOpacity,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StylesNew } from "../../styles/Stylescss";
import { LinearGradient } from 'expo-linear-gradient';


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
  const handleHomePress = () =>{
    navigation.navigate("Home")
  }
  return (
    <ImageBackground
    source={{ uri: 'https://i.pinimg.com/474x/9e/2a/49/9e2a492bebd5cd759309d90e89377b02.jpg' }}
    style={{flex: 1, }}> 
    <View>
      <View style={{ height:"30%", marginTop:20, justifyContent:"center"}}> 
      <View style={{ alignItems:"center",height:"50%"}}>
    <Image style={{ height: "100%", width: "20%", }} source={{ uri: 'https://i.ibb.co/rs01RXm/image.png' }} />
    </View>
    <View style={{width:"100%", alignItems:"center"}}>
      <Text style={{fontSize: 24, color:"black",fontWeight:"bold"}}> Welcome <Text style={{fontWeight:"bold",color:"purple", fontSize: 20,}}>back</Text>!</Text>
      <Text style={{color:"#1F1F1F", width:"80%"}}>Discover furniture for your home, track your progress, have fun, buy furniture. </Text>
      </View>
      </View>
      <Input
      style={{width: "100%", height: "20%", }}
  placeholder="Email"
  placeholderTextColor="black"
  leftIcon={<Icon name="envelope" size={24} color="purple" />}
  value={email}
  onChangeText={text => setEmail(text)} // Actualizar el valor de email
/>
      <Input
        style={{width: "100%", height: "20%",}}
  placeholder="Password"
  placeholderTextColor="black"
  leftIcon={<Icon name="lock" size={24} color="purple" />}
  secureTextEntry
  value={password}
  onChangeText={text => setPassword(text)} 
/>
        
<TouchableOpacity  style={{ height:"10%", alignItems:"center"}} /* onPress={handleFormSubmit} hacer funcion handleformSubmit cuando este todo bien andando el front */ >
<LinearGradient
        colors={['#403d56','#6474a3']}
        style={{width:"50%", height:"100%",  justifyContent:"center", borderRadius:50}}>
      <Text style={StylesNew.buttonTextSignIn}>Submit</Text>
 </LinearGradient>
    </TouchableOpacity>
      <Text style={StylesNew.signUpText}>
        Don't have an account yet?  <Text  onPress={handleSignUpPress} style={StylesNew.signUpLink} >Sign up</Text>
      </Text>
      <Text style={StylesNew.signUpText}>
        Go back to <Text onPress={handleHomePress } style={StylesNew.signUpLink} >home page</Text>
      </Text>
   
    </View>
    </ImageBackground>
  );
};

export default SignIn;