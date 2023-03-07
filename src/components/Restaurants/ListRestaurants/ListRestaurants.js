import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./ListRestaurantsStyles";

export function ListRestaurants(props) {
  const { restaurants } = props;
  const navigator = useNavigation();

  const goToRestaurant = (restaurant) => {
    navigator.navigate(screen.restaurant.item, { id: restaurant.id });
  };

  return (
    <FlatList
      data={restaurants}
      renderItem={(doc) => {
        const restaurant = doc.item;
        console.log(restaurant);
        return (
          <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
            <View style={styles.restaurant}>
              <Image
                source={{ uri: restaurant.images[0] }}
                style={styles.image}
              />
              <View>
                <Text style={styles.name}>{restaurant.name}</Text>
                <Text style={styles.info}>{restaurant.address}</Text>
                <Text style={styles.info}>{restaurant.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    ></FlatList>
  );
}
