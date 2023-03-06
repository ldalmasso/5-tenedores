import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./LoginForm.Data";
import { screen } from "../../../utils";
import { styles } from "./LoginForm.Styles";
import { async } from "@firebase/util";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigator = useNavigation();

  const showHiddenPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //console.log(formValue);
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigator.navigate(screen.account.root);
      } catch (error) {
        //console.log(error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Email y contraseñas inválidos",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo Electrónico"
        style={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      ></Button>
    </View>
  );
}
