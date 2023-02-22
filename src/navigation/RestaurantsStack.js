import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RestaurantsScreen } from "../screens/RestaurantsScreen";
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
    </Stack.Navigator>
  );
}
