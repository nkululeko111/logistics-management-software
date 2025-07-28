import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'PASSWORD_RECOVERY') {
          navigate('/reset-password');
        } else if (event === 'USER_UPDATED') {
          // Handle user update
        }
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, [navigate]);

  const value = {
    user,
    signUp: async (email, password) => {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return user;
    },
    signIn: async (email, password) => {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return user;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    sendPasswordReset: async (email) => {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) throw error;
      return data;
    },
    updatePassword: async (newPassword) => {
      const { data, error } = await supabase.auth.update({ password: newPassword });
      if (error) throw error;
      return data;
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}