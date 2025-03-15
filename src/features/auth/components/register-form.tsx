import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegister, userCredentialsSchema } from '@/lib/auth';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const register = useRegister({
    onSuccess,
  });

  const form = useForm<z.infer<typeof userCredentialsSchema>>({
    resolver: zodResolver(userCredentialsSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => register.mutate(data))}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>账号名</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">注册</Button>
        </form>
      </Form>
    </div>
  );
};
