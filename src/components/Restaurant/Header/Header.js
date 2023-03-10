import React from "react";
import { View } from "react-native";
import { Text, Rating } from "react-native-elements";
import { styles } from "./HeaderStyles";

export function Header(props) {
  const { restaurant } = props;
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Rating
          imageSize={20}
          readonly={true}
          startingValue={restaurant.ratingMedia ? restaurant.ratingMedia : 0}
        ></Rating>
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  );
}
