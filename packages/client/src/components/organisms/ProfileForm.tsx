import ProfileFormItem from '../molecules/ProfileFormItem';
import { FormType, ProfileDataType, ProfileModeType } from '../../types/types';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../atoms/Button';
import { updateUserData } from '../../api/userApi';

type ProfileFormProps = {
  profileFormData: ProfileDataType[];
  mode: ProfileModeType;
} & React.FormHTMLAttributes<HTMLFormElement>;

const ProfileForm = ({ profileFormData, mode }: ProfileFormProps) => {
  const formMethods = useForm<FormType>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormType> = data => updateUserData(data, mode);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        {profileFormData.map((item, idx) => (
          <ProfileFormItem
            title={item.title}
            type={item.type}
            data="Данные пользователя"
            name={item.name}
            key={idx}
          />
        ))}

        <Button
          className="block w-full hover:cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-md p-1 mt-10"
          type="submit">
          Сохранить
        </Button>
      </form>
    </FormProvider>
  );
};

export default ProfileForm;
