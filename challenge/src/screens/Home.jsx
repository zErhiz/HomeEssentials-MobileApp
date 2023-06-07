import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';


const HomeScreen = () => {

    const navigation = useNavigation();

  return (
    <ImageBackground
    source={{ uri: 'https://i.pinimg.com/564x/39/52/8a/39528a8cfcae17ba21b82cc4b790cfd1.jpg' }}
    style={{flex:1,}}
  >
      <View style={{alignItems:"center", justifyContent: "center",flex:1, borderColor:"black",borderWidth:2, gap:40, padding:29}} >
        <Text style={{fontSize:40}} >Home Essentials</Text>
        <Text style={{fontSize:13}}>Welcome to our Home Furniture Emporium! Discover exquisite furniture pieces for your dream home. From luxurious sofas to functional storage solutions, we have it all. Shop with confidence and create the perfect space with us! </Text>
        <TouchableOpacity   onPress={() => navigation.navigate('SignIn')}
        style={{borderRadius:50, width:150,height:50, alignItems:"center",justifyContent:'center', backgroundColor:"#403d56"}}>  
                    <Text style={{color:"white", fontWeight:"bold"}}>Sign In!</Text>
        </TouchableOpacity>
      </View>

</ImageBackground>

  );
};

export default HomeScreen;