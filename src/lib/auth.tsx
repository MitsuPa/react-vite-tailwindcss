import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

import { Spinner } from '@/components/ui/spinner';
import { paths } from '@/config/paths';
import client from '@/lib/api-client';

const getUser = async () => {
  const response = await client.GET('/api/user/me');

  return response.data;
};

const logout = async () => {
  localStorage.removeItem('accessToken');
  return Promise.resolve();
};

export const userCredentialsSchema = z.object({
  name: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
});

export type UserCredentialInput = z.infer<typeof userCredentialsSchema>;
const login = (data: UserCredentialInput) => {
  return client.POST('/api/auth/login', {
    body: data,
  });
};

const register = (data: UserCredentialInput) => {
  return client.POST('/api/auth/register', {
    body: data,
  });
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: UserCredentialInput) => {
    const response = await login(data);
    if (response.data?.token) {
      localStorage.setItem('accessToken', response.data.token);
    }
    return await getUser();
  },
  registerFn: async (data: UserCredentialInput) => {
    const response = await register(data);
    return response.data;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();
  if (user.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!user.data) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
