import React, { createContext, useContext } from 'react';
import { View, Text } from 'react-native';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider
            value={{
                user: 'Sonny',
            }}
        >
            {children}
        </AuthContext.Provider >
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}


