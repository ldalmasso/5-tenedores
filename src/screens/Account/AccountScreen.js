import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserGuestScreen } from "../Account/UserGuestScreen";
import { UserLoggedScreen } from "../Account/UserLoggedScreen";
import { LoadingModal } from "../../components";

export function AccountScreen() {
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => setHasLogged(user ? true : false));
  }, []);

  if (hasLogged === null) {
    return <LoadingModal show text="Cargando" />;
  }

  return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />;
}
