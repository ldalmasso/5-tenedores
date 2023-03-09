import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../utils";
import { v4 as uuid } from "uuid";
import { size, forEach } from "lodash";
import { styles } from "./BtnFavoritesStyles";

export function BtnFavorites(props) {
  const { restaurantId } = props;
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [isReload, setIsReload] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      const response = await getFavorites();
      if (size(response) > 0) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    })();
  }, [restaurantId, isReload]);

  const getFavorites = async () => {
    const q = query(
      collection(db, "favorites"),
      where("idRestaurant", "==", restaurantId),
      where("idUser", "==", auth.currentUser.uid)
    );
    const result = await getDocs(q);
    return result.docs;
  };

  const onReload = () => {
    setIsReload((prevState) => !prevState);
  };
  const addFavorites = async () => {
    try {
      const idFavorites = uuid();
      const data = {
        idFavorites: idFavorites,
        idRestaurant: restaurantId,
        idUser: auth.currentUser.uid,
      };
      await setDoc(doc(db, "favorites", idFavorites), data);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorites = async () => {
    try {
      const response = await getFavorites();
      forEach(response, async (item) => {
        await deleteDoc(doc(db, "favorites", item.id));
      });
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.content}>
      {isFavorite !== undefined && (
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          onPress={!isFavorite ? addFavorites : removeFavorites}
        ></Icon>
      )}
    </View>
  );
}
