import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spinner } from "reactstrap";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL
        });
        setIsLoading(false);
        // history.push("/");
        return;
      }

      // reset user info
      setUser({});
      setIsLoading(false);
      history.push("/");
    });

    // clean function
    return () => {
      unsubscibed();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? (
        <Spinner style={{ position: "fixed", margin: "auto" }} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
