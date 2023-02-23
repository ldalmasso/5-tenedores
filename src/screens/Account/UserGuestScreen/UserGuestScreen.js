import React from "react";
import { ScrollView } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";
import { styles } from "./UserGuestScreen.Styles";

export function UserGuestScreen() {
  const navigator = useNavigation();

  const goToLogin = () => {
    navigator.navigate(screen.account.login);
  };

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image
        source={require("../../../../assets/img/user-guest.png")}
        style={styles.image}
      ></Image>
      <Text style={styles.title}>Consultar tu perfil de 5 tenedores</Text>
      <Text style={styles.description}>
        Dolore occaecat cillum veniam cupidatat cupidatat adipisicing cupidatat
        deserunt cillum ipsum velit occaecat. Nulla ea mollit et nostrud sint
        ullamco cupidatat officia qui ut excepteur et ullamco eiusmod. Fugiat
        reprehenderit Lorem culpa officia nisi aute id aliquip velit cillum
        ipsum.
      </Text>
      <Button
        title={"Ver tu perfil"}
        onPress={goToLogin}
        buttonStyle={styles.btnStyle}
      ></Button>
    </ScrollView>
  );
}
