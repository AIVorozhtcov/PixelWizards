import React from 'react';
import Form from '../components/organisms/Form';
import { z } from 'zod';
import Subtitle from '../components/atoms/Subtitle';

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const Registration: React.FC = () => {
  const handleRegister = (data: any) => {
    console.log('hhhhhhhhhhhhhhhh');
    console.log('Register Data:', data);
  };

  return (
    <main className="flex flex-col min-h-dvh bg-[#0c1b2a]">
      <div className="max-w-md mx-auto mt-10">
        <Subtitle as="h2" variant="h2">
          Регистрация
        </Subtitle>
        <Form
          schema={registerSchema}
          onSubmit={handleRegister}
          fields={[
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' },
            {
              name: 'confirmPassword',
              label: 'Confirm Password',
              type: 'password',
            },
          ]}
        />
      </div>
    </main>
  );
};

export default Registration;
