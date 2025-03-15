import { Navigate, useNavigate, useSearchParams } from 'react-router';

import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';

const RegisterRoute = () => {
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            创建新账号
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            或{' '}
            <a
              href={paths.auth.login.getHref(redirectTo)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              登录已有账号
            </a>
          </p>
        </div>
        <div className="rounded-md bg-white p-8 shadow-lg transition-all hover:shadow-xl">
          <RegisterForm
            onSuccess={() => {
              navigate(paths.auth.login.getHref(redirectTo), {
                replace: true,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterRoute;
