import { createStackNavigator } from '@react-navigation/stack';

import BottomTabsNavigator from "./BottomTabsNav"
import HomeScreen from '../screens/Home';
import Details from "../screens/DetailsProducs";
import Register from '../screens/Register';
import SignIn from '../screens/SignIn';
import Search from "../screens/SearchBar"
import CategoryDetail from '../screens/CategoryProducts';
const Stack = createStackNavigator();


export default function NavigateStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabsNavigator} />
      <Stack.Screen name="SearchInput" component={Search} />
      <Stack.Screen name="DetailsProduct" component={Details} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category" component={CategoryDetail} />
  
    </Stack.Navigator>
  );
}