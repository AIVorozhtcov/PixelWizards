import { useNavigate } from 'react-router-dom';
import generalAPI from '../../api/fetchTransport/generalApi';
import { REGISTRATION_INPUTS_DATA } from '../../constants/profilePageData';
import { useAppDispatch } from '../../lib/hooks';
import { setUserData } from '../../store/slices/user';
import { RegistrationFormData } from '../../types';
import { RegistrationValidationSchema } from '../../types/validationSchemas';
import Image from '../atoms/Image';
import Link from '../atoms/Link';
import Subtitle from '../atoms/Subtitle';
import Form from './Form';
import { toast } from 'sonner';

const RegistrationSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data: RegistrationFormData) => {
    const response = await generalAPI.signup(data);

    if ('reason' in response) {
      toast.error('Не удалось обновить аватар. Попробуйте еще раз.');
      return;
    }

    const userData = await generalAPI.userInfo();

    if ('reason' in userData) {
      toast.error('Не удалось обновить аватар. Попробуйте еще раз.');
      return;
    }

    dispatch(setUserData(userData));
    navigate('/');
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
        formFieldClass="mb-4 w-80"
        labelVariant="basic"
        inputVariant="basic"
        fields={REGISTRATION_INPUTS_DATA}
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
