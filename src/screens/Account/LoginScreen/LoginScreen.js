import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { LoginForm } from "../../../components/Auth";
import { screen } from "../../../utils";
import { styles } from "./LoginScreen.Styles";

export function LoginScreen() {
  const navigator = useNavigation();
  const goToRegister = () => {
    navigator.navigate(screen.account.register);
  };
  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/5-tenedores-logo-w.jpg")}
        style={styles.image}
      />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>
          ¿Aún no tienes cuenta?&nbsp;
          <Text onPress={goToRegister} style={styles.btnRegister}>
            Registrate
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
