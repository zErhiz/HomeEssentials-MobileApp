import React, { useState, useEffect } from 'react';
import { Text, Image, View, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import ExploreProducts from './ExploreProducts';
import Logo from '../../assets/Logos/logo-2-b.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeBack from '../../assets/Homemobg.png'

const HomeScreen = () => {
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
  
  const navigation = useNavigation();

  return (
    <>
      {token ? (
        <ExploreProducts />
      ) : (
        <ImageBackground
          source={HomeBack}
          style={{ paddingTop: 10, height: 705, backgroundColor:"#fff", flex: 1, justifyContent: "flex-start", alignItems: "center" }}
        >
          <View style={{
            height: 600,
            width:"75%",
          }}>
            <View style={{ alignItems: "center", justifyContent:"center",flex: 1, borderRadius: 10, padding: 35 }} >
              <Image style={{ height: 38, width: 150 }} source={Logo} />
              <Text style={{ fontSize: 16, width: 250, fontWeight: "200", marginTop: 45, textAlign:"center" }}>Welcome to the store of great variety items for your home and lifestyle.</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}
                style={{ borderRadius: 50, width: 120, height: 45, marginTop: 20, alignItems: "center", justifyContent: 'center', backgroundColor: "#FF8A00" }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Sign In!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      )}
    </>
  );
};

export default HomeScreen;