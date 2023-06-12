import React, { useEffect, useState, useRef} from 'react';
import { View, Text, Button, Image,ScrollView} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { useSelector, useDispatch } from "react-redux";
import categories from "../../store/actions/categories"
import axios from 'axios';
import apiUrl from '../../api';
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
  let{categories_read} = categories
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
    <ScrollView> 
      
    <View>
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

      {categoriesProd.map((prod) => (
        <View
          key={prod._id}
          style={{
            borderRadius: 8,
            padding: 12,
            width: '100%',
            marginVertical: 8,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Image source={{ uri: prod.photo }} style={{ height: 256, width: '100%', borderRadius: 8 }} />

          <View style={{ marginTop: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{prod.name}</Text>
          </View>

          <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
             

              <View style={{ marginLeft: 4 }}>
                <Text style={{ color: 'gray', fontSize: 14 }}>Stock</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{prod.stock_Available}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
           

              <View style={{ marginLeft: 4 }}>
                <Text style={{ color: 'gray', fontSize: 14 }}>Price</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>${prod.price}</Text>
              </View>
            </View>

            <Button
              title="Detail"
              color="#FF3D71"
              onPress={() => navigation.navigate('DetailsProduct', { id: prod._id })}
            />
          </View>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};

export default CategoryDetail;