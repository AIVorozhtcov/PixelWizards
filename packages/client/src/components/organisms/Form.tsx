import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodSchema } from 'zod';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

interface FormProps<T extends FieldValues> {
  zodSchema: ZodSchema;
  onSubmit: SubmitHandler<T>;
  defaultValues?: any;
  buttonVariant?: 'acent' | 'default' | 'acentNotTransparent';
  buttonClass?: string;
  labelClass?: string;
  inputVariant?: 'default' | 'basic';
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
  buttonVariant,
  buttonClass,
  labelClass,
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
            labelClass={labelClass}
            inputVariant={inputVariant}
          />
        ))}
        <Button variant={buttonVariant} className={buttonClass} type="submit">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default Form;
