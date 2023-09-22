import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { UseAuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { EyeSlashIcon, EyeIcon } from "react-native-heroicons/outline";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = UseAuthContext();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-neutral-800"
    >
      <View
        className="gap-4 mb-4 justify-center items-center w-72"
        style={{ width: 288 }}
      >
        <View style={{ width: "100%" }} className="">
          <Text className="text-xl font-semibold text-white pb-4 text-left">
            Sign Up
          </Text>
        </View>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          className=" p-3  border border-gray-500/50 rounded-lg h-12"
          placeholder="Email"
          placeholderTextColor={"#bbbbbb"}
          cursorColor={"#cc0011"}
          style={{ color: "#ffffff", width: "100%", position: "relative" }}
        />
        <View className="" style={{ marginBottom: 12, width: "100%" }}>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
            className=" p-3  border border-gray-500/50 rounded-lg h-12 mb-1.5 pr-10"
            placeholder="Password"
            placeholderTextColor={"#bbbbbb"}
            cursorColor={"#cc0011"}
            style={{ color: "#ffffff" }}
          />
          <TouchableOpacity
            style={{ position: "absolute", top: 15, right: 14 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon size={18} color={"white"} />
            ) : (
              <EyeSlashIcon size={18} color={"white"} />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 7,
            width: "100%",
            marginBottom: 12,
          }}
        >
          <Text className="text-gray-200">Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="text-[#cc0011] font-semibold">Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            height: 45,
            width: "100%",
            backgroundColor: "#cc0011",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Text className="text-white font-semibold">Sing Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
