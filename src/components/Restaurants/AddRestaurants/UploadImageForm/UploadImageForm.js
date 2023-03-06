import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./UploadImageFormStyles";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { LoadingModal } from "../../../shared";
import { map, filter } from "lodash";
import { async } from "@firebase/util";

export function UploadImageForm(props) {
  const { formik } = props;
  const [isLoading, setIsLoading] = useState(false);

  const openGalery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setIsLoading(true);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    //console.log(uri);
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `restaurants/${uuid()}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoRestaurant(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoRestaurant = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);

    //console.log(imageUrl);

    formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    setIsLoading(false);
  };

  const removeEmail = (img) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Está seguro de eliminar ésta foto?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            const result = filter(
              formik.values.images,
              (image) => image !== img
            );
            formik.setFieldValue("images", result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.viewImages}
      >
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGalery}
        ></Icon>

        {map(formik.values.images, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyle}
            onPress={() => removeEmail(image)}
          ></Avatar>
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={isLoading} text="Cargando imagen"></LoadingModal>
    </>
  );
}
