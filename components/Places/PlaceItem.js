import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";
import IconButton from "../UI/IconButton";
import { Ionicons } from "@expo/vector-icons";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.pressableContainer,
          pressed && styles.pressed,
        ]}
        android_ripple={{ color: Colors.secondary600 }}
        onPress={onSelect}
      >
        <Image style={styles.image} source={{ uri: place.imageUri }} />

        <View style={styles.info}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <View style={{ justifyContent: "flex-end", padding: 8 }}>
          <Ionicons
            name="arrow-forward-circle"
            color={Colors.accent}
            size={24}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  outerContainer: {
    overflow: "hidden",
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    marginBottom: 18,
    elevation: 6,
  },
  pressableContainer: {
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    flex: 3,
    height: 100,
  },
  info: {
    flex: 4,
    padding: 12,
  },
  title: { color: Colors.primary, fontWeight: "bold", fontSize: 18 },
  address: { color: Colors.primary600, fontSize: 12, marginVertical: 6 },
});
