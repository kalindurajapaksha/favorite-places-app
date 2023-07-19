import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const OutlinedButton = ({ onPress, icon, children, style }) => {
  return (
    <View style={[styles.outerContainer, style]}>
      <Pressable
        android_ripple={{ color: Colors.primary600 }}
        style={({ pressed }) => [
          styles.pressableContainer,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        <Ionicons
          style={styles.icon}
          name={icon}
          size={20}
          color={Colors.accent}
        />
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 8,
    overflow: "hidden",
  },
  pressableContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.accent,
    fontWeight: "bold",
  },
});
