import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/colors";

const Map = ({ navigation, route }) => {
  const initialLocation = route.params && route.params.location;
  console.log("🚀 ~ file: Map.js:9 ~ Map ~ initialLocation:", initialLocation);
  const [selectedLocation, setSelectedLocation] = useState(
    initialLocation
      ? {
          latitude: initialLocation.lat,
          longitude: initialLocation.lng,
        }
      : null
  );

  const region = {
    latitude: initialLocation?.lat || 6.959495733817046,
    longitude: initialLocation?.lng || 80.2024989558149,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (initialLocation) {
      return;
    }
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ latitude, longitude });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "Select the desired place on map to add location."
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.latitude,
      pickedLng: selectedLocation.longitude,
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          color={Colors.accent}
          size={26}
          icon="checkmark-circle"
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker title="Picked Location" coordinate={selectedLocation} />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: { flex: 1 },
});
