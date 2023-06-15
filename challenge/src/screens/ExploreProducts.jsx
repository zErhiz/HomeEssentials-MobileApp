import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image } from "react-native";
import { Input } from "react-native-elements";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";

import Icon from "react-native-vector-icons/FontAwesome";

import cards_home from '../../store/actions/cardsHome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StylesNew } from "../../styles/Stylescss";
import { LinearGradient } from 'expo-linear-gradient';
import categories from "../../store/actions/categories"
import Carrousel from "./Carousel";
import CardsProducts from "./CardsProducs";
const ExploreProducts = () => {

  let { cards_home_read } = cards_home
  let { categories_read } = categories
  const navigation = useNavigation()
  const cardsHome = useSelector(state => state.cardsHome.productsHome);
  const categoriesHome = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();


  /* use effect cards home */
  useEffect(() => {
    if (cardsHome.length === 0) {
      dispatch(cards_home_read());
    }
  }, [cardsHome]);

  /* use effect categories */
  useEffect(() => {
    if (categoriesHome.length === 0) {
      dispatch(categories_read());
    }
  }, [categoriesHome]);


  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: 20, backgroundColor: "#E7E7E780" }}>
       
      <Carrousel/>
        
        {/* BEST SELLERS CARDS  */}
        <View style={{ width: "90%", display: "flex", flexDirection: "column", alignItems: "center", rowGap: 4 }}>

          <View style={{
            width: "100%",
            alignItems: "flex-end"
          }}>

            <LinearGradient
              style={{
                width: 170,
                height: 28,
                borderRadius: 6,
                paddingHorizontal: 2,
                justifyContent: "space-around",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                marginBottom: 2,
              }}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 0.9, y: 2 }}
              colors={['#7847E099', '#fff9', '#FF8A00']}>
              <Text style={{
                fontSize: 15,
                fontWeight: "800",
                color: "#fff",
              }}>Best Sellers!</Text>
              <Icon name="tags" size={20} color='#fff' />
            </LinearGradient>

          </View>

          {cardsHome.map((card) => (
            <View
              key={card._id}
              style={{
                paddingHorizontal: 7,
                marginHorizontal: 2
              }}>

              <TouchableOpacity
                onPress={() => navigation.navigate("DetailsProduct", { id: `${card._id}` })}
                style={{
                  width: "100%",
                  height: 100,
                  display: "flex",
                  borderRadius: 6,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                }}>

                <Image
                  style={{ width: 100, height: "100%", borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}
                  source={{ uri: card.photo }} />
                <View style={{ display: "flex", width: 170, height: "100%", paddingVertical: 20, alignItems: "flex-start", justifyContent: "center" }}>
                  <Text style={{ fontSize: 16, fontWeight: "200", marginBottom: 5 }}>{card.name}</Text>
                  <Text style={{ color: "#7847E0", fontSize: 17, fontWeight: "800" }}>$ {card.price}</Text>
                </View>

              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={{ height: 50, marginTop: 6, alignItems: "center" }} onPress={() => navigation.navigate('AllProducts')} >
            <LinearGradient
              colors={['#FF8A00', '#FF8A00']}
              style={{ width: 185, height: 45, justifyContent: "center", borderRadius: 50, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 15, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, fontWeight: "bold", color: "white" }}>See more products</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <CardsProducts/>

        {/* SEARCH BY CATEGORY  */}
        <View style={{ width: "100%", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", padding: 12 }}>

          <View style={{
            width: "100%",
            alignItems: "flex-end"
          }}>
            <LinearGradient
              style={{
                width: 180,
                height: 30,
                borderRadius: 6,
                paddingHorizontal: 2,
                justifyContent: "space-around",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 6,
              }}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 0.9, y: 2 }}
              colors={['#39393950', '#393939']}>
              <Text style={{
                fontSize: 15,
                fontWeight: "800",
                color: "#fff",
              }}>Search by category</Text>

            </LinearGradient>
          </View>

          {categoriesHome.map((cat) => (
            <View key={cat._id} style={{ width: 300, borderColor: "#E7E7E780", borderBottomWidth: 3, height: 70, backgroundColor: "transparent", justifyContent: "center", alignItems: "center" }}>

              <TouchableOpacity style={{ width: "100%", backgroundColor: "#fff", borderRadius: 15, height: "100%", display: "flex", flexDirection: "row" }}
                onPress={() => navigation.navigate("Category", { id: `${cat._id}` })}>
                <Image
                  style={{ width: 65, height: "100%", borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
                  source={{ uri: cat.coverPhoto }}
                />
                <View style={{ display: "flex", flexDirection: "row", paddingLeft: 10, justifyContent: "space-between", width: 220, alignItems: "center" }}>
                  <Text style={{ fontSize: 18, fontWeight: "500", color: '#39393990', textAlign: "left", width: 150 }}>{cat.name}</Text>
                  <Icon name="chevron-right" size={15} color='#393939' />
                </View>
              </TouchableOpacity>

            </View>
          ))}
        </View>
        <View style={{ width: "100%", height: "4%", backgroundColor: "#7847E0", display: "flex", gap: 12, alignItems: "center", padding: 12, alignContent: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "white", textAlign: "center" }}> Buy sure that your purchase arrives well </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default ExploreProducts;