import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LOGIN_INPUTS_DATA } from '../../constants/profilePageData';
import { LoginFormData } from '../../types';
import { LoginValidationSchema } from '../../types/validationSchemas';
import Link from '../atoms/Link';
import Subtitle from '../atoms/Subtitle';
import Form from './Form';
import Image from '../atoms/Image';
import LINKS from '../../constants/links';
import forumApi from '../../api/fetchTransport/forumApi';
import { forumTokenLocalStorageKey } from '../../constants/forumConsts';

const ForumLoginSection = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const response = await forumApi.login(data);

      if (typeof response === 'object' && 'error' in response) {
        toast.error(response.error);
        return;
      } else {
        localStorage.setItem(forumTokenLocalStorageKey, response.token);
        navigate('/forum');
      }
    } catch (error) {
      toast.error('Произошла ошибка');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <Subtitle className="text-[#ffc107] mb-10" as="h2" variant="h2">
        Вход в форум
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
      <Link className="self-center mt-10" to={LINKS.forumRegistration}>
        Нет аккаунта? Кликай и регистрируйся
      </Link>
      <Image
        src="/registrationCapibara2.webp"
        width="225"
        alt="Космическая капибара!"
        className="absolute top-2/4 right-0 opacity-50"
      />
      <Image
        src="/registrationCapibara.webp"
        width="225"
        alt="Космическая капибара!"
        className="mx-auto aspect-square overflow-hidden rounded-xl object-cover absolute top-2/4 left-0 opacity-50"
      />
    </div>
  );
};

export default ForumLoginSection;
