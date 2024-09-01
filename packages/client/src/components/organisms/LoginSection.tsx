import { useNavigate } from 'react-router-dom';
import registrationCapibara from '../../../public/registrationCapibara.webp';
import registrationCapibara2 from '../../../public/registrationCapibara2.webp';
import generalAPI from '../../api/fetchTransport/generalApi';
import FORM_INPUT_NAMES from '../../constants/formInputNames';
import { useAppDispatch } from '../../lib/hooks';
import { setUserData } from '../../store/slices/user';
import { LoginFormData } from '../../types/types';
import { LoginValidationSchema } from '../../types/validationSchemas';
import Link from '../atoms/Link';
import Subtitle from '../atoms/Subtitle';
import OauthButton from '../molecules/OauthButton';
import Form from './Form';
import { toast } from 'sonner';

const LoginSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginFormData) => {
    const response = await generalAPI.signin(data);

    if (typeof response === 'object' && 'reason' in response) {
      toast.error(response.reason);
      return;
    }

    const userData = await generalAPI.userInfo();

    if ('reason' in userData) {
      toast.error(userData.reason);
      return;
    }

    dispatch(setUserData(userData));
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <Subtitle className="text-[#ffc107]" as="h2" variant="h2">
        Войти
      </Subtitle>
      <Form<LoginFormData>
        zodSchema={LoginValidationSchema}
        onSubmit={handleSubmit}
        buttonText="Submit"
        buttonVariant="acentNotTransparent"
        buttonClass="bg-[#ffc107]"
        formFieldClass="mb-4 w-80"
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
      <OauthButton className="self-center mt-24 w-80" />
      <Link className="self-center mt-3" to="/registration">
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
