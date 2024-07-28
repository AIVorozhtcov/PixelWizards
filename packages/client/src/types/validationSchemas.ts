import { z, ZodType } from 'zod';
import { RegistrationFormData } from './types';

const nameRegex = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё-]*$/;
const loginRegex = /^(?=.*[A-Za-z])[-\w]{3,20}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@!#$%^&*()_+[\]{}<>?]{8,40}$/;
const phoneRegex = /^\+?\d{10,15}$/;

export const RegistrationValidationSchema: ZodType<RegistrationFormData> = z
  .object({
    first_name: z
      .string()
      .min(1, 'Необходимо ввести имя')
      .regex(nameRegex, 'Имя не соответствует требованиям'),
    second_name: z
      .string()
      .min(1, 'Необходимо ввести фамилию')
      .regex(nameRegex, 'Фамилия не соответствует требованиям'),
    login: z
      .string()
      .min(3, 'Логин не может быть короче 3 символов')
      .max(20, 'Логин не может быть длиннее 20 символов')
      .regex(loginRegex, 'Логин не соответствует требованиям'),
    email: z.string().email('Адрес почты не соответствует требованиям'),
    password: z
      .string()
      .min(8, 'Пароль не может быть короче 8 символов')
      .max(40, 'Пароль не может быть длиннее 40 символов')
      .regex(
        passwordRegex,
        'Пароль должен содержать хотя бы одну заглавную букву и одну цифру'
      ),
    passwordAgain: z
      .string()
      .min(8, 'Пароль не может быть короче 8 символов')
      .max(40, 'Пароль не может быть длиннее 40 символов'),
    phone: z
      .string()
      .regex(phoneRegex, 'Номер телефона не соответствует требованиям'),
  })
  .refine(data => data.password === data.passwordAgain, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });
