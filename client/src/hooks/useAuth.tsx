import React, { useCallback, useContext, useMemo, useState } from 'react';
import Server, { User } from '../utils/Server';


interface AuthContextInterface {
  user: User | null,
  signin: (login: string, password: string) => Promise<User|null>,
  signout: () => void,
  updateData: (data: any) => void,
}

const AuthContext = React.createContext<AuthContextInterface>({
  user: null,
  signin: () => Promise.resolve(null),
  signout: () => { },
  updateData: () => { },
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signin = useCallback((login: string, password: string) => {
    return Server.User.authenticate(login, password).then((response) => {
      localStorage.setItem('user', response.login);
      localStorage.setItem('token', response.connexionToken);
      setUser(response);
      return response;
    });
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const updateData = useCallback((data) => {
    setUser(data);
  }, []);

  const methods = useMemo(() => ({
    user,
    signin,
    signout,
    updateData
  }), [signin, signout, updateData, user]);

  return (
    <AuthContext.Provider value={methods}>
      {children}
    </AuthContext.Provider>
  );
};
