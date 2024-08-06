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
    <div className="absolute top-0 left-0 z-[20] w-full h-full bg-black bg-opacity-50">
      <div
        className="
        absolute top-1/3 left-1/2 -translate-y-1/3 -translate-x-1/2
        max-w-96 flex flex-col items-stretch text-center bg-[#152f48]
        rounded-lg pt-10 pb-6 pl-3 pr-3 shadow-[0_0_10px_2px] shadow-[#0b1016]
      ">
        <Span
          className="
          relative block hover:cursor-pointer
          before:content-[''] before:absolute before:left-0 before:-top-5 before:bg-[#ffc107] 
          before:rounded-sm before:rotate-45 before:w-6 before:h-1 before:hover:bg-[#ae8305]
          after:content-[''] after:absolute after:left-0 after:-top-5 after:bg-[#ffc107] 
          after:rounded-sm after:-rotate-45 after:w-6 after:h-1 after:hover:bg-[#ae8305]
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
              name: popup.inputName,
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
