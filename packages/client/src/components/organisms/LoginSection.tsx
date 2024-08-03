import React from 'react';
import registrationCapibara from '../../../public/registrationCapibara.webp';
import registrationCapibara2 from '../../../public/registrationCapibara2.webp';
import FORM_INPUT_NAMES from '../../constants/formInputNames';
import { LoginFormData } from '../../types/types';
import { LoginValidationSchema } from '../../types/validationSchemas';
import Link from '../atoms/Link';
import Subtitle from '../atoms/Subtitle';
import Form from './Form';

const LoginSection: React.FC = () => {
  const handleLogin = (data: LoginFormData) => {
    console.log('Login Data:', data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <Subtitle className="text-[#ffc107]" as="h2" variant="h2">
        Войти
      </Subtitle>
      <Form<LoginFormData>
        zodSchema={LoginValidationSchema}
        onSubmit={handleLogin}
        buttonText="Submit"
        buttonVariant="acentNotTransparent"
        buttonClass="bg-[#ffc107]"
        formFieldClass="mb-4 "
        labelVariant="basic"
        inputVariant="basic"
        fields={[
          { name: FORM_INPUT_NAMES.login, label: 'Логин' },
          {
            name: FORM_INPUT_NAMES.password,
            label: 'Пароль',
            type: 'password',
          },
        ]}
      />
      <Link className="self-center mt-10" to="/registration">
        Зарегистрироваться
      </Link>
      <img
        src={registrationCapibara}
        width="225"
        alt="Космическая капибара!"
        className="mx-auto aspect-square overflow-hidden rounded-xl object-cover absolute top-0 right-0 opacity-50"
      />
      <img
        src={registrationCapibara2}
        width="225"
        alt="Космическая капибара!"
        className="absolute top-10 left-0 opacity-50"
      />
    </div>
  );
};

export default LoginSection;
