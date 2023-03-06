import React, { useState } from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./RegisterForm.data";
import { styles } from "./RegisterForm.Styles";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const showHiddenPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const navigator = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigator.navigate(screen.account.root);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al registrarse, intente más tarde.",
        });
        //console.log(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
        rightIcon=<Icon
          type="material-community"
          name="at"
          style={styles.icon}
        />
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
        rightIcon=<Icon
          type="material-community"
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          style={styles.icon}
          onPress={showHiddenPassword}
        />
      />
      <Input
        placeholder="Confirmar contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        onChangeText={(text) => formik.setFieldValue("repeatpassword", text)}
        errorMessage={formik.errors.repeatpassword}
        rightIcon=<Icon
          type="material-community"
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          style={styles.icon}
          onPress={showHiddenPassword}
        />
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
