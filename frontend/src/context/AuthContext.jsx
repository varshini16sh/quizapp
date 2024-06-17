import React, { createContext } from "react";

const AuthContext = createContext({
  authenticated : false,
  isAuthenticated : () => {},
  genre: 'Science',
  setGenre: () => {}
});

export default AuthContext;