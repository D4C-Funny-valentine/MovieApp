import { Dimensions, View } from "react-native";
import LottieView from "lottie-react-native";

var { width, height } = Dimensions.get("window");
const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#171717",
      }}
    >
      <LottieView
        autoPlay
        style={{
          width: width,
          height: height,
          backgroundColor: "#0000",
        }}
        source={require("../assets/animation/movieAnimation.json")}
      />
    </View>
  );
};

export default Loading;
