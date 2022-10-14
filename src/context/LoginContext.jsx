import { useState, createContext } from "react";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  // User State - Contains data if a user are signed in
  // --------------------------------------------------------
  const [user, setUser] = useState();

  // Login function (Matching username and password)
  // --------------------------------------------------------
  let signIn = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setUser(username); // = Logget in
    } else {
      setUser(null); // = Logget out
    }
  };

  // Logout function
  // --------------------------------------------------------
  let signOut = () => {
    setUser(null);
  };

  return (
    <LoginContext.Provider value={{ user, signIn, signOut }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
