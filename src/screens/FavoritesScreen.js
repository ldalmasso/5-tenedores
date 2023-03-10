import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils";
import {
  UserNotLogged,
  NotFoundRestaurants,
  RestaurantesFavorites,
} from "../components/Favorites";
import { Loading } from "../components/shared";
import { size, map } from "lodash";

export function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "favorites"),
      where("idUser", "==", auth.currentUser.uid)
    );

    onSnapshot(q, async (snapshot) => {
      let arrayRestaurants = [];
      //recorro cada registro dado que sólo tengo los ids de los restaurantes, y para cada uno obtengo el restaurant
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "restaurants", data.idRestaurant);
        const docSnap = await getDoc(docRef);

        //le agrego el IdFavorites para luego poder eliminarlos del listado (requiero el identificador de "favorites")
        const newData = docSnap.data();
        newData.idFavorite = data.idFavorites;
        arrayRestaurants.push(newData);
      }
      setRestaurants(arrayRestaurants);
    });
  }, []);

  if (!hasLogged) {
    return <UserNotLogged></UserNotLogged>;
  }
  if (!restaurants) {
    return <Loading show text="Cargando favoritos"></Loading>;
  }
  if (size(restaurants) === 0) {
    return <NotFoundRestaurants></NotFoundRestaurants>;
  }

  return (
    <ScrollView>
      {map(restaurants, (item, key) => (
        <RestaurantesFavorites
          key={key}
          restaurant={item}
        ></RestaurantesFavorites>
      ))}
    </ScrollView>
  );
}
