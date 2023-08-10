import { createContext, useState } from 'react';

const AuthContext = createContext({
  userData: { token: '' },
  onLogin: enterdUserData => {},
});

export const AuthContextProvider = ({ children }) => {
  const parsedUserData = JSON.parse(localStorage.getItem('userData'));
  const [userData, setUserData] = useState(parsedUserData || {});

  const handleLogin = enterdUserData => {
    localStorage.setItem('userData', enterdUserData);
    setUserData(JSON.parse(enterdUserData));
  };

  return (
    <AuthContext.Provider value={{ userData, onLogin: handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
