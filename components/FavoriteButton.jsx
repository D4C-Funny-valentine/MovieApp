import { StatusBar, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import styles from "../style/CustomStyle";

// isFavorite, setIsFavorite,
const FavoriteButton = ({ isAbsolute }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <SafeAreaView
      className={`flex-row justify-between items-center ${
        isAbsolute && "absolute z-10"
      } w-full px-4`}
      style={{ marginTop: StatusBar.currentHeight || 0 }}
    >
      <TouchableOpacity
        style={[styles.bg]}
        className="p-1 rounded-xl"
        onPress={() => navigation.goBack()}
      >
        <ChevronLeftIcon size={25} strokeWidth={2} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
        <HeartIcon
          size={28}
          strokeWidth={2}
          color={isFavorite ? "#cc0011" : "white"}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FavoriteButton;
