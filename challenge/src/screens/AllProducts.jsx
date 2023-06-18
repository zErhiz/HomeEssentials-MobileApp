import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Button } from 'react-native-paper';
import apiUrl from '../../api';
import products_actions from '../../store/actions/products';
import { LinearGradient } from 'expo-linear-gradient';
import { StylesNew } from '../../styles/Stylescss';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Sort from 'react-native-vector-icons/FontAwesome5'

const AllProducts = () => {
  let { products_read } = products_actions;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const products = useSelector((store) => store.products.products);


  useEffect(() => {
    if (products.length === 0) {
      dispatch(products_read());
    }
  }, []);

  const [order, setOrder] = useState('asc');
  const [sortType, setSortType] = useState('lowest'); // Nuevo estado para el tipo de orden

  const handleOrderChange = (type) => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    setSortType(type);
  };

  const [prodOne, setProdOne] = useState([]);

  useEffect(() => {
    axios(`${apiUrl}products/order?order=${order}`)
      .then((res) => {
        setProdOne(res.data);
      })
      .catch((err) => console.log(err));
  }, [order]);
  console.log(prodOne)

  return (
    <ScrollView style={{ backgroundColor: "#E7E7E799" }}>

      <View>

        <View style={{ marginTop: 20, display: 'flex', alignItems: "flex-end", paddingHorizontal: 10 }}>
          <Button
            style={{ backgroundColor: "#7847E0", width: "53%", height: 45, flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}
            mode="contained"
            onPress={() => handleOrderChange(!true)}
            disabled={sortType === 'highest'}
          >
            <Text style={{ marginRight: 10 }}> Filter by price        </Text>
            <Sort name="sort" size={20} color="white" />
          </Button>
        </View>
        <Text style={{ padding: 9, textAlign: 'left', marginTop: 20, fontSize: 20, fontWeight: 'bold', alignItems: "center" }}>
          Take a look at our products!          <FontAwesome name="tags" size={20} color="#393939" />
        </Text>


        {/* 1rs section */}
        <View style={{
          backgroundColor: "transparent"
        }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal style={{
              display: "flex",
              overflow: "hidden",
            }}>

            {prodOne?.map((prod) => (
              <TouchableOpacity
                key={prod._id}
                style={{
                  width: 170,
                  height: 280,
                  paddingBottom: 6,
                  marginHorizontal: 4,
                  backgroundColor: "#fff",
                  justifyContent: "space-between",
                  borderRadius: 6,
                  alignItems: "center"
                }}
                onPress={() => navigation.navigate('DetailsProduct', { id: `${prod._id}` })}
              >
                <Image source={{ uri: prod.photo }}
                  style={{
                    height: 170,
                    width: "100%",
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                  }} />

                <View style={StylesNew.CardsHorInfo}>

                  <Text style={{ fontSize: 17, fontWeight: '500', textAlign: "left" }}>{prod.name}</Text>

                  <View
                    style={{ marginTop: 12, width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {prod.stock_Available < 10 && prod.stock_Available > 1 && (
                        <FontAwesome name="check-circle" size={20} color="#FFC700" />
                      )}
                      {prod.stock_Available >= 10 && (
                        <FontAwesome name="check-circle" size={20} color="#1e1e" />
                      )}
                      {prod.stock_Available === 0 && (
                        <FontAwesome name="check-circle" size={20} color="#e11" />
                      )}
                      <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontSize: 12, color: '#6B7280' }}>Stock</Text>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#7847E0' }}>
                          {prod.stock_Available}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome name="tag" size={20} color="#7847E0" />
                      <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontSize: 12, color: '#6B7280' }}>Price</Text>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#7847E0' }}>
                          {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(prod.price)}
                        </Text>
                      </View>
                    </View>

                  </View>
                </View>

              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 2nd section */}


      </View>
    </ScrollView>
  );
};

export default AllProducts;