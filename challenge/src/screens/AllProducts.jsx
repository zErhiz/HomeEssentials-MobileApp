import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import  products_actions  from '../../store/actions/products';

const AllProducts = () => {
  let { products_read } = products_actions

   const dispatch = useDispatch();
  const navigation = useNavigation();
  const products = useSelector(store => store.products.products);
  console.log(products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(products_read());
    }
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={{ padding: 9, textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}>
          Take a look at our products!
        </Text>
        {products.map(prod => (
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
            onPress={() => navigation.navigate("DetailsProduct", { id: `${prod._id}` })}
          >
            <Image source={{ uri: prod.photo }} style={{ height: 200, width: '100%', borderRadius: 10 }} />

            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{prod.name}</Text>
            </View>

            <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome name="check-circle" size={16} color="#6B7280" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={{ fontSize: 14, color: '#6B7280' }}>Stock</Text>
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

            <Button mode="contained" onPress={() => navigation.navigate("DetailsProduct", { id: `${prod._id}` })}>
              Detail
            </Button>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

};

export default AllProducts;