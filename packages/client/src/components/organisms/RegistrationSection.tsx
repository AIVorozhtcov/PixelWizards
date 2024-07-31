import Form from './Form';
import Subtitle from '../atoms/Subtitle';
import { RegistrationFormData } from '../../types/types';
import { RegistrationValidationSchema } from '../../types/validationSchemas';
import registrationCapibara from '../../../public/registrationCapibara.webp';
import registrationCapibara2 from '../../../public/registrationCapibara2.webp';

const RegistrationSection = () => {
  const handleRegister = (data: RegistrationFormData) => {
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

export default RegistrationSection;
