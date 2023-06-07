import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
const Cart = () => {
    return (
  
        <View style={{alignItems:"center", justifyContent: "center",flex:1, borderColor:"black",borderWidth:2,}} >
          <Text style={{fontSize:40}} >Home Essentials</Text>
          <Text >Find the perfect manga for you </Text>
  
        
          
        </View>
  
    );
  };

export default Cart