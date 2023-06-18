import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import apiUrl from "../../api";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import logo from '../../assets/Logos/logo-solid-b.png'

const SearchBar = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
    } else {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}products/search?searchQuery=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  const showOverflowScroll = searchResults.length > 0;

  return (
    <View style={{
      backgroundColor: "#fff",
    }}>
      <View style={{ flexDirection: "row", marginTop: 40, padding: 12, alignItems: "center" }}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginRight: 12,
            borderRadius: 3
          }}
          source={logo} />
        <TextInput
          placeholder="Search..."
          style={{
            flex: 1,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            borderColor: "#7847E0",
            borderWidth: 1,
            height: 50,
            backgroundColor: "#e7e7e790",
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: 16,
          }}
          value={searchQuery}
          onChangeText={handleSearchQueryChange}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#7847E0',
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
            paddingVertical: 12,
            paddingRight: 6,
            width: 70,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={handleSearch}
        >
          <FontAwesome name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {searchQuery.length > 0 ? <ScrollView>
        {searchResults.map((product) => (
          <TouchableOpacity
            key={product._id}
            onPress={() => navigation.navigate("DetailsProduct", { id: `${product._id}` })}
            style={{ backgroundColor: "#e7e7e790", borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 5, padding: 16, flexDirection: "row", alignItems: "center", marginBottom: 8 }}
          >
            <Image
              source={{ uri: product.photo }}
              style={{ width: 100, height: 100, marginRight: 16 }}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>{product.name}</Text>
              <Text style={{ color: "#666", marginBottom: 8 }}>${product.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView> :
        <View style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          backgroundColor: "#e7e7e790",
          gap: 10
        }}>
          <Text style={{
            fontSize: 16,
            color: "#7847E070",
            fontWeight: "400",
          }}>
            Search your favourites products!
          </Text>
          <FontAwesome name="search" size={60} color="#7847E070" />
        </View>}
    </View>
  );
};

export default SearchBar;