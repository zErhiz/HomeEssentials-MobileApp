import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/Home";
import Cart from "../screens/Cart";
import Register from "../screens/Register";
import ExploreProducs from "../screens/ExploreProducts";
import SignIn from "../screens/SignIn";
import AllProducts from "../screens/AllProducts";
import DetailsProduct from "../screens/DetailsProducs"
import SearchBar from "../screens/SearchBar"
import CategoryProduct from "../screens/CategoryProducts"
const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          headerShown: false,
        }} />
      <Tab.Screen name="Register" component={Register}
        options={{
          headerShown: false,
        }} />
      <Tab.Screen name="SignIn" component={SignIn}
        options={{
          headerShown: false,
        }} />
      <Tab.Screen name="Cart" component={Cart}
        options={{
          headerShown: false,
        }} />
      <Tab.Screen name="ExploreProducts" component={ExploreProducs}
        options={() => ({
          headerTitle: () => <View style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <Text style={{ fontSize: 18 }}>HomeEssentials</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SearchInput")}>
              <FontAwesome name="search" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>,
        })}
      />
      <Tab.Screen name="AllProducts" component={AllProducts} options={() => ({
        headerTitle: () => <View style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>HomeEssentials</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SearchInput")}>
            <FontAwesome name="search" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>,
      })}
      />
      <Tab.Screen name="DetailsProduct" component={DetailsProduct} options={() => ({
        headerTitle: () => <View style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>HomeEssentials</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SearchInput")}>
            <FontAwesome name="search" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>,
      })}
      />
      <Tab.Screen name="SearchInput" component={SearchBar} options={() => ({
        headerTitle: () => <View style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>HomeEssentials</Text>

        </View>,
      })}
      />
      <Tab.Screen name="Category" component={CategoryProduct} options={() => ({
        headerTitle: () => <View style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>HomeEssentials</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SearchInput")}>
            <FontAwesome name="search" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>,
      })}
      />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
