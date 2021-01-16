import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import marMarker from '../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number;
}

export default function BarberMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  })

  function handleNavigateToBarberDetails(id : number) {
    navigation.navigate('BarberDetails', { id });
  }

  function handleNavigateToCreateBarber() {
    navigation.navigate('SelectMapPosition');
  }

  return (<View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: -22.8770256,
        longitude: -47.2440488,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
    >

      {orphanages.map(orphanage => {
        return (
          <Marker
          key={orphanage.id}
            calloutAnchor={{
              x: 2.1,
              y: 0.65,
            }}
            icon={marMarker}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout tooltip onPress={() => handleNavigateToBarberDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>

    <View style={styles.footer}>
      <Text style={styles.footerText}>{orphanages.length} barbearias encontradas</Text>
      <TouchableOpacity style={styles.createBarberButton} onPress={handleNavigateToCreateBarber}>
        <Feather name="plus" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255 ,255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center'
  },

  calloutText: {
    color: '#000',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 5,
  },

  footerText: {
    color: '#8fa7b3',
  },

  createBarberButton: {
    width: 56,
    height: 56,
    backgroundColor: '#828282',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  }

});