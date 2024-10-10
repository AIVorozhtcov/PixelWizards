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
import Button, { ButtonVariants } from '../atoms/Button';
import { FormFields } from '../../types';
import { VariantProps } from 'class-variance-authority';

interface Field {
  name: string;
  label: string;
  type?: string;
  className?: string;
}

interface FormProps<T extends FieldValues>
  extends Omit<FormFields, 'label' | 'error' | 'name'> {
  zodSchema: ZodSchema;
  onSubmit: SubmitHandler<T>;
  buttonText: string;
  defaultValues?: DefaultValues<T>;
  buttonVariant?: VariantProps<ButtonVariants>['variant'];
  buttonClass?: string;
  fields: Field[];
  formClass?: string;
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
  inputAcept,
  formClass,
}: FormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        className={formClass}>
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
            inputAcept={inputAcept}
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
