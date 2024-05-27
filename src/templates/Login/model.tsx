'use client';

import { useContext } from 'react';
import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

// Schemas
export const FormSchema = z.object({
  email: z.string().email('O tipo deve ser email'),
  password: z.string().min(4, { message: 'A senha deve ter no mínimo 4 caracteres' }),
  incorretLogin: z.custom(),
});

// Types
type FormData = z.infer<typeof FormSchema>;

export default function useLoginModel() {
  const { handleLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const user = handleLogin(data.email, data.password);

    if (!user.isSigned) {
      setError('incorretLogin', {
        type: 'custom',
        message: 'Email ou senha incorretos.',
      });
      return;
    }

    return router.replace('/list-users');
  };

  return { register, handleSubmit, onSubmit, errors };
}
