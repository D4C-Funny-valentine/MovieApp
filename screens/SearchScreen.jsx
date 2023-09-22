import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MagnifyingGlassCircleIcon,
  ArrowLongLeftIcon,
} from "react-native-heroicons/solid";
import styles from "../style/CustomStyle";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import { fetchSearchMovie } from "../api/moviedb";
import MovieCard342 from "../components/MovieCard342";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = (text) => {
    if (text && text.length >= 1) {
      setIsLoading(true);
      fetchSearchMovie({
        query: text,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        if (data && data.results) {
          setResult(data.results);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
      setResult([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(searchHandler, 400), []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      {/* search bar */}
      <View className="flex-row justify-between items-center rounded-full mx-4 border-2 border-neutral-400 mt-6 p-1 mb-5">
        <TouchableOpacity
          className="p-1 rounded-full ml-1"
          style={styles.bg}
          onPress={() => navigation.goBack()}
        >
          <ArrowLongLeftIcon size={20} color={"white"} />
        </TouchableOpacity>
        <TextInput
          // value={search}
          onChangeText={handleTextDebounce}
          className="flex-1 ml-4"
          placeholder="Search Movie"
          cursorColor={"lightgray"}
          style={{ color: "#dddddd" }}
          placeholderTextColor={"lightgray"}
        />
        <View className="items-center ml-3">
          <View>
            <TouchableOpacity>
              <MagnifyingGlassCircleIcon size={40} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* results */}
      {isLoading ? (
        <Loading />
      ) : result.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-2"
        >
          <Text className="text-white text-lg font-semibold ml-1">
            Results ({result.length})
          </Text>
          <View
            className="flex-row flex-wrap justify-between"
            style={{ flexDirection: "row", flexWrap: "wrap" }}
          >
            {result.map((item, index) => (
              <MovieCard342 item={item} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <View className="w-72 h-72 rounded-2xl overflow-hidden">
            <Image
              // source={require("../assets/images/movieTime.png")}
              source={{
                uri: "https://media.tenor.com/DDdGPXfDJ9oAAAAC/hello-motherfucker.gif",
              }}
              // className="w-96 h-96"
              className="w-72 h-72"
            />
          </View>
          <Text className="mt-3 text-neutral-200 font-semibold mx-4">
            {/* Everything I learned, I learned from the movies */}
            Hello mf, what chu want?
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
