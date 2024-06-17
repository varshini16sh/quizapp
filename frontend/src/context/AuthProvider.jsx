import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [genre, setGenre] = useState('Science');
  const [authenticated, isAuthenticated] = useState(false)
  return (
    <AuthContext.Provider value={{ genre, setGenre, authenticated, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;