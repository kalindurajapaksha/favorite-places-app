import { View, Text } from "react-native";
import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    try {
      const result = await insertPlace(place);
      console.log("added_place_details: ", result);
    } catch (error) {
      console.log("error", error);
    }
    navigation.navigate("AllPlaces");
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
