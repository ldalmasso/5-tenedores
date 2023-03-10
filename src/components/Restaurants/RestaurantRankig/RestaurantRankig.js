import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Image, Icon, Rating } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./RestaurantRankigStyles";

export function RestaurantRankig(props) {
  const { restaurant, index } = props;
  const navigator = useNavigation();

  const goToRestaurant = () => {
    navigator.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.item,
      params: { id: restaurant.id },
    });
  };

  const renderMedal = () => {
    if (index > 2) return;

    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      ></Icon>
    );
  };

  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View style={styles.content}>
        <Image
          source={{ uri: restaurant.images[0] }}
          style={styles.image}
        ></Image>
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{restaurant.name}</Text>
          </View>

          <Rating
            startingValue={restaurant.ratingMedia}
            imageSize={15}
            readonly
          ></Rating>
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
