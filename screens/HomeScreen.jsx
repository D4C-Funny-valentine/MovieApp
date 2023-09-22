import {
  View,
  BackHandler,
  Alert,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { UseAuthContext } from "../context/AuthContext";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import styles from "../style/CustomStyle";
import TrendingMovies from "../components/TrendingMovies";
import MovieLists from "../components/MovieLists";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";
import { fetchTrendingMovie } from "../api/moviedb";

const HomeScreen = () => {
  const { logout } = UseAuthContext();
  const ios = Platform.OS === "ios";
  const navigation = useNavigation();
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState({});
  const [topRate, setTopRate] = useState({});

  // for home loading
  const [isLoading, setIsLoading] = useState(false);

  // for refresh
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getTrendingMovie();
    getUpcomingMovie();
    getTopRatedMovie();
  }, []);

  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie({ language: "en-US" });
    if (data && data.results) setTrending(data.results);
    setIsLoading(false);
  };

  const getUpcomingMovie = async () => {
    const data = await fetchTrendingMovie({ language: "en-US", page: "2" });
    if (data && data.results) setUpcoming(data);
    setIsLoading(false);
  };

  const getTopRatedMovie = async () => {
    const data = await fetchTrendingMovie({ language: "en-US", page: "3" });
    if (data && data.results) setTopRate(data);
    setIsLoading(false);
  };
  /// Control the hardware Back button

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold Up!", "Are you sure you want to exist?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: {
  //           color: "red",
  //         },
  //       },
  //       { text: "Exist", onPress: () => BackHandler.exitApp() },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView
        style={{
          marginTop: StatusBar.currentHeight || 0,
          marginBottom: ios ? -8 : 20,
        }}
      >
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color={"#f3f3f3"} />
          <Text className="text-2xl font-bold text-white">
            <Text style={styles.color}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={25} color={"#f3f3f3"} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            color={styles.color}
          />
        }
      >
        {/* Trending movie carousel */}
        {trending.length > 0 && <TrendingMovies data={trending} />}
        {/* Upcoming movie lists */}
        {upcoming?.results?.length > 0 && (
          <MovieLists title="Upcoming" data={upcoming} />
        )}
        {/* Top rate movie  */}
        {topRate?.results?.length > 0 && (
          <MovieLists title="Top Rate" data={topRate} />
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
