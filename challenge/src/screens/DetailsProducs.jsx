import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import apiUrl from '../../api';
import fondo from '../../assets/splash.png'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"


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
    <ImageBackground style={{ backgroundColor: "#fff" }}>
      <View style={{ border: 1, backgroundColor: "#fff", width: "100%", height: "100%" }}>
        <View style={{
          borderColor: "#7847E050", borderBottomWidth: 1.7, borderTopRightRadius: 30, borderTopLeftRadius: 30
        }}>
          <Image source={{ uri: prodOne.photo }} style={{ height: 290, width: "100%" }} />
        </View>


        <View style={{
          display: "flex",
          height: 300,
          justifyContent: "space-around",
          paddingHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 10,
        }}>
          <View style={{ marginTop: 12, borderColor: "black" }}>
            <Text style={{ textAlign: 'left', fontSize: 26, fontWeight: "500" }}>{prodOne.name}</Text>
          </View>
          <View style={{ justifyContent: 'space-evenly', alignItems: 'flex-end', gap: 5 }}>
            <Text style={{ fontSize: 26, color: "#7847E0", textAlign: 'left', paddingRight: 8, fontWeight: 'bold' }}>
              $ {prodOne.price}
            </Text>

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              width: 175
            }}>

              <Icon name="heart-outline" size={35} color='red' />
              <TouchableOpacity onPress={(e) => {
                e.preventDefault()
                addProduct(prodOne._id)
              }} style={{ backgroundColor: "#FF8A00", padding: 10, borderRadius: 50, width: 130, alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>Add to cart</Text>
              </TouchableOpacity>

            </View>
          </View>


          <View>
            <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 6
            }}>
              <View style={{
                height: 1,
                width: "100%",
                backgroundColor: "#FF8A00",
              }}></View>
            </View>
            <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: "300" }}>{prodOne.description}</Text>
          </View>

        </View>
      </View>
    </ImageBackground>
  );
}