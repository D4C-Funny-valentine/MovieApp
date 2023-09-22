import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  FadeInLeft,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const animationTime = ["M", "O", "V", "I", "E"];
  const navigation = useNavigation();

  useEffect(() => {
    const time = setTimeout(() => {
      navigation.navigate("Home")
    }, 2500);
    () => clearTimeout(time);
  }, []);
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      className=" bg-neutral-800"
    >
      <View style={{ flexDirection: "row", gap: 3 }}>
        {animationTime.map((item, index) => (
          <Animated.Text
            key={index}
            style={{ fontSize: 46, color: "#cc0011", fontWeight: "bold" }}
            entering={FadeInLeft.springify()
              .damping(30 * index)
              .mass(1 * index + 1)
              .stiffness(30)
              .overshootClamping(false)
              .restDisplacementThreshold(0.1)
              .restSpeedThreshold(5)}
          >
            {item}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

export default WelcomeScreen;
