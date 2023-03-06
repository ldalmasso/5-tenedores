import React from "react";
import { View, Text } from "react-native";
import { Image } from "react-native-elements";
import { styles } from "./ImageRestaurantStyles";

export function ImageRestaurant(props) {
  const { formik } = props;
  const primaryImage = formik.values.images[0];
  return (
    <View style={styles.content}>
      <Image
        style={styles.image}
        source={
          primaryImage
            ? { uri: primaryImage }
            : require("../../../../../assets/img/not-found.png")
        }
      ></Image>
    </View>
  );
}
