
import { NavigationContainer } from "@react-navigation/native";
import BottomTabsNavigator from "./src/navigation/BottomTabsNav"
import { Provider } from "react-redux";
import store from "./store/store.jsx"
export default function App() {
  return (
<Provider store={store}>
   <NavigationContainer>
      <BottomTabsNavigator />

   </NavigationContainer>
 </Provider>
  );
}

