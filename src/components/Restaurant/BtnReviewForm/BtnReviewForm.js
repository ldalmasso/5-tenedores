import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { screen, db } from "../../../utils";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { size } from "lodash";
import { styles } from "./BtnReviewFormStyle";

export function BtnReviewForm(props) {
  const { restaurantId } = props;
  const navigator = useNavigation();
  const [hasLogged, setHasLogged] = useState(false);
  const [hasSendReview, setHasSendReview] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  const goToAccount = () => {
    navigator.navigate(screen.account.tab, screen.account.login);
  };

  const goToAddReview = () => {
    navigator.navigate(screen.restaurant.addReview, { restaurantId });
  };

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", restaurantId),
        where("idUser", "==", auth.currentUser.uid)
      );
      onSnapshot(q, (snapshot) => {
        if (size(snapshot.docs) > 0) {
          setHasSendReview(true);
        } else {
          setHasSendReview(false);
        }
      });
    }
  }, [hasLogged]);

  if (hasLogged && hasSendReview) {
    return (
      <View style={styles.content}>
        <Text style={styles.text}>Ya has enviado una opinión</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button
          title="Deja tu un opinión"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={goToAddReview}
        ></Button>
      ) : (
        <Text style={styles.text} onPress={goToAccount}>
          Para dejar una opinión es necesario estar logueado.{" "}
          <Text style={styles.textClick}>Pulsa AQUI para iniciar sesión</Text>
        </Text>
      )}
    </View>
  );
}
