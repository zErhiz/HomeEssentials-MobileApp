import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home";
import Cart from "../screens/Cart";
import Register from "../screens/Register";
import SignIn from "../screens/SignIn";
const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Register" component={Register} />
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="Cart" component={Cart} />

    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
