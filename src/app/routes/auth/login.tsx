import { Navigate, useNavigate, useSearchParams } from 'react-router';

import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  if (localStorage.getItem('accessToken')) {
    return (
      <Navigate
        to={redirectTo ? `${redirectTo}` : paths.app.dashboard.getHref()}
        replace
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">登录</h2>
          <p className="mt-2 text-sm text-gray-600">
            或{' '}
            <a
              href={paths.auth.register.getHref(redirectTo)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              注册新账号
            </a>
          </p>
        </div>
        <div className="rounded-md bg-white p-8 shadow-lg transition-all hover:shadow-xl">
          <LoginForm
            onSuccess={() => {
              navigate(
                `${redirectTo ? `${redirectTo}` : paths.app.dashboard.getHref()}`,
                {
                  replace: true,
                },
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginRoute;
