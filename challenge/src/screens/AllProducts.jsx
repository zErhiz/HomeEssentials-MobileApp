import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import apiUrl from '../../api';
import products_actions from '../../store/actions/products';

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
    <ScrollView>
      <View style={{
        paddingLeft: 20,
        paddingRight: 20
      }}>
        <View style={{ display: 'flex', justifyContent: "space-around", flexDirection: 'row' }}>
          <Button
            mode="contained"
            onPress={() => handleOrderChange('lowest')}
            disabled={sortType === 'lowest'}
            style={{
              width: 120
            }}
          >
            Filter by lowest price
          </Button>
          <Button
            mode="contained"
            onPress={() => handleOrderChange('highest')}
            disabled={sortType === 'highest'}
          >
            Filter by highest price
          </Button>
        </View>
        <Text style={{ padding: 9, textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
          Take a look at our products!
        </Text>
        {prodOne?.map((prod) => (
          <TouchableOpacity
            key={prod._id}
            style={{
              borderRadius: 10,
              padding: 12,
              width: '100%',
              marginVertical: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
            }}
            onPress={() => navigation.navigate('DetailsProduct', { id: `${prod._id}` })}
          >
            <Image source={{ uri: prod.photo }} style={{ height: 200, width: '100%', borderRadius: 10 }} />

            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{prod.name}</Text>
            </View>

            <View
              style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="check-circle" size={16} color="#6B7280" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={{ fontSize: 14, color: '#7847E0' }}>Stock</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{prod.stock_Available}</Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="tag" size={16} color="#6B7280" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={{ fontSize: 14, color: '#6B7280' }}>Price</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>${prod.price}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllProducts;