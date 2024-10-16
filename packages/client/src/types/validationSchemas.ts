import { z } from 'zod';

const nameRegex = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё-]*$/;
const loginRegex = /^(?=.*[A-Za-z])[-\w]{3,20}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@!#$%^&*()_+[\]{}<>?]{8,40}$/;
const phoneRegex = /^\+?\d{10,15}$/;
const acceptedImageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ForumRegistrationValidationSchema = z
  .object({
    login: z
      .string()
      .min(3, 'Логин не может быть короче 3 символов')
      .max(20, 'Логин не может быть длиннее 20 символов')
      .regex(loginRegex, 'Логин не соответствует требованиям'),
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
  })
  .refine(data => data.password === data.passwordAgain, {
    message: 'Пароли не совпадают',
    path: ['passwordAgain'],
  });

export const RegistrationValidationSchema = z
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
    path: ['passwordAgain'],
  });

export const LoginValidationSchema = z.object({
  login: z
    .string()
    .min(3, 'Логин не может быть короче 3 символов')
    .max(20, 'Логин не может быть длиннее 20 символов')
    .regex(loginRegex, 'Логин не соответствует требованиям'),
  password: z
    .string()
    .min(8, 'Пароль не может быть короче 8 символов')
    .max(40, 'Пароль не может быть длиннее 40 символов'),
});

export const ProfileUpdateDataSchema = z.object({
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
    .max(20, 'Логин не может быть длиннее 20 символов'),
  //.regex(loginRegex, 'Логин не соответствует требованиям'),
  //Убрал требование по regex-у, так как в яндексовских учетках его нет и после логина через Oauth приходят юзеры, фейлящиеся на ней
  email: z.string().email('Адрес почты не соответствует требованиям'),
  display_name: z
    .string()
    .min(3, 'Никнейм не может быть короче 3 символов')
    .max(20, 'Никнейм не может быть длиннее 20 символов')
    .nullable(),
  phone: z
    .string()
    .regex(phoneRegex, 'Номер телефона не соответствует требованиям')
    .nullable(),
});

export const ProfileUpdatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, 'Пароль не может быть короче 8 символов')
      .max(40, 'Пароль не может быть длиннее 40 символов')
      .regex(
        passwordRegex,
        'Пароль должен содержать хотя бы одну заглавную букву и одну цифру'
      ),
    newPassword: z
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
  })
  .refine(data => data.newPassword === data.passwordAgain, {
    message: 'Пароли не совпадают',
    path: ['passwordAgain'],
  });

export const ProfileUpdateAvatarSchema = z.object({
  avatar: z
    .custom<FileList>()
    .refine(
      avatar => acceptedImageTypes.includes(avatar[0]?.type),
      'Разрешены форматы изображения: .jpg, .jpeg, .png и .webp'
    )
    .refine(
      avatar => avatar[0]?.size < 2 * 1024 * 1024,
      'Размер файла должен быть меньше 2MB'
    ),
});

export const ErrorSchema = z.object({
  reason: z.string(),
});

export const SignUpSchema = z.object({
  id: z.number(),
});

export const TopicSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  userId: z.number(),
  updatedAt: z.string(),
});

export type TopicArray = z.infer<typeof TopicSchema>;

export const TopicsSchema = z.array(TopicSchema);

export const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  userId: z.number(),
  topicId: z.number(),
  reaction: z.string().optional().or(z.null()),
});

export const CommentsSchema = z.array(CommentSchema);

export const ReplySchema = z.object({
  id: z.number(),
  content: z.string(),
  userId: z.number(),
  commentId: z.number(),
  parentId: z.number(),
});

export const RepliesSchema = z.array(ReplySchema);

export const MessageSchema = z.object({
  message: z.string(),
});

export const AvatarSchema = z.object({
  avatar: z.string().nullable(),
});

export const SignInSchema = z.object({
  login: z.string(),
  password: z.string(),
});

export const ServiceIdSchema = z.object({
  service_id: z.string(),
});

export const AvatarIdSchema = SignUpSchema.merge(AvatarSchema);

export const UserInfoSchema = ProfileUpdateDataSchema.merge(AvatarIdSchema);

export const ForumCreateTopicSchema = z.object({
  title: z
    .string()
    .min(3, 'Заголовок не может быть короче 3 символов')
    .max(20, 'Заголовок не может быть длиннее 20 символов'),
  content: z
    .string()
    .min(8, 'Контент не может быть короче 5 символов')
    .max(40, 'Контент не может быть длиннее 400 символов'),
});

export const ForumCreateCommentSchema = z.object({
  content: z.string().min(1, 'Заголовок не может быть короче 3 символов'),
});
