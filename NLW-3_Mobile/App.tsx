import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import marMarker from './src/images/map-marker.png';
import { Sansita_700Bold } from '@expo-google-fonts/sansita';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Sansita_700Bold
  })

  if (!fontsLoaded){
    return null;
  }

  return ( 
    <Routes />
   );
}

