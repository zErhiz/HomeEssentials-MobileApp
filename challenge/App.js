import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import { NavigationContainer } from "@react-navigation/native";
import NavigateStack from "./src/navigation/StackScreenNav"
import { Provider } from 'react-redux'
import store from "./store/store.jsx"

export default function App() {

  const [ fontsLoaded, setFontsLoaded ] = useState(false)

  useEffect(()=>{
    if (!fontsLoaded) {
      loadFonts()
    }
  })
  const loadFonts = async ()=>{
    await Font.loadAsync({
      'WixFont': require('./assets/fonts/WixMadeforText.ttf')
    })

    setFontsLoaded(true)
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavigateStack />
      </NavigationContainer>
    </Provider>
  );
}


