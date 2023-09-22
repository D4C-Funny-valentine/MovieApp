import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { UseAuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { EyeSlashIcon, EyeIcon } from "react-native-heroicons/outline";

const LoginScreen = () => {
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
            Login
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
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-[#d0d0d0] text-right">Forget Password?</Text>
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
          onPress={() => login(email, password)}
        >
          <Text className="text-white font-semibold">Login</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-white mb-4">Or</Text>
      <View style={{ flexDirection: "row", gap: 7 }}>
        <Text className="text-gray-200">Do you have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-[#cc0011] font-semibold">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
