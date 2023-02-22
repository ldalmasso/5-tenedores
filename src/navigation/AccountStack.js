import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from "../screens/AccountScreen";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.root}
        component={AccountScreen}
        options={{ title: "Cuenta" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
