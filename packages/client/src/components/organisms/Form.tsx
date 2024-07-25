import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodSchema } from 'zod';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

interface FormProps {
  schema: ZodSchema;
  onSubmit: (data: any) => void;
  defaultValues?: any;
  fields: {
    name: string;
    label: string;
    type?: string;
  }[];
}

const Form: React.FC<FormProps> = ({
  schema,
  onSubmit,
  defaultValues,
  fields,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {fields.map(field => (
          <FormField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            error={errors[field.name]?.message as string}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default Form;
