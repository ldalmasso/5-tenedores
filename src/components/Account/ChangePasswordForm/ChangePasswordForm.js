import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangePasswordFormData";
import Toast from "react-native-toast-message";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { styles } from "./ChangePasswordFormStyles";

export function ChangePasswordForm(props) {
  const { onClose, onReload } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  function onChangeShowPassword() {
    setShowPassword((prevState) => !prevState);
  }
  function onChangeShowOldPassword() {
    setShowOldPassword((prevState) => !prevState);
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;
        const credentialUser = EmailAuthProvider.credential(
          currentUser.email,
          formValue.oldpassword
        );
        await reauthenticateWithCredential(currentUser, credentialUser);
        await updatePassword(currentUser, formik.password);
        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar la password",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Contraseña actual"
        secureTextEntry={showOldPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showOldPassword ? "eye-outline" : "eye-off-outline",
          onPress: () => {
            onChangeShowOldPassword();
          },
        }}
        onChangeText={(text) => formik.setFieldValue("oldpassword", text)}
        errorMessage={formik.errors.oldpassword}
      ></Input>
      <Input
        placeholder="Nueva contraseñas"
        style={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          onPress: () => {
            onChangeShowPassword();
          },
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      ></Input>
      <Input
        placeholder="Repetir nueva contraseña"
        style={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          onPress: () => {
            onChangeShowPassword();
          },
        }}
        onChangeText={(text) => formik.setFieldValue("repitepassword", text)}
        errorMessage={formik.errors.repitepassword}
      ></Input>
      <Button
        title="Cambiar Contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      ></Button>
    </View>
  );
}
