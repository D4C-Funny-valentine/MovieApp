import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieLists from "../components/MovieLists";
import FavoriteButton from "../components/FavoriteButton";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchMovieCredit,
  fetchMovieDetail,
  fetchSimilarMovie,
  image342,
  image500,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

const MovieDetailScreen = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const { params: item } = useRoute();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  //for detail loading
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const movieName = "Return Of The Jedi";
  useEffect(() => {
    getMovieDetail();
    getSimilarMovie();
    getMovieCredit();
  }, [item]);

  const getMovieDetail = async () => {
    const data = await fetchMovieDetail(item.id);
    if (data) {
      setMovieDetail(data);
      setIsLoading(false);
    }
  };

  const getMovieCredit = async () => {
    const data = await fetchMovieCredit(item.id);
    if (data) {
      setCast(data.cast);
      setIsLoading(false);
    }
  };

  const getSimilarMovie = async () => {
    const data = await fetchSimilarMovie(item.id);
    if (data && data.results) {
      setSimilarMovies(data.results);
      setIsLoading(false);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View className="w-full">
        <FavoriteButton isAbsolute={true} />

        {isLoading ? (
          <Loading />
        ) : (
          <View className="w-full">
            <View>
              <Image
                source={{
                  uri: image500(movieDetail.poster_path) || fallbackMoviePoster,
                }}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 2 }}
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,0)",
                ]}
                style={{ width, height: height * 0.4 }}
                className=" absolute bottom-0"
              />
            </View>

            {/* movie details */}
            <View style={{ marginTop: -(height * 0.1) }} className="space-y-2">
              {/* title */}
              <Text className="text-white text-2xl font-semibold text-center tracking-wider">
                {movieDetail.title}
              </Text>

              {/* release data, runtime, status */}
              <Text className="text-neutral-400 font-semibold text-center">
                Released • {movieDetail?.release_date} • {movieDetail?.runtime}{" "}
                min
              </Text>

              {/* genres */}
              <View className="flex-row space-x-2 justify-center items-center">
                {movieDetail?.genres?.map((genre, index) => {
                  let showDot = index + 1 != movieDetail?.genres?.length;
                  return (
                    <Text
                      key={(genre, index.id)}
                      className="text-neutral-400 font-semibold"
                    >
                      {(genre.name)} {showDot ? "•" : null}
                    </Text>
                  );
                })}
              </View>

              {/* description */}
              <Text className="text-neutral-400 mx-4 tracking-wide">
                {movieDetail?.overview}
              </Text>
            </View>

            {/* cast */}
            <Cast navigation={navigation} cast={cast} />

            {/* similar movies */}
            {similarMovies.length > 0 && (
              <MovieLists
                title={"Similar Movies"}
                data={similarMovies}
                hideSeeAll={true}
              />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MovieDetailScreen;
