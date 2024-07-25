import React from 'react';
import Form from './Form';
import { z } from 'zod';
import Subtitle from '../atoms/Subtitle';
import { RegistrationFormData } from '../../types/types';
import { RegistrationValidationSchema } from '../../types/validationSchemas';

const RegistrationSection: React.FC = () => {
  const handleRegister = (data: any) => {
    console.log('Register Data:', data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Subtitle className="text-[#ffc107]" as="h2" variant="h2">
        Регистрация
      </Subtitle>
      <Form<RegistrationFormData>
        zodSchema={RegistrationValidationSchema}
        onSubmit={handleRegister}
        buttonVariant="acentNotTransparent"
        buttonClass="bg-[#ffc107]"
        labelClass="block text-sm font-medium text-[#ffc107]"
        inputVariant="basic"
        fields={[
          { name: 'first_name', label: 'Имя' },
          { name: 'second_name', label: 'Фамилия' },
          { name: 'login', label: 'Логин' },
          { name: 'email', label: 'Адрес электронной почты', type: 'email' },
          { name: 'password', label: 'Пароль', type: 'password' },
          {
            name: 'confirmPassword',
            label: 'Повторите пароль',
            type: 'password',
          },
          { name: 'phone', label: 'Телефонный номер', type: 'tel' },
        ]}
      />
    </div>
  );
};

export default RegistrationSection;
