import React from "react";
import { View, Text } from "react-native";
import { AirbnbRating, Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./AddReviewRestaurantScreenData";
import Toast from "react-native-toast-message";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../../../utils";
import { map, mean } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./AddReviewRestaurantScreenStyles";

export function AddReviewRestaurantScreen(props) {
  const { route } = props;
  const { params } = route;

  const navigator = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = uuid();
        const newData = formValue;
        newData.id = idDoc;
        newData.idRestaurant = params.restaurantId;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createAt = new Date();

        await setDoc(doc(db, "reviews", idDoc), newData);
        await updateRestaurant();

        navigator.goBack();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al guardar comentario",
        });
      }
    },
  });

  const updateRestaurant = async () => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", params.restaurantId)
    );

    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;
      const arrayStar = map(reviews, (review) => review.data().rating);
      const media = mean(arrayStar);

      const restaurantRef = doc(db, "restaurants", params.restaurantId);
      await updateDoc(restaurantRef, { ratingMedia: media });
    });
  };

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.rantinContent}>
          <AirbnbRating
            count={5}
            reviews={["Pésimo", "Mediocre", "Bueno", "Muy bueno", "Excelente"]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
          ></AirbnbRating>
        </View>
        <View>
          <Input
            placeholder="Título"
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          ></Input>
          <Input
            placeholder="Comentario"
            multiline
            style={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          ></Input>
        </View>
      </View>
      <Button
        title="Enviar review"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      ></Button>
    </View>
  );
}
