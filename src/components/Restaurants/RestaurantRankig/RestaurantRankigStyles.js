import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: "#fff",
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#828282",
    fontSize: 12,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 5,
  },
  medal: {
    marginRight: 5,
  },
  nameContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
