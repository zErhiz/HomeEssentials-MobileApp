import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StripeProvider, CardField } from '@stripe/stripe-react-native';
import apiUrl from '../../api';
import Icon from "react-native-vector-icons/FontAwesome";
import Bag from "react-native-vector-icons/Feather"
import Minus from "react-native-vector-icons/AntDesign"

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
  }, [headers, user, products]);


  const addProduct = (product_id) => {
    const data = { userEmail: user?.email, productId: product_id };
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
    const data = { userEmail: user?.email, productId: product_id };
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

  const render = () => { axios.get(`${apiUrl}cart/${user?.email}`, headers).then(res => setProducts(res.data.response)).catch(err => console.log(err)) }
  const [viewForm, setViewForm] = useState(false)
  const [address, setAddress] = useState("")
  const [country, setCountry] = useState("")
  const [dni, setDni] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const buttonProcess = () => {
    products.length > 0 ? setViewForm(true) : Alert.alert("No items in the cart")
  }

  products.forEach(product => (totalPurchase += product.product_id.price * product.quantity));

  const purchase = () => {
    Alert.alert("the purchase was a success")
    setViewForm(false)
    navigation.navigate('Explore')
    const body = {
      address: address,
      country: country,
      dni: dni,
      phoneNumber: phoneNumber
    }
    axios.post(`${apiUrl}cart/confirm?userEmail=${user?.email}`, body, headers).then(res => {
      console.log(res)
    }).catch(err => console.log(err))
  }


  return (
    <>
      {viewForm ? (
        <View style={{ position: 'absolute', top: 0, zIndex: 2, width: '100%', height: "100%", backgroundColor: '#00000070', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', width: "95%", padding: 15, borderRadius: 8, flexDirection: 'column' }}>
            <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => {
              { setViewForm(!viewForm) }
            }}>
              <Icon name="close" size={20} color='#7847E0' />
            </TouchableOpacity>

            <View style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
            }}>

              <Text style={{ marginBottom: 5, width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Give us an address where to deliver your order</Text>
              <TextInput
                style={{ width: "90%", borderBottomWidth: 1, borderBottomColor: '#7847E0', marginBottom: 10 }}
                placeholder="Insert your address"
                onChangeText={(value) => setAddress(value)}
                value={address}
              />
              <TextInput
                style={{ width: "90%", borderBottomWidth: 1, borderBottomColor: '#7847E0', marginBottom: 10 }}
                placeholder="Insert your country"
                onChangeText={(value) => setCountry(value)}
                value={country}
              />
              <TextInput
                style={{ width: "90%", borderBottomWidth: 1, borderBottomColor: '#7847E0', marginBottom: 10 }}
                placeholder="Insert your dni"
                onChangeText={(value) => setDni(value)}
                value={dni}
              />
              <TextInput
                style={{ width: "90%", borderBottomWidth: 1, borderBottomColor: '#7847E0', marginBottom: 10 }}
                placeholder="Insert your telephone number"
                onChangeText={(value) => setPhoneNumber(value)}
                value={phoneNumber}
              />
            </View>
            <StripeProvider
              publishableKey="pk_test_Dt4ZBItXSZT1EzmOd8yCxonL"
              urlScheme="your-url-scheme" // Reemplaza con tu URL Scheme
              merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // Reemplaza con tu identificador de comerciante para Apple Pay
            >
              <View>
                <CardField
                  postalCodeEnabled={false}
                  placeholder={{
                    number: '4242 4242 4242 4242',
                  }}
                  cardStyle={{
                    backgroundColor: '#ECECEC',
                    textColor: '#000000',
                  }}
                  style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 20,
                  }}
                  onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                  }}
                />
              </View>
            </StripeProvider>

          </View>
          <TouchableOpacity style={{ width: 150, flexDirection: 'row', padding: 12, marginTop: 10, justifyContent: 'center', alignContent: "center", alignItems: "center", borderRadius: 100, backgroundColor: '#7847E0' }} onPress={purchase} >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>Pay <Icon name="check" size={24} color='#1e1e' /></Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <ScrollView style={{ flex: 1, backgroundColor: '#EDEBEB70' }}>
        <View style={{ width: '100%', flex: 1, flexDirection: 'column', alignItems: 'center', borderRadius: 10, position: 'relative' }}>
          <View style={{ width: '100%', flexDirection: 'column', gap: 3, alignItems: 'center', paddingBottom: 56 }}>
            <Text style={{ padding: 4, paddingTop: 10, width: '90%', borderBottomWidth: 2, borderBottomColor: '#7847E0', fontSize: 16, fontWeight: 'bold', color: '#7847E0', marginBottom: 5 }}>Carrito ({products?.length})</Text>

            {products.length > 0 ? (
              products?.map(product => (
                <View style={{ flexDirection: 'column', backgroundColor: "#fff", padding: 10, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: 'center', width: '95%', borderBottomWidth: 2, borderBottomColor: 'white' }} key={product.product_id._id}>

                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity style={{ width: 250, flexDirection: 'row', display: "flex", alignItems: "center" }} onPress={() => navigation.navigate(`DetailsProduct${product.product_id._id}`)}>
                      <View style={{ width: 70, height: 70, borderRadius: 5 }}>
                        <Image style={{ width: '100%', height: '100%', borderRadius: 5, resizeMode: 'cover' }} source={{ uri: product.product_id.photo }} />
                      </View>
                      <View style={{ width: "100%", paddingLeft: 8, flexDirection: 'column' }}>
                        <TouchableOpacity style={{ width: 185, flexDirection: 'row' }} onPress={() => navigation.navigate(`DetailsProduct${product.product_id._id}`)}>
                          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{product.product_id.name}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 13, width: "100%" }}>{product.product_id.description}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{
                    width: "100%",
                    paddingHorizontal: 2,
                    paddingTop: 6,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between"
                  }}>

                    <TouchableOpacity
                      style={{ backgroundColor: "#e20", padding: 10, height: 55, width: 80, justifyContent: "center", borderRadius: 50, alignItems: "center" }}
                      onPress={() => deleteProduct(product.product_id._id)}>
                      <Icon name="trash-o" size={25} color="white" />
                    </TouchableOpacity>

                    <View style={{ justifyContent: 'space-between' }}>
                      <View style={{ display: "flex", alignItems: "flex-end" }}>

                        <View style={{ width: 60, height: 50, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderWidth: 1, borderColor: '#7847E080', borderRadius: 10 }}>
                          <TouchableOpacity style={{ width: '33%', fontSize: 20, fontWeight: 'bold', paddingBottom: 1 }} onPress={() => subtractProduct(product.product_id._id)}><Text style={{ fontSize: 25 }}>-</Text></TouchableOpacity>
                          <Text style={{ width: '33%', fontSize: 20, textAlign: 'center' }}>{product?.quantity}</Text>
                          <TouchableOpacity style={{ width: '33%', fontSize: 20, fontWeight: 'bold', paddingBottom: 1 }} onPress={() => addProduct(product.product_id._id)}><Text style={{ fontSize: 25 }}>+</Text></TouchableOpacity>
                        </View>

                        <Text style={{ textAlign: 'left', color: '#7847E080' }}>{`${product.product_id.stock_Available} availables`}</Text>
                        <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>USD $ {(product.product_id.price * product.quantity).toFixed(2)}</Text>

                      </View>
                    </View>
                  </View>

                </View>
              ))
            ) : (
              <View style={{ width: '90%', backgroundColor: "#fff", padding: 10, borderRadius: 10 }}>
                <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                  <View style={{ height: 125, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Text>Empty Cart</Text> 
                    <Minus style={{ position: "absolute", top: 0, right:0 }} name="questioncircle" size={70} color='#EDEBEB70' />
                  </View>
                </View>
              </View>
            )}
            <View style={{ bottom: -10, width: '100%', flexDirection: 'column', alignItems: 'center' }}>
              <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'flex-end', padding: 10, borderColor: 'white', borderTopWidth: 2, borderRadius: 10, backgroundColor: '#E7E7E7' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total Purchase: USD$ {totalPurchase.toFixed(2)}</Text>
              </View>
              <View style={{ width: '100%', height: 35, marginTop: 10, flexDirection: 'row', gap: 6, justifyContent: 'flex-end', paddingHorizontal: 20 }}>
                <TouchableOpacity onPress={() => setViewForm(!viewForm)}
                  style={{
                    backgroundColor: "#FF8A00",
                    padding: 10,
                    width: "40%",
                    color: "white",
                    height: 55,
                    justifyContent: "center",
                    borderRadius: 10,
                    alignItems: "center"
                  }}>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 18
                    }}>
                    Buy Now <Icon name="dollar" size={20} color='#fff' /></Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    width: "60%",
                    height: 55,
                    alignItems: "center",
                    backgroundColor: '#7847E0',
                    borderRadius: 10,
                    
                  }}
                  onPress={() => navigation.navigate(`AllProducts`)}>
                  <Text style={{
                    fontSize: 18,
                    padding: 10,
                    color: "white",
                    fontWeight: "600",
                  }}>
                    More Products <Bag name="shopping-bag" size={20} color='#fff' />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Cart;