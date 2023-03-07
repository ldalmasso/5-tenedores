import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./LoadingStyles";

export function Loading(props) {
  const { show, text } = props;

  if (!show) return null;

  return (
    <View syle={styles.content}>
      <ActivityIndicator size="large" color="#00a680" style={styles.activity} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}
