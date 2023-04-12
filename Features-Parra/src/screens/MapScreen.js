import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
    const [region, setRegion] = useState(null);
  
    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: '',
              message: 'Para usar la app se necesita acceder a tu ubicación',
              buttonNeutral: 'Tal vez luego',
              buttonNegative: 'No',
              buttonPositive: 'Si',
            },
          );
      
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
      
            const hasLocationPermission = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
      
            if (hasLocationPermission) {
              Geolocation.getCurrentPosition(
                position => {
                  console.log('getCurrentPosition success');
                  setRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  });
                },
                error => {
                  console.log(error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              );
            } else {
              console.error('Location permission denied');
            }
          } else {
            console.error('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
    };
  
    useEffect(() => {
      requestLocationPermission();
    }, []);
  
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={region}>
          {region && <Marker coordinate={region} />}
        </MapView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;