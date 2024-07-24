import Input from '../atoms/Input';
import Label from '../atoms/Label';
import { ProfileDataType } from '../../types/types';
import { useFormContext } from 'react-hook-form';
import { FC } from 'react';

type ProfileFormItemProps = {
  data: string;
} & ProfileDataType;

const ProfileFormItem: FC<ProfileFormItemProps> = ({
  title,
  name,
  type,
  data,
}) => {
  const { register } = useFormContext();

  return (
    <Label className="flex flex-row justify-between wr gap-5 border-b pt-1 pb-1 whitespace-nowrap">
      {title}
      <Input
        className="w-full text-end pl-2 pr-2 hover:bg-gray-200"
        type={type}
        placeholder={data}
        {...register(name)}
      />
    </Label>
  );
};

export default ProfileFormItem;
