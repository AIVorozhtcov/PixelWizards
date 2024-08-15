import Form from './Form';
import Subtitle from '../atoms/Subtitle';
import Link from '../atoms/Link';
import { useNavigate } from 'react-router-dom';
import { RegistrationFormData } from '../../types/types';
import { RegistrationValidationSchema } from '../../types/validationSchemas';
import registrationCapibara from '../../../public/registrationCapibara.webp';
import registrationCapibara2 from '../../../public/registrationCapibara2.webp';
import FORM_INPUT_NAMES from '../../constants/formInputNames';
import { getUserInfo, signup } from '../../api/authApi';
import { useAppDispatch } from '../../lib/hooks';
import { setUserData } from '../../store/slices/user';

const RegistrationSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data: RegistrationFormData) => {
    const response = await signup(data);
    if (!response) return;
    const userData = await getUserInfo();
    if (!userData) return;
    dispatch(setUserData(userData));
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <Subtitle className="text-[#ffc107]" as="h2" variant="h2">
        Регистрация
      </Subtitle>
      <Form<RegistrationFormData>
        zodSchema={RegistrationValidationSchema}
        onSubmit={handleSubmit}
        buttonText="Submit"
        buttonVariant="acentNotTransparent"
        buttonClass="bg-[#ffc107]"
        formFieldClass="mb-4 "
        labelVariant="basic"
        inputVariant="basic"
        fields={[
          { name: FORM_INPUT_NAMES.firstName, label: 'Имя' },
          { name: FORM_INPUT_NAMES.secondName, label: 'Фамилия' },
          { name: FORM_INPUT_NAMES.login, label: 'Логин' },
          {
            name: FORM_INPUT_NAMES.email,
            label: 'Адрес электронной почты',
            type: 'email',
          },
          {
            name: FORM_INPUT_NAMES.password,
            label: 'Пароль',
            type: 'password',
          },
          {
            name: FORM_INPUT_NAMES.passwordAgain,
            label: 'Повторите пароль',
            type: 'password',
          },
          {
            name: FORM_INPUT_NAMES.phone,
            label: 'Телефонный номер',
            type: 'tel',
          },
        ]}
      />
      <Link className="self-center mt-10" to="/login">
        Войти
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

export default RegistrationSection;
