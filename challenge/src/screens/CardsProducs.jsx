let { products_read } = products_actions;
import React, { useState, useEffect } from "react";
import apiUrl from "../../api";
import axios from 'axios';
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import products_actions from '../../store/actions/products';
import { StylesNew } from "../../styles/Stylescss";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


function CardsProducts() {

    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [prodOne, setProdOne] = useState([]);
    const [order, setOrder] = useState('asc');
    const products = useSelector((store) => store.products.products);

    const AllProducts = () => {
        navigation.navigate('AllProducts')
    }

    useEffect(() => {
        if (products.length === 0) {
            dispatch(products_read());
        }
    }, []);
    useEffect(() => {
        axios(`${apiUrl}products/order?order=${order}`)
            .then((res) => {
                setProdOne(res.data);
            })
            .catch((err) => console.log(err));
    }, [order]);

    return (
        <ScrollView style={{
            height: 320,
            width: "100%",
            paddingTop: 8,

        }}>
            <Text
                style={{
                    color: "#7847E0",
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "right",
                    paddingHorizontal: 12,
                    paddingBottom: 8,
                    fontSize: 14
                }}
                onPress={AllProducts}>See All</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                    display: "flex",
                    width: "100%",
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
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#7847E0' }}>{prod.stock_Available}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="tag" size={20} color="#7847E0" />
                                    <View style={{ marginLeft: 8 }}>
                                        <Text style={{ fontSize: 12, color: '#6B7280' }}>Price</Text>
                                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#7847E0' }}>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(prod.price)}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>

                    </TouchableOpacity>
                ))}
            </ScrollView>
        </ScrollView>
    )
}

export default CardsProducts