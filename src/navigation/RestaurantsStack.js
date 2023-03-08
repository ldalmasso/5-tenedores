import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen";
import { AddRestaurantsScreen } from "../screens/Restaurants/AddRestaurantsScreen";
import { RestaurantScreen } from "../screens/Restaurants/RestaurantScreen";
import { AddReviewRestaurantScreen } from "../screens/Restaurants/AddReviewRestaurantScreen";
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
        component={AddRestaurantsScreen}
        options={{ title: "Añadir Restaurant" }}
      ></Stack.Screen>
      <Stack.Screen
        name={screen.restaurant.item}
        component={RestaurantScreen}
        options={{ title: "Restaurant" }}
      ></Stack.Screen>
      <Stack.Screen
        name={screen.restaurant.addReview}
        component={AddReviewRestaurantScreen}
        options={{ title: "Añadir opinión" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
