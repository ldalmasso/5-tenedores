import React, { useState } from "react";
import { View } from "react-native";
import { InfoUser, AccountOptions } from "../../../components/Account";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { LoadingModal } from "../../../components";
import { styles } from "./UserLoggedScreen.Styles";

export function UserLoggedScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View style={styles.content}>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
      <AccountOptions onReload={onReload}></AccountOptions>
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btn}
        titleStyle={styles.btnText}
        onPress={logout}
      />
      <LoadingModal show={loading} text={loadingText}></LoadingModal>
    </View>
  );
}
