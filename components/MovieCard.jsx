import { Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { fallbackMoviePoster, image500 } from "../api/moviedb";

const MovieCard = ({ item, width, height, handleClick }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => handleClick(item)}
    >
      <Image
        // source={require("../assets/images/movie.jpg")}
        source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
        style={{ width: width * 0.53, height: height * 0.45 }}
        className=" rounded-2xl"
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
