import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from './Config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [allocationID, setAllocationID] = useState(null);

  const setAllocation = (id) => {
    setAllocationID(id);
  };

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/account/MobileLogin`, {
        username,
        password
      });
      const userInfo = res.data;
      console.log('Login response:', userInfo); // Add this line

      // Add username to userInfo object
      userInfo.username = username;

      setUserInfo(userInfo);
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      if (userInfo.success) {
        setIsLoggedInUser(true);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setUserInfo(null);
    setIsLoggedInUser(false);
    await AsyncStorage.removeItem('userInfo');
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
      console.log('Retrieved userInfo from storage:', userInfo); // Add this line
      if (userInfo) {
        setUserInfo(userInfo);
        setIsLoggedInUser(true);
      } else {
        setIsLoggedInUser(false);
      }
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, signOut, isLoggedIn, isLoggedInUser, isLoading, userInfo, allocationID, setAllocation }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
