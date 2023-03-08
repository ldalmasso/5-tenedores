import React from "react";
import MapView, { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";
import { styles } from "./MapStyles";

export function Map(props) {
  const { location, name } = props;
  //console.log(location);
  //console.log(name);

  const onOpenMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name,
    });
  };

  return (
    <MapView
      initialRegion={location}
      style={styles.content}
      onPress={onOpenMap}
    >
      <Marker coordinate={location}></Marker>
    </MapView>
  );
}
