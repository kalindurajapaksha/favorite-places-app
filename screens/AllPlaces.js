import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const results = await fetchPlaces();
      setLoadedPlaces(results);
    };

    if (isFocused) {
      // setLoadedPlaces((currPlaces) => {
      //   const newPlace = route.params.place;
      //   const isExist = currPlaces.find((place) => place.id === newPlace.id);
      //   if (!isExist) {
      //     return [newPlace, ...currPlaces];
      //   }
      //   return currPlaces;
      // });
      loadPlaces();
    }
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
