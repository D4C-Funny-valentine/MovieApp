import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { fallbackPersonImage, image185 } from "../api/moviedb";

const Cast = ({ cast, navigation }) => {
  return (
    <View className="my-6">
      <Text className="text-white mx-4 mb-5 text-lg">Top Cast</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => (
            <TouchableOpacity
              key={index}
              className="mr-5 items-center"
              onPress={() => navigation.navigate("Person", person)}
            >
              <Image
                // source={require("../assets/images/actor.jpg")}
                source={{
                  uri: image185(person.profile_path) || fallbackPersonImage,
                }}
                className="mb-1 rounded-full w-20 h-20"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80 * 2,
                }}
              />
              {/* person name */}
              <Text className="text-neutral-300 text-xs ml-1">
                {person.name.length > 10
                  ? person.name.slice(0, 10) + "..."
                  : person.name}
              </Text>
              {/* character name */}
              <Text className="text-neutral-300 text-xs ml-1">
                {person.character.length > 10
                  ? person.character.slice(0, 10) + "..."
                  : person.character}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Cast;
