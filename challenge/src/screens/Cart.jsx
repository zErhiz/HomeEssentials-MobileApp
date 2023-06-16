import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, ScrollView, Alert, TextInput} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StripeProvider, CardField } from '@stripe/stripe-react-native';
import apiUrl from '../../api';
import Icon from "react-native-vector-icons/FontAwesome";
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
  }, [headers, user,products]);



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

    const render = () => { axios.get(`${apiUrl}cart/${user?.email}`, headers).then(res => setProducts(res.data.response)).catch(err => console.log(err))}
    const [viewForm, setViewForm] = useState(false)
    const [ address, setAddress ] = useState("")
    const [ country, setCountry] = useState("")
    const [ dni, setDni] = useState("")
    const [ phoneNumber, setPhoneNumber] = useState("")

    const buttonProcess = () => {
        products.length > 0? setViewForm(true) : Alert.alert("No items in the cart")
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
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
        <View style={{ width: '100%', marginTop: 30, flex: 1, flexDirection: 'column', alignItems: 'center', borderRadius: 10, position: 'relative' }}>
          <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', paddingBottom: 56 }}>
            <Text style={{ padding: 4, paddingTop: 10, width: '90%', borderBottomWidth: 2, borderBottomColor: '#7847E0', fontSize: 16, fontWeight: 'bold', color: '#7847E0', marginBottom: 5 }}>Carrito ({products?.length})</Text>

            {products.length > 0 ? (
              products?.map(product => (
                <View style={{ flexDirection: 'column', height: 150, justifyContent: 'flex-start', alignItems: 'center', width: '100%', borderBottomWidth: 2, borderBottomColor: 'white' }} key={product.product_id._id}>

                  <View style={{ flexDirection: 'row', width: '100%' }}>

                    <TouchableOpacity style={{ width: 250, flexDirection: 'row', height: 80, display: "flex", justifyContent: "space-evenly", alignItems: "center" }} onPress={() => navigation.navigate(`DetailsProduct${product.product_id._id}`)}>
                      <View style={{ width: 60, height: 60, overflow: 'hidden', borderRadius: 5 }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: product.product_id.photo }} />
                      </View>
                      <View style={{ width: 150, paddingRight: 2, flexDirection: 'column' }}>
                        <TouchableOpacity style={{ width: 200, flexDirection: 'row' }} onPress={() => navigation.navigate(`DetailsProduct${product.product_id._id}`)}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{product.product_id.name}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12, width: 160 }}>{product.product_id.description}</Text>
                      </View>
                    </TouchableOpacity>

                    <View style={{ justifyContent: 'space-between' }}>
                      <View style={{ width: 110, display: "flex", alignItems: "center" }}>

                        <View style={{ width: 60, height: 50, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', borderWidth: 1, borderColor: 'gray' }}>
                        <TouchableOpacity style={{ width: '33%', fontSize: 20, fontWeight: 'bold', paddingBottom: 1 }} onPress={() => subtractProduct(product.product_id._id)}><Text style={{ fontSize: 20 }}>-</Text></TouchableOpacity>
                          <Text style={{ width: '33%', fontSize: 20, textAlign: 'center' }}>{product?.quantity}</Text>
                          <TouchableOpacity style={{ width: '33%', fontSize: 20, fontWeight: 'bold', paddingBottom: 1 }} onPress={() => addProduct(product.product_id._id)}><Text style={{ fontSize: 20 }}>+</Text></TouchableOpacity>
                        </View>

                        <Text style={{ textAlign: 'left', color: 'gray' }}>{`${product.product_id.stock_Available} availables`}</Text>
                        <Text style={{ width: 90, alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold' }}>USD ${(product.product_id.price * product.quantity).toFixed(2)}</Text>

                      </View>
                    </View>

                  </View>
                  <View style={{ width: '100%', paddingLeft: 10, flexDirection: "row", paddingTop: 5, paddingRight: 5, justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
                    <Button title="More Products" onPress={() => navigation.navigate(`AllProducts`)} color="blue" />
                  </View>
                </View>
              </View>
            )}
            <View style={{ position: 'absolute', bottom: -10, width: '100%', flexDirection: 'column', alignItems: 'center' }}>
              <View style={{ width: '90%', height: 28, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, borderColor: 'white', borderTopWidth: 2, backgroundColor: '#E7E7E7' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total Purchase: USD$ {totalPurchase.toFixed(2)}</Text>
              </View>
              <View style={{ width: '90%', height: 35, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
              <Button title="Buy Now" onPress={() => setViewForm(!viewForm)} color="purple" />
              </View>
            </View>
          </View>
        </View>
        {viewForm ? (
        <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%', backgroundColor: '#000000de', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#ffffffde', padding: 10, paddingTop: 5, borderRadius: 8, borderWidth: 2, borderColor: 'purple', flexDirection: 'column' }}>
          <TouchableOpacity style={{alignSelf:"flex-end"}} onPress={() => {
               {setViewForm(!viewForm)}
              }}> 
            <Icon name="close" size={20} color="purple" />
          </TouchableOpacity>
            <Text style={{ marginBottom: 5, width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Give us an address where to deliver your order</Text>
            <TextInput
              style={{ width: 300, borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 10 }}
              placeholder="Insert your address"
              onChangeText={(value) => setAddress(value)}
              value={address}
            />
            <TextInput
              style={{ width: 300, borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 10 }}
              placeholder="Insert your country"
              onChangeText={(value) => setCountry(value)}
              value={country}
            />
            <TextInput
              style={{ width: 300, borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 10 }}
              placeholder="Insert your dni"
              onChangeText={(value) => setDni(value)}
              value={dni}
            />
            <TextInput
              style={{ width: 300, borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 10 }}
              placeholder="Insert your telephone number"
              onChangeText={(value) => setPhoneNumber(value)}
              value={phoneNumber}
            />
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
            <View style={{ alignItems: 'center', paddingTop: 20, marginLeft: 5 }}>
              
            </View>
          </View>
          <TouchableOpacity style={{ width: 200, flexDirection: 'row', justifyContent:'center',alignContent:"center",alignItems:"center",borderRadius:100,backgroundColor:"purple" }}  onPress={purchase} >
                          <Text style={{ fontSize: 20, fontWeight: 'bold',color:"white" }}>Pay with credit card</Text>
                        </TouchableOpacity>
        </View>
      ) : null}
      </View>
    </>
  );
};

export default Cart;