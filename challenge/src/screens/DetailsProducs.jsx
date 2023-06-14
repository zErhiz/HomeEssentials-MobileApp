import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import apiUrl from '../../api';



export default function ProductDetail() {
    const route = useRoute();
    const prodId = route.params?.id;
 
  
  console.log(prodId);
  let [prodOne, setProdOne] = useState([]);

  useEffect(() => {
    axios(`${apiUrl}products/${prodId}`)
      .then(res => {
        setProdOne(res.data.response);
        })
      .catch(err => console.log(err));
  }, [prodId]);
console.log(prodOne)



const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("user");
    const token = await AsyncStorage.getItem("token");
    const user = JSON.parse(userData);
    const email = user.email;
    const headers = { headers: { 'authorization': `Bearer ${token}` } };
    return { email, headers };
  } catch (error) {
    console.log(error);
    // Handle error if needed
  }
};

// Adding a product
const addProduct = async (product_id) => {
  try {
    const { email, headers } = await getUserData();
    const data = { userEmail: email, productId: product_id };
    const response = await axios.post(`${apiUrl}cart/create`, data, headers);
    console.log(response.data.message);
    Alert.alert("The product has been added to your cart!", "check it!.");
  } catch (error) {
    console.log(error);
    Alert.alert("error something went wrong");
  }
};





  return (
    <View style={{ padding: 6, justifyContent: 'center', alignItems: 'center',borderColor:"black",borderWidth:2 }}>
      <View style={{ border: 1, padding: 6, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2,borderColor:"black",borderWidth:2, height:"90%",width:"100%"  }}>
        <Image source={{ uri: prodOne.photo }} style={{ height: 300, width: "100%", borderRadius: 10, borderColor:"black",borderWidth:2 }} />

        <View style={{ marginTop: 12 }}>
          <Text style={{ textAlign: 'center', fontSize: 24 }}>{prodOne.name}</Text>
        </View>

        <View style={{ marginTop: 12, alignItems:"flex-start",padding:20 }}>
          <Text style={{ textAlign: 'left',fontSize:20 }}>{prodOne.description}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 12 }}>
          <Text style={{ fontSize: 20, backgroundColor: 'orange', color: 'white', padding: 8, borderRadius: 10, fontWeight: 'bold' }}>
            ${prodOne.price}
          </Text>
          <TouchableOpacity  onPress={(e)=> {
                e.preventDefault()
                addProduct(prodOne._id)
              }} style={{backgroundColor:"purple" , padding: 3, borderRadius: 10,}}>
          <Text style={{color:"white", fontSize: 20, fontWeight:"bold"}}>Add to cart </Text>  
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}