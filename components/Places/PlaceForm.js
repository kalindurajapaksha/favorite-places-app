import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

const PlaceForm = ({ onCreatePlace }) => {
  const [enteredValues, setEnteredValues] = useState({
    title: "",
    image: null,
    location: null,
  });
  const onChangeValues = useCallback((label, value) => {
    setEnteredValues((currValues) => ({
      ...currValues,
      [label]: value,
    }));
  }, []);

  const takeImageHandler = (imageUri) => {
    onChangeValues("image", imageUri);
  };

  const pickLocationHandler = useCallback(
    (location) => {
      onChangeValues("location", location);
    },
    [onChangeValues]
  );

  const addPlaceHandler = () => {
    const { address, ...location } = enteredValues.location;
    const placeData = new Place(
      enteredValues.title,
      enteredValues.image,
      address,
      location
    );
    onCreatePlace(placeData);
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
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={addPlaceHandler}>Add</Button>
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
