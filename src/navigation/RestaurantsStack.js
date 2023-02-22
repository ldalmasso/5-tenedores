import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen";
import { AddRestaurants } from "../screens/Restaurants/AddRestaurants";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restaurant.root}
        component={RestaurantsScreen}
        options={{ title: "Restaurantes" }}
      ></Stack.Screen>
      <Stack.Screen
        name={screen.restaurant.add}
        component={AddRestaurants}
        options={{ title: "Añadir Restorant" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
