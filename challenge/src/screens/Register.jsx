import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Input, Button } from "react-native-elements";
import { StylesNew } from "../../styles/Stylescss";
import apiUrl from "../../api";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, TouchableOpacity, Alert,Image,ImageBackground  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
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
const handleSignInPress = () =>{
    navigation.navigate("SignIn")
  }
  return (
    <ImageBackground
    source={{ uri: 'https://i.pinimg.com/474x/4c/c0/20/4cc0202da94f3c7cf41c267e3f3e7011.jpg' }}
    style={{flex: 1, }}> 
    <View>
    <View style={{ height:"30%", marginTop:24, justifyContent:"center"}}> 
      <View style={{ alignItems:"center",height:"50%"}}>
    <Image style={{ height: "100%", width: "20%", }} source={{ uri: 'https://i.ibb.co/rs01RXm/image.png' }} />
    </View>
    <View style={{width:"100%", alignItems:"center"}}>
      <Text style={{fontSize: 24, color:"black",fontWeight:"bold"}}> Welcome!</Text>
      <Text style={{color:"#1F1F1F", width:"80%"}}>Join the best home goods marketplace, discover furniture for your home, track your progress, have fun, and buy furniture. </Text>
      </View>
      </View>

      <Input
        placeholder="Email"
        placeholderTextColor="black"
        leftIcon={<Icon name="envelope" size={24} color="purple" />}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Password"
        placeholderTextColor="black"
        leftIcon={<Icon name="lock" size={24} color="purple" />}
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={{ height: "10%", padding:5}} /* onPress={selectPhoto} voton elegir image */>
      <LinearGradient
           colors={['#403d56', '#ccbcb4']}
           start={{ x: 0, y: 1 }}
           end={{ x: 0, y: 0 }}
        style={{width:"100%", height:"100%",  justifyContent:"center", justifyContent:"center", alignContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:18,}}>Select an profile image</Text>
        </LinearGradient>
      </TouchableOpacity>

      {image && <Text>Selected Photo: {image}</Text>}
      <View style={{ height:"10%", justifyContent:"center", alignItems:"center",marginTop:20}}> 
  <TouchableOpacity style={{height: "100%", width:"100%", justifyContent:"center",alignItems:"center"}}/*  onPress={handleForm} boton pa cuando ande */>
     <LinearGradient
          colors={['#403d56','#6474a3']}
        style={{width:"40%", height:"100%",  justifyContent:"center", borderRadius:50, justifyContent:"center", alignContent:"center",alignItems:"center"}}>
      <Text style={{color:"white", fontWeight:"bold", fontSize:20}}>Register</Text>
     </LinearGradient>
   </TouchableOpacity>
   <Text style={StylesNew.signUpText}>
        Already have an account? <Text  onPress={handleSignInPress } style={StylesNew.signUpLink} >Sign In!</Text>
      </Text>
      </View>
    </View>
    </ImageBackground>
  );
}

export default Register;