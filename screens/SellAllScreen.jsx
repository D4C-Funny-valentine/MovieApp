import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MagnifyingGlassCircleIcon,
  ArrowLongLeftIcon,
} from "react-native-heroicons/solid";
import styles from "../style/CustomStyle";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import MovieCard342 from "../components/MovieCard342";
import { fetchUpcomingMovie } from "../api/moviedb";

const SeeAllScreen = () => {
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMovie, setFilterMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUpcomingMovieAll();
  }, [page]);

  const getUpcomingMovieAll = async () => {
    const data = await fetchUpcomingMovie({
      language: "en-US",
      page: `${page}`,
    });
    if (data && data.results) setResult(data.results);
    setIsLoading(false);
  };

  //   const handleTextDebounce = useCallback(debounce(searchHandler, 400), []);

  const prevHandler = useCallback(() => {
    if (page <= 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  }, [page]);

  const nextHandler = useCallback(() => {
    if (page > 11) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
  }, [page]);

  const filterData = result.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

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
          value={search}
          onChangeText={(text) => setSearch(text)}
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
      ) : (
        filterData.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className="space-y-2"
          >
            <Text className="text-white text-lg font-semibold ml-1 mb-3">
              Results ({filterData.length})
            </Text>
            <View
              className="flex-row flex-wrap justify-between"
              style={{ flexDirection: "row", flexWrap: "wrap" }}
            >
              {filterData.map((item) => (
                <MovieCard342 item={item} />
              ))}
            </View>
          </ScrollView>
        )
      )}
      <View className="flex-row justify-between items-center space-x-1 py-4 mx-4 px-2 bg-neutral-900">
        <TouchableOpacity
          className="p-1.5 bg-red-600 rounded-xl"
          onPress={prevHandler}
          disabled={page === 1 && true}
        >
          <Text className="text-white font-semibold">Prev</Text>
        </TouchableOpacity>
        <View className="w-6 h-6 justify-center items-center bg-red-500 rounded-full">
          <Text className="text-white text-xs">{page}</Text>
        </View>
        <TouchableOpacity
          className="p-1.5 bg-red-600 rounded-md"
          onPress={nextHandler}
        >
          <Text className="text-white font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SeeAllScreen;
