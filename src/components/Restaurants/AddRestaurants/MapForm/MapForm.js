import Reac, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Toast from "react-native-toast-message";
import { Modal } from "../../../shared/Modal";
import { styles } from "./MapFormStyle";
import { Marker } from "react-native-maps";
import { Button } from "react-native-elements";

export function MapForm(props) {
  const { show, close, formik } = props;

  const [location, setLocation] = useState({
    latitude: -34.604,
    longitude: -58.381,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);

      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Se necesitan permisos de acceso a geolocalización",
        });
        return;
      }
      const locationTemp = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
      console.log(location);
    })();
  }, []);

  const saveLocation = () => {
    formik.setFieldValue("location", location);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <MapView
        initialRegion={location}
        showsUserLocation={true}
        style={styles.mapStyle}
        onRegionChange={(locationTemp) => setLocation(locationTemp)}
      >
        <Marker draggable coordinate={location}></Marker>
      </MapView>
      <View style={styles.mapActions}>
        <Button
          title="Guardar"
          buttonStyle={styles.btnMapSave}
          containerStyle={styles.btnMapContainerSave}
          onPress={saveLocation}
        ></Button>
        <Button
          title="Cerrar"
          buttonStyle={styles.btnMapClose}
          containerStyle={styles.btnMapContainerClose}
          onPress={close}
        ></Button>
      </View>
    </Modal>
  );
}
