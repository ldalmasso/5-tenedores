import React from "react";
import { View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { styles } from "./RegisterForm.Styles";

export function RegisterForm() {
  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.input}
        rightIcon=<Icon
          type="material-community"
          name="at"
          style={styles.icon}
        />
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={true}
        rightIcon=<Icon
          type="material-community"
          name="eyes-outline"
          style={styles.icon}
        />
      />
      <Input
        placeholder="Confirmar contraseña"
        containerStyle={styles.input}
        secureTextEntry={true}
        rightIcon=<Icon
          type="material-community"
          name="eyes-outline"
          style={styles.icon}
        />
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
      />
    </View>
  );
}
