import { useNavigate } from 'react-router-dom';
import { FORUM_REGISTRATION_INPUTS_DATA } from '../../constants/profilePageData';
import { RegistrationFormData } from '../../types';
import { ForumRegistrationValidationSchema } from '../../types/validationSchemas';
import Image from '../atoms/Image';
import Link from '../atoms/Link';
import Subtitle from '../atoms/Subtitle';
import Form from './Form';
import { toast } from 'sonner';
import forumApi from '../../api/fetchTransport/forumApi';
import { forumTokenLocalStorageKey } from '../../constants/forumConsts';

const RegistrationSection = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: RegistrationFormData) => {
    try {
      const response = await forumApi.register(data);

      if ('reason' in response || 'error' in response) {
        throw new Error(response?.reason ?? response.error);
      }

      const responseLogin = await forumApi.login(data);

      if (
        typeof responseLogin === 'object' &&
        ('reason' in responseLogin || 'error' in responseLogin)
      ) {
        throw new Error(
          response?.reason ?? response.error + '. Ошибка при логине'
        );
      } else {
        localStorage.setItem(forumTokenLocalStorageKey, responseLogin.token);
        navigate('/forum');
      }
    } catch (error) {
      console.dir({ error });
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Неизвестная ошибка');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <Subtitle className="text-[#ffc107]" as="h2" variant="h2">
        Регистрация
      </Subtitle>
      <Form<RegistrationFormData>
        zodSchema={ForumRegistrationValidationSchema}
        onSubmit={handleSubmit}
        buttonText="Submit"
        buttonVariant="acentNotTransparent"
        buttonClass="bg-[#ffc107]"
        formFieldClass="mb-4 w-80"
        labelVariant="basic"
        inputVariant="basic"
        fields={FORUM_REGISTRATION_INPUTS_DATA}
      />
      <Link className="self-center mt-10" to="/login">
        Войти
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

export default RegistrationSection;
