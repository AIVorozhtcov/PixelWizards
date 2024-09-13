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

      if (typeof response === 'object' && 'reason' in response) {
        toast.error(response.reason);
        return;
      } else {
        localStorage.setItem(forumTokenLocalStorageKey, response as string);
        navigate('/forum');
      }
    } catch (error) {
      toast.error('Произошла ошибка');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col">
      <Subtitle className="text-[#ffc107]" as="h2" variant="h2">
        Войти в форум
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
        fields={LOGIN_INPUTS_DATA}
      />
      <Link className="self-center mt-10" to={LINKS.forumRegistration}>
        Зарегистрироваться
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

export default ForumLoginSection;
