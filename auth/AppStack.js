import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
import SellAllScreen from "../screens/SellAllScreen";
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen name="Person" component={PersonScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ presentation: "modal", animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="SeeAll"
        component={SellAllScreen}
        options={{
          presentation: "fullScreenModal",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
