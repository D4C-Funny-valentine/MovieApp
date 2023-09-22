import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { fallbackMoviePoster, image342 } from "../api/moviedb";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");
const MovieCard342 = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.push("MovieDetail", item)}
    >
      <View className="space-y-2 mb-4">
        <Image
          className="rounded-2xl"
          // source={require("../assets/images/movie.jpg")}
          source={{
            uri: image342(item?.poster_path) || fallbackMoviePoster,
          }}
          style={{ width: width * 0.44, height: height * 0.36 }}
        />
        <Text className="text-neutral-300 ml-1">
          {item.title.length > 21
            ? item.title.slice(0, 21) + "..."
            : item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard342;
