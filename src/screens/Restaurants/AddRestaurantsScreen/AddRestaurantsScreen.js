import React from "react";
import { View, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddRestaurantsScreenData";
import {
  InfoForm,
  UploadImageForm,
  ImageRestaurant,
} from "../../../components/Restaurants/AddRestaurants";
import { doc, setDoc } from "@firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./AddRestaurantsScreenStyles";

export function AddRestaurantsScreen() {
  const navigator = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      //console.log(formValue);
      try {
        const newData = formValue;

        newData.id = uuid();
        newData.createAt = new Date();

        //console.log(newData);

        const myDB = doc(db, "restaurants", newData.id);
        await setDoc(myDB, newData);

        navigator.goBack();
      } catch (error) {
        //console.log(error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestaurant formik={formik}></ImageRestaurant>
      <InfoForm formik={formik}></InfoForm>
      <UploadImageForm formik={formik}></UploadImageForm>
      <Button
        title="Crear Restaurant"
        buttonStyle={styles.addRetaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      ></Button>
    </ScrollView>
  );
}
