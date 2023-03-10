import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { map } from "lodash";
import { RestaurantRankig } from "../components/Restaurants";
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
    });
  }, []);

  return (
    <ScrollView>
      {map(restaurants, (restaurant, index) => (
        <RestaurantRankig
          key={index}
          index={index}
          restaurant={restaurant.data()}
        ></RestaurantRankig>
      ))}
    </ScrollView>
  );
}
