import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import apiUrl from '../../api';

const Cart = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [headers, setHeaders] = useState(null);
  const [user, setUser] = useState(null)
  let totalPurchase = 0;

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const headers = { headers: { 'authorization': `Bearer ${token}` } };
      setHeaders(headers);
    };
  
    const getuser = async () => {
      const user = await AsyncStorage.getItem('user');
      setUser(JSON.parse(user));
    };
  
    const fetchData = async () => {
      await getToken();
      await getuser();
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchCart = async () => {
      if (headers && user) {
        try {
          const res = await axios.get(`${apiUrl}cart/${user.email}`, headers);
          setProducts(res.data.response);
        } catch (err) {
          console.log(err);
        }
      }
    };
  
    fetchCart();
  }, [headers, user]);
  
  console.log(user?.email);

  const addProduct = (product_id) => {
    const data = { userEmail: email, productId: product_id };
    axios.post(`${apiUrl}cart/create`, data, headers)
      .then(res => {
        console.log(res);
        Alert.alert("Success", "The cart has been created");
        render();
      })
      .catch(err => {
        console.log(err);
        Alert.alert("Error", "Error creating the cart");
      });
  };

  const subtractProduct = (product_id) => {
    const data = { userEmail: email, productId: product_id };
    axios.put(`${apiUrl}cart/subtract`, data, headers)
      .then(res => {
        console.log(res);
        Alert.alert("Success", "The product has been subtracted");
        render();
      })
      .catch(err => console.log(err));
  };

  const deleteProduct = (product_id) => {
    axios.delete(`${apiUrl}cart?userEmail=${user?.email}&productId=${product_id}`, headers)
      .then(res => {
        console.log(res);
        Alert.alert("Success", "The product has been deleted from the cart");
        render();
      })
      .catch(err => console.log(err));
  };

  const render = () => {
    if (headers) {
      axios.get(`${apiUrl}cart/${user?.email}`, headers)
        .then(res => setProducts(res.data.response))
        .catch(err => console.log(err));
    }
  };

  products.forEach(product => (totalPurchase += product.product_id.price * product.quantity));

  return (
    <> 
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ width: '90%', marginTop: 10, flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#E7E7E7', borderRadius: 10, position: 'relative' }}>
        <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', paddingBottom: 56 }}>
          <Text style={{ padding: 4, paddingLeft: 12, paddingTop: 10, width: '90%', borderBottomWidth: 2, borderBottomColor: '#7847E0', fontSize: 16, fontWeight: 'bold', color: '#7847E0', marginBottom: 5 }}>Carrito ({products?.length})</Text>
          {products.length > 0 ? (
            products?.map(product => (
              <View style={{ paddingLeft: 4, paddingTop: 5, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '90%', borderBottomWidth: 2, borderBottomColor: 'white' }} key={product.product_id._id}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <TouchableOpacity style={{ width: '100%', flexDirection: 'row' }} onPress={() => navigation.navigate(`DetailsProduct${product.product_id._id}`)}>
                    <View style={{ width: 120, height: 24, overflow: 'hidden', borderRadius: 5 }}>
                      <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: product.product_id.photo }} />
                    </View>
                    <View style={{ width: '80%', paddingRight: 2, flexDirection: 'column' }}>
                      <TouchableOpacity style={{ width: '100%', flexDirection: 'row' }} onPress={() => navigation.navigate(`DetailsProduct${product.product_id._id}`)}>
                        <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 'bold' }}>{product.product_id.name}</Text>
                      </TouchableOpacity>
                      <Text style={{ paddingLeft: 10, fontSize: 14 }}>{product.product_id.description}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                    <View style={{ width: '40%', flexDirection: 'row', borderRightWidth: 2, borderRightColor: 'gray', marginRight: 5 }}>
                      <View style={{ width: '100%', height: '75%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderWidth: 1, borderColor: 'gray' }}>
                        <Text style={{ width: '33%', fontSize: 20, textAlign: 'center' }}>{product?.quantity}</Text>
                        <TouchableOpacity style={{ width: '33%', fontSize: 20, fontWeight: 'bold', paddingBottom: 1 }} onPress={() => addProduct(product.product_id._id)}><Text>+ </Text></TouchableOpacity>
                      </View>
                      <Text style={{ textAlign: 'center', color: 'gray' }}>{`${product.product_id.stock_Available} availables`}</Text>
                    </View>
                    <Text style={{ width: '60%', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 'bold' }}>USD {(product.product_id.price * product.quantity).toFixed(2)}</Text>
                  </View>
                </View>
                <View style={{ width: '100%', paddingLeft: 10, paddingTop: 5, paddingRight: 5, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Button title="Delete" onPress={() => deleteProduct(product.product_id._id)} color="red" />
                  <Button title="More Products" onPress={() => navigation.navigate(`AllProducts`)} color="blue" />
                </View>
              </View>
            ))
          ) : (
            <View style={{ width: '80%' }}>
              <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <View style={{ height: 200, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 5 }}>Nothing here... come back to see available products</Text>
                  <Text style={{ fontSize: 20, paddingHorizontal: 10, paddingVertical: 5 }}>Come back to see available products</Text>
                  <Button title="More Products" onPress={() => navigation.navigate(`/allproducts`)} color="blue" />
                </View>
              </View>
            </View>
          )}
          <View style={{ position: 'absolute', bottom: 0, width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: '90%', height: 28, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, borderColor: 'white', borderTopWidth: 2, backgroundColor: '#E7E7E7' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total Purchase: USD {totalPurchase.toFixed(2)}</Text>
            </View>
            <View style={{ width: '90%', height: 28, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
            <Button title="Saved Changes" onPress={() => <Text>enviar a pagina de compra</Text>} color="purple" />
            </View>
          </View>
        </View>
      </View>
     </View>
     </>
    );
};

export default Cart;