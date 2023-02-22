import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { screen } from "../../utils";
//Alternativa para pasaje de parámetro del navigator
//import { useNavigation } from "@react-navigation/native";

export function RestaurantsScreen(props) {
  //Alternativa para pasaje de parámetro del navigator
  //const navigation = useNavigation();
  const { navigation } = props;

  const goToAddRestaurant = () => {
    //Ejemplo para navegar a otro Tab
    //navigation.navigate(screen.account.tab, { screen: screen.account.root });
    navigation.navigate(screen.restaurant.add);
  };

  return (
    <View>
      <Text>Estamos en el screen Restaurants</Text>
      <Button title={"Crear Restaurant"} onPress={goToAddRestaurant}></Button>
    </View>
  );
}
