import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { screen } from "../../../utils";
import { styles } from "./RestaurantsScreenStyles";
//Alternativa para pasaje de parámetro del navigator
//import { useNavigation } from "@react-navigation/native";

export function RestaurantsScreen(props) {
  //Alternativa para pasaje de parámetro del navigator
  //const navigation = useNavigation();
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const goToAddRestaurant = () => {
    //Ejemplo para navegar a otro Tab
    //navigation.navigate(screen.account.tab, { screen: screen.account.root });
    navigation.navigate(screen.restaurant.add);
  };

  return (
    <View style={styles.content}>
      <Text>Estamos en el screen Restaurants</Text>

      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        ></Icon>
      )}
    </View>
  );
}
