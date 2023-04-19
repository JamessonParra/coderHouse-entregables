import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getData } from '../utils/DatabaseUtils';

const DeviceInfoPanel = ({ deviceId }) => {
  const [device, setDevice] = useState(null);

  useEffect(() => {
    // Obtiene los datos del dispositivo de la tabla "devices" usando el ID único
    getData('devices', 'device_id', deviceId, (result) => {
      console.log(result);
      if (result.rows.length > 0) {
        setDevice(result.rows.item(0));
      }
    });
  }, [deviceId]);

  if (!device) {
    return null;
  }

  return (
    <View>
      <Text>Device Info:</Text>
      <Text>Device ID: {device.device_id}</Text>
      <Text>Name: {device.name}</Text>
      <Text>Manufacturer: {device.manufacturer}</Text>
      <Text>Model: {device.model}</Text>
    </View>
  );
};

export default DeviceInfoPanel;