import ProfileFormItem from '../molecules/ProfileFormItem';
import { ProfileDataType } from '../../types/types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { PROFILE_MODE } from '../../constants/profilePageData';
import Button from '../atoms/Button';

type ProfileFormProps = {
  profileFormData: ProfileDataType[];
} & React.FormHTMLAttributes<HTMLFormElement>;

const ProfileForm = ({ profileFormData }: ProfileFormProps) => {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data: any) => alert('ddd');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}>
      {profileFormData.map((item, idx) => (
        <ProfileFormItem
          title={item.title}
          name={item.name}
          type={item.type}
          data="Данные пользователя"
          register={register}
          key={idx}
        />
      ))}

      <Button
        className="block w-full hover:cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-md p-1 mt-10"
        type="submit">
        {/* onClick={() => setMode(PROFILE_MODE.base)}> */}
        Сохранить
      </Button>
    </form>
  );
};

export default ProfileForm;
