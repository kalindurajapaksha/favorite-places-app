import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = () => {
  const [enteredValues, setEnteredValues] = useState({
    title: "",
  });
  const onChangeValues = (label, value) => {
    if (label === "title") {
      setEnteredValues((currValues) => ({
        ...currValues,
        title: value,
      }));
    }
  };
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={onChangeValues.bind(this, "title")}
          value={enteredValues.title}
          style={styles.input}
        />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 2,
    color: Colors.secondary,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: Colors.primary600,
    borderRadius: 8,
    alignItems: "center",
  },
});
