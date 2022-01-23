import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({});

const config = {
  iosClientId:
    "86681265127-pb2be5p2ps0lghkf260kf4lnv68e5kiu.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "location"],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  // if logged in will take teh user to home page
  const [loadingIntial, setLoadingIntial] = useState(true);
  const [loading, setLoading] = useState(false);

  // keep tracking of the user state wheather user logged in or logged out
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // logged in
        setUser(user);
      } else {
        setUser(null);
      }

      setLoadingIntial(false);
    });
  }, []);

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  // Google login auth
  // adding user to firebase
  const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
        }
        return promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  // cashing the values to give it whicmkes it quicker without the need to e render again
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingIntial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
