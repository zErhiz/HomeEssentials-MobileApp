import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image } from "react-native";
import apiUrl from "../../api";
import { Input } from "react-native-elements";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import cards_home from '../../store/actions/cardsHome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StylesNew } from "../../styles/Stylescss";
import { LinearGradient } from 'expo-linear-gradient';
import categories from "../../store/actions/categories"
const ExploreProducts = () => {
  let { cards_home_read } = cards_home
 let{categories_read} = categories
 const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
    <ScrollView style={{ flex: 1,}}>
      <View style={{ alignItems: "center", display:"flex", flexDirection:"column", gap:20  }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentOffset={{ x: currentIndex * 410, y: 0 }}
          onMomentumScrollEnd={(event) => {
            const contentOffset = event.nativeEvent.contentOffset;
            const index = Math.floor(contentOffset.x / 410);
            setCurrentIndex(index);
          }}
        >
          <Image
            style={{ width: 400, height: 200, marginRight: 10 }}
            source={{ uri: 'https://i.ibb.co/JrRdX0m/image.png' }}
          />
          <Image
            style={{ width: 400, height: 200, marginRight: 10 }}
            source={{ uri: 'https://i.ibb.co/Hp0wNTs/image.png' }}
          />
          <Image
            style={{ width: 400, height: 200, marginRight: 10 }}
            source={{ uri: 'https://i.ibb.co/FqkTR62/image.png' }}
          />
        </ScrollView>
        {/* BEST SELLERS CARDS  */}
        <View style={{ width: "90%", backgroundColor: "white", display: "flex", flexDirection: "column", gap: 12, alignItems: "center", padding: 12 }}>
          <Text style={{ fontSize: 20 }}>Best Sellers</Text>
          {cardsHome.map((card) => (
            <View
            key={card._id}
            >
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailsProduct", { id: `${card._id}` })}
              
              style={{
                width: "100%",
                height: 150,
                display: "flex",
                flexDirection: "row",
                borderWidth: 2,
                borderColor: "#d9d9d9"
              }}
            >
              <Image
                style={{ width: "40%", height: "100%", marginRight: 10 }}
                source={{ uri: card.photo }}
              />
              <View
                style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-start" }}
              >
                <Text style={{ fontSize: 14, width: 150 }}>{card.name}</Text>
                <Text style={{ color: "purple", fontSize: 12 }}>{card.price}</Text>
              </View>
            </TouchableOpacity>
          </View>
          ))}
          <TouchableOpacity style={{ height: 50, alignItems: "center" }} onPress={() => navigation.navigate('AllProducts')} >
            <LinearGradient
              colors={['#403d56', '#6474a3']}
              style={{ width: "80%", height: "100%", justifyContent: "center", borderRadius: 50 }}>
              <Text style={{ paddingHorizontal:20,paddingVertical: 10, borderRadius: 8,fontWeight:"bold",color:"white"}}>See more products</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* SEARCH BY CATEGORY  */}
        <View style={{ width: "90%", backgroundColor: "white", display: "flex", flexDirection: "column", gap: 12, alignItems: "center", padding: 12 }}>
          <Text style={{ fontSize: 20 }}>Search by category</Text>
          {categoriesHome.map((cat) => (
           <View key={cat._id} style={{ width: "100%", height: 160, display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
            <TouchableOpacity  style={{ width: "35%", height: "70%" }}
            onPress={() => navigation.navigate("Category", { id: `${cat._id}` })}> 
           <Image
             
             style={{ width: "100%", height: "100%", marginRight: 10, borderRadius: 100 }}
             source={{ uri: cat.coverPhoto }}
           />
           </TouchableOpacity>
           <View style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
             <Text style={{ fontSize: 14, width: 150, textAlign:"center" }}>{cat.name}</Text>
           </View>
         </View>
          ))}
           </View>
           <View style={{ width: "100%",height:"4%", backgroundColor: "#403d56", display: "flex", gap: 12, alignItems: "center", padding: 12,alignContent:"center" }}>
        <Text style={{fontWeight:"bold", fontSize:20,color:"white", textAlign:"center"}}> Buy sure that your purchase arrives well </Text>
      </View>
      </View>
    </ScrollView>
  );
}

export default ExploreProducts;