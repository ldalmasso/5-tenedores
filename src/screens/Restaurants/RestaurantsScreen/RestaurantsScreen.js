import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { screen, db } from "../../../utils";
import { LoadingModal } from "../../../components/shared";
import { ListRestaurants } from "../../../components/Restaurants";
import { map } from "lodash";
import { styles } from "./RestaurantsScreenStyles";
//Alternativa para pasaje de parámetro del navigator
//import { useNavigation } from "@react-navigation/native";

export function RestaurantsScreen(props) {
  //Alternativa para pasaje de parámetro del navigator
  //const navigation = useNavigation();
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "restaurants"), orderBy("createAt", "desc"));

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      //console.log("restaurants", data);
      setRestaurants(data);
    });
  }, []);

  const goToAddRestaurant = () => {
    //Ejemplo para navegar a otro Tab
    //navigation.navigate(screen.account.tab, { screen: screen.account.root });
    navigation.navigate(screen.restaurant.add);
  };

  return (
    <View style={styles.content}>
      {!restaurants ? (
        <LoadingModal show text="Cargando"></LoadingModal>
      ) : (
        <ListRestaurants restaurants={restaurants} />
      )}

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
