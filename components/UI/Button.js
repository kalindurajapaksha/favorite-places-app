import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

const Button = ({ children, onPress }) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: Colors.accent600 }}
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 8,
    marginHorizontal: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: Colors.primary,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
});
