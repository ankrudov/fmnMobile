import React, {useEffect} from 'react';
import SplashScreen from "react-native-splash-screen";
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { View } from 'react-native';

function App(): JSX.Element {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
      <WelcomeScreen/>
  );
}

export default App;
