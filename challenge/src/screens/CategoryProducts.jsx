import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from "react-redux";
import categories from "../../store/actions/categories"
import axios from 'axios';
import apiUrl from '../../api';
import { StylesNew } from '../../styles/Stylescss';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import logo from '../../assets/Logos/logo-2-b.png'

const CategoryDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [categoriesProd, setCategoriesProd] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }

  let { categories_read } = categories
  const categoriesHome = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  /* use effect categories */
  useEffect(() => {
    if (categoriesHome.length === 0) {
      dispatch(categories_read());
    }
  }, [categoriesHome]);
  console.log(categoriesHome)

  useEffect(() => {
    axios(`${apiUrl}products/categories/${id}`)
      .then((res) => {
        setCategoriesProd(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log(categoriesProd[0]);
  const handleCategoryChange = (categoryId) => {
    setSelectedLanguage(categoryId);
    navigation.navigate('Category', { id: categoryId });
  };
  return (
    <>
      <View
        style={{ width: "100%", height: 95, position: "absolute", backgroundColor: "#fff", padding: 15, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Explore")}>
          <Image source={logo} style={{
            height: 26, width: 103
          }} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{
          width: "100%",
          backgroundColor: "#E7E7E799"
        }}>
          <Picker
            ref={pickerRef}
            selectedValue={selectedLanguage}
            onValueChange={handleCategoryChange}
          >
            {categoriesHome.map((category) => (
              <Picker.Item key={category._id} label={category.name} value={category._id} />
            ))}
          </Picker>
          <Text style={{ padding: 9, textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
            {categoriesProd[0]?.category_id.name}
          </Text>

          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 4,
            width: "100%",
            display: "flex",
            columnGap: 4,
            paddingHorizontal: 8,
          }}>

            {categoriesProd.map((prod) => (
              <TouchableOpacity
                key={prod._id}
                style={{
                  width: 170,
                  height: 280,
                  paddingBottom: 10,
                  backgroundColor: "#fff",
                  justifyContent: "space-between",
                  borderRadius: 6,
                  alignItems: "center"
                }}
                onPress={() => navigation.navigate('DetailsProduct', { id: `${prod._id}` })}
              >
                <View style={{
                  width: "100%",
                  borderBottomWidth: 1.5,
                  borderColor: "#FF8A00"
                }}>

                  <Image source={{ uri: prod.photo }}
                    style={{
                      height: 170,
                      width: "100%",
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                    }} />
                </View>

                <View style={StylesNew.CardsHorInfo}>

                  <Text style={{ fontSize: 17, fontWeight: '500', textAlign: "left" }}>{prod.name}</Text>

                  <View
                    style={{ marginTop: 12, width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome name="check-circle" size={18} color="#7847E0" />
                      <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontSize: 12, color: '#6B7280' }}>Stock</Text>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#7847E0' }}>{prod.stock_Available}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome name="tag" size={18} color="#7847E0" />
                      <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontSize: 12, color: '#6B7280' }}>Price</Text>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#7847E0' }}>$ {prod.price}</Text>
                      </View>
                    </View>

                  </View>
                </View>

              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default CategoryDetail;