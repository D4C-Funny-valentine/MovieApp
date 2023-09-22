import { View, ScrollView, Dimensions, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import FavoriteButton from "../components/FavoriteButton";
import MovieLists from "../components/MovieLists";
import Loading from "../components/Loading";
import {
  fallbackPersonImage,
  fetchPersonDetail,
  fetchPersonMovie,
  image342, 
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const PersonScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [personDetail, setPersonDetail] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPersonDetail();
    getPersonMovie();
  }, [item]);

  const getPersonDetail = async () => {
    const data = await fetchPersonDetail(item.id);
    if (data) {
      setPersonDetail(data);
      setIsLoading(false);
    }
  };

  const getPersonMovie = async () => {
    const data = await fetchPersonMovie(item.id);
    if (data && data.cast) {
      setPersonMovies(data?.cast);
      setIsLoading(false);
    }
  };
  return (
    <ScrollView
      style={{ flex: 1 }}
      className="bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <FavoriteButton isAbsolute={false} />
      {/* person detail */}
      {isLoading ? (
        <Loading />
      ) : (
        <View className="mt-3">
          <View
            className="justify-center flex-row"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="items-center overflow-hidden w-72 h-72 rounded-full border-2 border-neutral-500 shadow-2xl shadow-white">
              <Image
                // source={require("../assets/images/actor1.jpeg")}
                source={{
                  uri:
                    image342(personDetail?.profile_path) || fallbackPersonImage,
                }}
                className=""
                style={{ width: width * 0.74, height: height * 0.43 }}
              />
            </View>
          </View>

          {/* name and location */}
          <View className="mt-4">
            <Text className="text-2xl text-white text-center font-bold">
              {personDetail?.name}
            </Text>
            <Text className="text-neutral-400 text-center">
              {personDetail?.place_of_birth}
            </Text>
          </View>

          {/* gender | birthday | known for | popularity */}
          <View className="mt-4 mx-3 p-4 rounded-full bg-neutral-700 justify-between items-center flex-row">
            <View className=" justify-center items-center space-y-1 border-r-2 border-r-neutral-400 px-2">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-xs">
                {personDetail.gender === 2
                  ? "Male"
                  : personDetail.gender === 1
                  ? "Female"
                  : personDetail.gender === 3
                  ? "Non-binary"
                  : "Not set"}
              </Text>
            </View>
            <View className=" justify-center items-center space-y-1 border-r-2 border-r-neutral-400 px-2">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-xs">
                {personDetail?.birthday}
              </Text>
            </View>
            <View className=" justify-center items-center space-y-1 border-r-2 border-r-neutral-400 px-2">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-xs">
                {personDetail?.known_for_department}
              </Text>
            </View>
            <View className=" justify-center items-center space-y-1 px-2">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-xs">
                {personDetail?.popularity}
              </Text>
            </View>
          </View>

          {/* bio */}
          <View className="mx-4 my-6 space-y-2">
            <Text className="text-white text-lg font-semibold">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {personDetail?.biography || "N/A"}
            </Text>
          </View>
          {personMovies.length > 0 && (
            <MovieLists
              title={"Movies"}
              data={personMovies}
              hideSeeAll={true}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
