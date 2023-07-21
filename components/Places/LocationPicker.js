import { View, StyleSheet, Image, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useMemo, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocationPicker = ({ onPickLocation }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [location, setLocation] = useState();
  const [status, requestPermission] = useForegroundPermissions();

  const mapPickedLocation = useMemo(
    () =>
      route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      },
    [route.params]
  );

  useEffect(() => {
    if (mapPickedLocation) {
      setLocation(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  useEffect(() => {
    if (location) {
      (async () => {
        const address = await getAddress(location);
        onPickLocation({ ...location, address });
      })();
    }
  }, [location, onPickLocation]);

  const verifyPermission = async () => {
    if (status !== PermissionStatus.GRANTED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };
  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>Pick your location</Text>;

  if (location) {
    locationPreview = (
      <Image
        style={styles.mapImage}
        source={{ uri: getMapPreview(location) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton
          icon="location"
          style={styles.button}
          onPress={getLocationHandler}
        >
          Locate User
        </OutlinedButton>
        <OutlinedButton
          icon="map"
          style={styles.button}
          onPress={pickOnMapHandler}
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary600,
    borderRadius: 8,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
