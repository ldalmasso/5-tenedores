import React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeDisplayNameFormData";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";
import { styles } from "./ChangeDisplayNameFormStyles";
import { async } from "@firebase/util";

export function ChangeDisplayNameForm(props) {
  const { onClose, onReload } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, { displayName: displayName });
        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar Nombre y apellido",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre y apellido"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      ></Input>
      <Button
        title={"Cambiar nombre y apellido"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      ></Button>
    </View>
  );
}
