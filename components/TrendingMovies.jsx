import { View, Text, Dimensions } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";

const TrendingMovies = ({ data }) => {
  var { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("MovieDetail", item);
  };
  return (
    <View className=" mb-8">
      <Text className="text-xl text-white mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        sliderWidth={width}
        itemWidth={width * 0.57}
        firstItem={2}
        inactiveSlideOpacity={0.4}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            width={width}
            height={height}
            handleClick={handleClick}
          />
        )}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

export default TrendingMovies;
