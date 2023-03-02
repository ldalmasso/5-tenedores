import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { initialValues, validationSchema } from "./ChangeEmailFormData";
import Toast from "react-native-toast-message";
import { styles } from "./ChangeEmailFormStyles";

export function ChangeEmailForm(props) {
  const { onClose, onReload } = props;

  const [showPassword, setShowPassword] = useState(false);

  function onChangeShowPassword() {
    setShowPassword((precState) => !precState);
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { email, password } = formValue;
        const currentUser = getAuth().currentUser;
        const credentialUser = EmailAuthProvider.credential(
          currentUser.email,
          password
        );

        reauthenticateWithCredential(currentUser, credentialUser);
        await updateEmail(currentUser, email);

        onClose();
        onReload();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el Email",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nuevo Email"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? true : false}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => {
            onChangeShowPassword();
          },
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar Email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
