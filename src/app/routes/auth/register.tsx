import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';

const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const subtitle = (
    <>
      或{' '}
      <a
        href={paths.auth.login.getHref(redirectTo)}
        className="font-medium text-indigo-600 hover:text-indigo-500"
      >
        登录已有账号
      </a>
    </>
  );

  return (
    <AuthLayout title="创建新账号" subtitle={subtitle}>
      <RegisterForm
        onSuccess={() => {
          navigate(paths.auth.login.getHref(redirectTo), {
            replace: true,
          });
        }}
      />
    </AuthLayout>
  );
};

export default RegisterRoute;
