import { useEffect } from 'react';
import { supabase } from 'lib/supabaseClient';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!data) {
        <Navigate to='/login' />;
      }

      if (error) {
        <Navigate to='/login' />;
      }
    }

    getUser();
  }, []);

  return <Outlet />;
};
