import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, AirbnbRating, Avatar, ListItem } from "react-native-elements";
import {
  doc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Loading } from "../../shared";
import { map } from "lodash";
import { DateTime } from "luxon";
import { styles } from "./ReviewStyle";
import "intl";
import "intl/locale-data/jsonp/es";

export function Review(props) {
  const { restaurantId } = props;
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", restaurantId),
      orderBy("createAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });
  }, []);

  if (!reviews) {
    return <Loading show text="Cargando opiniones" />;
  }

  return (
    <View style={styles.content}>
      {map(reviews, (review) => {
        const data = review.data();
        const fecha = new Date(data.createAt.seconds * 1000);
        return (
          <ListItem key={data.id} containerStyle={styles.review} bottomDivider>
            <Avatar source={{ uri: data.avatar }} rounded size={50}></Avatar>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
              <View style={styles.subtitle}>
                <Text style={styles.comment}>{data.comment}</Text>
                <View style={styles.commentRating}>
                  <AirbnbRating
                    defaultRating={data.rating}
                    isDisabled
                    showRating={false}
                    size={15}
                    starContainerStyle={styles.starContainer}
                  ></AirbnbRating>
                  <Text style={styles.date}>
                    {DateTime.fromISO(fecha.toISOString()).toFormat(
                      "yyyy/LL/dd hh-mm"
                    )}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}
