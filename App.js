import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import { Colors } from "./constants/colors";
import IconButton from "./components/UI/IconButton";
import { Ionicons } from "@expo/vector-icons";
import Map from "./screens/Map";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary },
            headerShadowVisible: false,
            headerTintColor: Colors.secondary,
            contentStyle: {
              backgroundColor: Colors.primary,
            },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Favorites",
              headerRight: () => (
                // <Ionicons
                //   name="add-circle"
                //   color={Colors.accent}
                //   size={26}
                //   onPress={() => navigation.navigate("AddPlace")}
                // />
                <IconButton
                  color={Colors.accent}
                  size={26}
                  icon="add-circle"
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add New",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
