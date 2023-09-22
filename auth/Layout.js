import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { UseAuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import { View } from "react-native";

const Layout = () => {
  const { userId, loading } = UseAuthContext();
  if (loading) {
    return <View style={{ flex: 1, backgroundColor: "#171717" }}></View>;
  }
  return (
    <NavigationContainer>
      {userId !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Layout;
