import { MouseEventHandler, useRef } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Span from '../atoms/Span';
import { useForm, SubmitHandler } from 'react-hook-form';
import { updateUserAvatar } from '../../api/userApi';
import { FormAvatarType } from '../../types/types';

type PopupType = {
  popupTitle: string;
  buttonText: string;
  inputType: string;
  inputName: string;
  inputAccept: string;
};

type PopupProps = {
  popup: PopupType;
  handleClick: MouseEventHandler<HTMLDivElement>;
};

const Popup = ({ handleClick, popup }: PopupProps) => {
  const { register, handleSubmit } = useForm<FormAvatarType>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormAvatarType> = data =>
    updateUserAvatar(data);

  return (
    <div className="absolute top-0 left-0 z-[100] w-full h-full bg-black bg-opacity-50">
      <div
        className="
        absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
        max-w-96 flex flex-col items-stretch text-center bg-white
        rounded-lg pt-10 pb-6 pl-3 pr-3
      ">
        <Span
          className="
          relative block hover:cursor-pointer
          before:content-[''] before:absolute before:left-0 before:-top-5 before:bg-gray-400 
          before:rounded-sm before:rotate-45 before:w-6 before:h-1 before:hover:bg-gray-300
          after:content-[''] after:absolute after:left-0 after:-top-5 after:bg-gray-400 
          after:rounded-sm after:-rotate-45 after:w-6 after:h-1 after:hover:bg-gray-300
        "
          onClick={handleClick}
        />
        <h1 className="mb-8">{popup.popupTitle}</h1>
        <form className="flex flex-col gap-9" onSubmit={handleSubmit(onSubmit)}>
          <Input type={popup.inputType} {...register('avatar')} />
          <Button
            className="block w-full hover:cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-md p-1"
            type="submit">
            {popup.buttonText}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
