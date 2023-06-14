
import { NavigationContainer } from "@react-navigation/native";
import NavigateStack from "./src/navigation/StackScreenNav"

import { Provider } from 'react-redux'
import store from "./store/store.jsx"

export default function App() {
  return (
<Provider store={store}> 
   <NavigationContainer>
      <NavigateStack />

   </NavigationContainer>
</Provider>
  );
}


