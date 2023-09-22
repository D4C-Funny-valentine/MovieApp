import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import styles from "../style/CustomStyle";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/moviedb";

const MovieLists = ({ title, data, hideSeeAll }) => {

  var { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row justify-between items-center mx-4 mb-5">
        <Text className="text-xl text-white ">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={() => navigation.navigate("SeeAll")}>
            <Text style={styles.color} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* upcoming movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.results?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.push("MovieDetail", item)}
          >
            <View className="space-y-1 mr-3">
              <Image
                // source={require("../assets/images/movie.jpg")}
                source={{
                  uri: image185(item.poster_path) || fallbackMoviePoster,
                }}
                style={{ width: width * 0.35, height: height * 0.3 }}
                className="rounded-xl"
              />
            </View>
            <Text numberOfLines={1} className="text-neutral-300">
              {item?.title.length > 16
                ? item?.title.slice(0, 16) + "..."
                : item?.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieLists;
