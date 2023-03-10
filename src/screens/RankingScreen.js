import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { size, map } from "lodash";
import { db } from "../utils";

export function RankingScreen() {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("ratingMedia", "desc"),
      limit(5)
    );

    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
      console.log(size(restaurants));
    });
  }, []);

  return (
    <View>
      <Text>Estamos en el screen de anking</Text>
    </View>
  );
}
