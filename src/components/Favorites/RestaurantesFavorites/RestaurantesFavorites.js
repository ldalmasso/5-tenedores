import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Image, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import { screen, db } from "../../../utils";
import { styles } from "./RestaurantesFavoritesStyles";

export function RestaurantesFavorites(props) {
  const { restaurant } = props;
  const navigator = useNavigation();

  const goToRestaurant = () => {
    navigator.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.item,
      params: { id: restaurant.id },
    });
  };

  const removeFaverite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", restaurant.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View style={styles.content}>
        <Image
          source={{ uri: restaurant.images[0] }}
          style={styles.image}
        ></Image>
        <View style={styles.infoContent}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            size={35}
            containerStyle={styles.iconContainer}
            color="#f00"
            onPress={removeFaverite}
          ></Icon>
        </View>
      </View>
    </TouchableOpacity>
  );
}
