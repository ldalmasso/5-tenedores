import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    marginHorizontal: 15,
  },
  review: {
    paddingVertical: 20,
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
  },
  commentRating: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  comment: {
    paddingRight: 50,
  },
  starContainer: {
    flex: 1,
    height: 10,
    width: "100%",
    justifyContent: "flex-start",
  },
  date: {
    fontSize: 12,
    color: "#828282",
  },
});