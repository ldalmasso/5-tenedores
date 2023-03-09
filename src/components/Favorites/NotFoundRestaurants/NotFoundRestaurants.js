import React from "react";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { styles } from "./NotFoundRestaurantsStyles";

export function NotFoundRestaurants() {
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80}></Icon>
      <Text style={styles.text}>No tienes restaurantes en tu lista</Text>
    </View>
  );
}
