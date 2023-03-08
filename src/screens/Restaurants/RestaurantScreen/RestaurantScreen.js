import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../../utils";
import { CarouselImages, Loading } from "../../../components/shared";
import { Header, Info, BtnReviewForm } from "../../../components/Restaurant";
import { styles } from "./RestaurantScreenStyles";

export function RestaurantScreen(props) {
  const { route } = props;
  const { width } = Dimensions.get("window");
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, []);

  //return <Loading show text="Cargando restaurant"></Loading>;

  if (!restaurant) {
    return <Loading show text="Cargando restaurant" />;
  }

  return (
    <ScrollView style={styles.content}>
      <CarouselImages
        arrayImages={restaurant.images}
        height={250}
        width={width}
      ></CarouselImages>
      <Header restaurant={restaurant}></Header>
      <Info restaurant={restaurant}></Info>
      <BtnReviewForm restaurantId={restaurant.id}></BtnReviewForm>
    </ScrollView>
  );
}
