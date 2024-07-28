import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema } from 'zod';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { ProfileModeType } from '../../types/types';

interface FormProps<T extends FieldValues> {
  zodSchema: ZodSchema;
  onSubmit: SubmitHandler<T>;
  buttonText: string;
  defaultValues?: DefaultValues<T>;
  buttonVariant?: 'acent' | 'default' | 'acentNotTransparent' | 'yellow';
  buttonClass?: string;
  labelClass?: string;
  formFieldClass?: string;
  labelVariant?: 'default' | 'basic' | 'profile';
  inputVariant?: 'default' | 'basic' | 'profile';
  profileMode?: ProfileModeType;
  fields: {
    name: keyof T;
    label: string;
    type?: string;
    className?: string;
  }[];
}

const Form = <T extends FieldValues>({
  zodSchema,
  onSubmit,
  defaultValues,
  fields,
  buttonText,
  buttonVariant,
  formFieldClass,
  buttonClass,
  labelClass,
  labelVariant,
  inputVariant,
}: FormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        {fields.map(field => (
          <FormField
            key={String(field.name)}
            name={String(field.name)}
            label={field.label}
            type={field.type}
            error={methods.formState.errors[field.name]?.message as string}
            formFieldClass={formFieldClass}
            labelClass={labelClass}
            labelVariant={labelVariant}
            inputVariant={inputVariant}
          />
        ))}
        <Button variant={buttonVariant} className={buttonClass} type="submit">
          {buttonText}
        </Button>
      </form>
    </FormProvider>
  );
};

export default Form;
