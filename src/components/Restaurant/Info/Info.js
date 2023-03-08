import React from "react";
import { View } from "react-native";
import { Text, Icon, ListItem } from "react-native-elements";
import { Map } from "../../shared";
import { map } from "lodash";
import { styles } from "./InfoStyles";

export function Info(props) {
  const { restaurant } = props;

  const listItem = [
    {
      text: restaurant.address,
      type: "material-community",
      iconName: "map-marker",
    },
    {
      text: restaurant.phone,
      type: "material-community",
      iconName: "phone",
    },
    {
      text: restaurant.email,
      type: "material-community",
      iconName: "at",
    },
  ];

  return (
    <View sytle={styles.content}>
      <Text style={styles.title}>Información del restaurante</Text>

      <Map location={restaurant.location} name={restaurant.name}></Map>

      {map(listItem, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.type} name={item.iconName} color="#00a680"></Icon>
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}
