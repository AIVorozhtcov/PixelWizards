import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import generalAPI from '../../api/fetchTransport/generalApi';
import { LOGIN_INPUTS_DATA } from '../../constants/profilePageData';
import { useAppDispatch } from '../../lib/hooks';
import { setUserData } from '../../store/slices/user';
import { LoginFormData } from '../../types';
import { LoginValidationSchema } from '../../types/validationSchemas';
import Link from '../atoms/Link';
import Subtitle from '../atoms/Subtitle';
import OauthButton from '../molecules/OauthButton';
import Form from './Form';
import Image from '../atoms/Image';
import LINKS from '../../constants/links';

const LoginSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginFormData) => {
    try {
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
    } catch (error) {
      toast.error('Произошла ошибка');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <Subtitle className="text-[#ffc107] mb-10" as="h2" variant="h2">
        Вход
      </Subtitle>
      <Form<LoginFormData>
        zodSchema={LoginValidationSchema}
        onSubmit={handleSubmit}
        buttonText="Войти"
        buttonVariant="acentNotTransparent"
        buttonClass="bg-[#ffc107] w-full text-[#0c1b2a]"
        formFieldClass="mb-4 w-80"
        labelVariant="basic"
        inputVariant="basic"
        fields={LOGIN_INPUTS_DATA}
      />
      <OauthButton className="self-center mt-24 w-80" />
      <Link className="self-center mt-3" to={LINKS.registration}>
        Зарегистрироваться
      </Link>
      <Link className="self-center mt-5" to={LINKS.forum}>
        Форум
      </Link>
      <Image
        src="/registrationCapibara.webp"
        width="225"
        alt="Космическая капибара!"
        className="mx-auto aspect-square overflow-hidden rounded-xl object-cover absolute top-0 right-0 opacity-50"
      />
      <Image
        src="/registrationCapibara2.webp"
        width="225"
        alt="Космическая капибара!"
        className="absolute top-10 left-0 opacity-50"
      />
    </div>
  );
};

export default LoginSection;
