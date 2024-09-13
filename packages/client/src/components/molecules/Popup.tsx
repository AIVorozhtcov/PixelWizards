import { MouseEventHandler } from 'react';
import Span from '../atoms/Span';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import Subtitle from '../atoms/Subtitle';
import Form from '../organisms/Form';
import { ZodSchema } from 'zod';

type PopupProps<T> = {
  popupTitle: string;
  buttonText: string;
  inputType: string;
  inputName: keyof T;
  inputAccept: string;
};

interface Popup<T extends FieldValues> {
  popup: PopupProps<T>;
  zodSchema: ZodSchema;
  onSubmit: SubmitHandler<T>;
  handleClick: MouseEventHandler<HTMLDivElement>;
}

const Popup = <T extends FieldValues>({
  handleClick,
  onSubmit,
  popup,
  zodSchema,
}: Popup<T>) => {
  return (
    <div className="fixed top-0 left-0 z-[40] w-full h-full bg-black bg-opacity-50 overflow-y-hidden">
      <div
        className="
        absolute top-1/3 left-1/2 -translate-y-1/3 -translate-x-1/2
        w-80 flex flex-col items-stretch text-center dark:bg-[#152f48] bg-white
        rounded-lg pt-10 pb-6 pl-3 pr-3 dark:shadow-[0_0_10px_2px] shadow-[0_0_10px_0] shadow-[#0b1016]
      ">
        <Span
          className="
          relative block hover:cursor-pointer
          before:content-[''] before:absolute before:left-0 before:-top-5 dark:before:bg-[#ffc107] before:bg-[#152f48]
          before:rounded-sm before:rotate-45 before:w-6 before:h-1 dark:before:hover:bg-[#ae8305] before:hover:bg-[#446b8f]
          after:content-[''] after:absolute after:left-0 after:-top-5 dark:after:bg-[#ffc107] after:bg-[#152f48]
          after:rounded-sm after:-rotate-45 after:w-6 after:h-1 dark:after:hover:bg-[#ae8305] after:hover:bg-[#446b8f]
        "
          onClick={handleClick}
        />
        <Subtitle as="h2" className="mb-10">
          {popup.popupTitle}
        </Subtitle>
        <Form<T>
          zodSchema={zodSchema}
          onSubmit={onSubmit}
          buttonText={popup.buttonText}
          buttonVariant="yellow"
          buttonClass="w-full mt-10"
          inputVariant="typeFile"
          inputAcept={popup.inputAccept}
          fields={[
            {
              name: popup.inputName as string,
              type: popup.inputType,
              label: '',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Popup;
