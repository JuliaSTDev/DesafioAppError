import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { styles } from "./style";

export default function CentralizeLocation({ onPress, iconName, iconPackage }) {
  const Icon = iconPackage === "Feather" ? Feather : MaterialIcons;

  return (
    <View>
     <TouchableOpacity style={[styles.button, styles.menu]} onPress={onPress}>
        <Icon name={iconName} size={25} color="#001C27" />
      </TouchableOpacity>
    </View>
  );
}

