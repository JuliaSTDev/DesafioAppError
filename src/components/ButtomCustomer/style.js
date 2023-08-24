import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
      width: 60,
      height: 60,
      borderRadius: 40 / 2,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      shadowRadius: 10,
      shadowColor: "#ffff",
      shadowOpacity: 0.9,
      shadowOffset: {
        height: 10,
      },
    },
  
    menu: {
      backgroundColor: "#ffff",
      opacity: 0.9,
    },
  });