import Input from '../atoms/Input';
import Label from '../atoms/Label';
import { ProfileDataType } from '../../types/types';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { FC, forwardRef, useState } from 'react';

type ProfileFormItemProps = {
  data: string;
  register: UseFormRegister<FieldValues>;
} & ProfileDataType;

const ProfileFormItem: FC<ProfileFormItemProps> = ({
  title,
  name,
  type,
  data,
  register,
}) => {
  const [inputValue, setInputValue] = useState(data);

  return (
    <Label className="flex flex-row justify-between wr gap-5 border-b pt-1 pb-1 whitespace-nowrap">
      {title}
      <Input
        className="w-full text-end pl-2 pr-2 hover:bg-gray-200"
        type={type}
        value={inputValue}
        placeholder={data}
        //name={name}
        {...register(name, { required: 'This field is required' })}
        onChange={e => setInputValue(e.currentTarget.value)}
      />
    </Label>
  );
};

export default ProfileFormItem;
