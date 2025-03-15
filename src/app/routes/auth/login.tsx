import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const subtitle = (
    <>
      或{' '}
      <a
        href={paths.auth.register.getHref(redirectTo)}
        className="font-medium text-indigo-600 hover:text-indigo-500"
      >
        注册新账号
      </a>
    </>
  );

  return (
    <AuthLayout title="登录" subtitle={subtitle}>
      <LoginForm
        onSuccess={() => {
          navigate(redirectTo ? redirectTo : paths.app.dashboard.getHref(), {
            replace: true,
          });
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
