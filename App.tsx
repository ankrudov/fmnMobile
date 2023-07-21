import React, {useEffect} from 'react';
import {
  Text,
  View,
} from 'react-native';
import SplashScreen from "react-native-splash-screen";

function App(): JSX.Element {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
      <View style={{ flex: 1 }}>
        <Text>tEST</Text>
      </View>
  );
}

export default App;
