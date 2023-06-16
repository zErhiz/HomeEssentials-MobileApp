import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, View, ImageBackground, Pressable, Image, TouchableOpacity } from 'react-native';
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
import logo from '../../assets/Logos/logo-2-b.png'
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator>
     
      <Tab.Screen name="Explore" component={ExploreProducs}
        options={() => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color="purple" size={size} />
          ),
          headerTitle: () => <View style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <Image source={logo} style={{
              height: 25, width: 100
            }} />
            <TouchableOpacity onPress={() => navigation.navigate("SearchInput")}>
              <FontAwesome name="search" size={16} color="#7847E0" />
            </TouchableOpacity>
          </View>,
        })}
      />
      <Tab.Screen name="Cart" component={Cart}
        options={() => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" color="purple" size={size} />
          ),
          headerTitle: () => <View style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <Image source={logo} style={{
              height: 25, width: 100
            }} />
            <TouchableOpacity onPress={() => navigation.navigate("SearchInput")}>
              <FontAwesome name="search" size={16} color="#7847E0" />
            </TouchableOpacity>
          </View>,
        })}
         />
      <Tab.Screen name="AllProducts" component={AllProducts} options={() => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search-plus" color="purple" size={size} />
          ),
        headerTitle: () => <View style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
          <Image source={logo} style={{
            height: 25, width: 100
          }} />
          <TouchableOpacity onPress={() => navigation.navigate("SearchInput")}>
            <FontAwesome name="search" size={16} color="#7847E0" />
          </TouchableOpacity>
        </View>,
      })}
      />
        
        <Tab.Screen name="Profile" component={Profile} options={() => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color="purple" size={size} />
          ),
        headerTitle: () => <View style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
          <Image source={logo} style={{
            height: 25, width: 100
          }} />
          <TouchableOpacity onPress={() => navigation.navigate("SearchInput")}>
            <FontAwesome name="search" size={16} color="#7847E0" />
          </TouchableOpacity>
        </View>,
      })}
      />
       

    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
