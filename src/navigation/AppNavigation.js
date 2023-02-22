import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import { screen } from "../utils";
import { RestaurantsStack } from "../navigation/RestaurantsStack";
import { FavoritesStack } from "../navigation/FavoritesStack";
import { RankingStack } from "../navigation/RankingStack";
import { SearchStack } from "../navigation/SearchStack";
import { AccountStack } from "../navigation/AccountStack";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        headerShown: false,
        tabBarIcon: ({ color, size }) => iconOptions(route, color, size),
      })}
    >
      <Tab.Screen
        name={screen.restaurant.tab}
        component={RestaurantsStack}
        options={{ title: "Restautantes" }}
      />
      <Tab.Screen
        name={screen.favorites.tab}
        component={FavoritesStack}
        options={{ title: "Favoritos" }}
      />
      <Tab.Screen
        name={screen.ranking.tab}
        component={RankingStack}
        options={{ title: "Ranking" }}
      />
      <Tab.Screen
        name={screen.search.tab}
        component={SearchStack}
        options={{ title: "Búsqueda" }}
      />
      <Tab.Screen
        name={screen.account.tab}
        component={AccountStack}
        options={{ title: "Cuenta" }}
      />
    </Tab.Navigator>
  );
}

function iconOptions(route, color, size) {
  let iconName;

  if (route.name === screen.restaurant.tab) {
    iconName = "compass-outline";
  }
  if (route.name === screen.favorites.tab) {
    iconName = "heart-outline";
  }
  if (route.name === screen.ranking.tab) {
    iconName = "star-outline";
  }
  if (route.name === screen.search.tab) {
    iconName = "magnify";
  }
  if (route.name === screen.account.tab) {
    iconName = "home-outline";
  }
  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}

/*  tabBarIcon: ({ color, size }) => (
          <Icon
            type="material-community"
            name="compass-outline"
            color={color}
            size={size}
          />
*/
