import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext();

const USER_ID = "userId";

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        setUserId(res.user.uid);
        await AsyncStorage.setItem(USER_ID, res.user.uid);
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message, "from login");
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        setUserId(res.user.uid);
        await AsyncStorage.setItem(USER_ID, res.user.uid);
        setLoading(false);
      }
    } catch (error) {
      console.error(error.message, "from login");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserId(null);
    await AsyncStorage.removeItem(USER_ID);
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const user = await AsyncStorage.getItem(USER_ID);
      if (user !== null) {
        setUserId(user);
      }
      setLoading(false);
    } catch (err) {
      console.log(err.message, "get user");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ login, register, logout, userId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => useContext(AuthContext);
