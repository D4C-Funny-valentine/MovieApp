import { StatusBar } from "expo-status-bar";
import Layout from "./auth/Layout";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  // color red #cc0011
  return (
    <AuthProvider>
      <StatusBar style="light" backgroundColor="#171717" />
      <Layout />
    </AuthProvider>
  );
}
