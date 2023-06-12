import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import apiUrl from "../../api";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
    <View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TextInput
          placeholder="Search..."
          style={{
            flex: 1,
            borderRadius: 30,
            borderColor: "#999",
            borderWidth: 1,
            backgroundColor: "#EDECEC",
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: 16,
          }}
          value={searchQuery}
          onChangeText={handleSearchQueryChange}
        />
        <TouchableOpacity
          style={{ backgroundColor: "purple", borderRadius: 30, paddingHorizontal: 16, paddingVertical: 12, display:"flex", justifyContent:"center" }}
          onPress={handleSearch}
        >
          <FontAwesome name="search" size={16} color="white" />
        </TouchableOpacity>
      </View>
    
      <ScrollView
        
      >
        {searchResults.map((product) => (
          <TouchableOpacity
            key={product._id}
            onPress={() => navigation.navigate("DetailsProduct", { id: `${product._id}` })}
            style={{ backgroundColor: "white", borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3, elevation: 5, padding: 16, flexDirection: "row", alignItems: "center", marginBottom: 8 }}
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
      </ScrollView>
    </View>
  );
};

export default SearchBar;