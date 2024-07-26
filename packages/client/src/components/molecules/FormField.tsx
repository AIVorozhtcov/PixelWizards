import React from 'react';
import Input from '../atoms/Input';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  name: string;
  labelClass?: string;
  inputVariant?: 'default' | 'basic';
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  name,
  labelClass,
  inputVariant,
  ...props
}) => {
  const { register, trigger } = useFormContext();
  return (
    <div className="mb-4">
      <label className={labelClass}>{label}</label>
      <Input
        variant={inputVariant}
        {...props}
        {...register(name, {
          onBlur: () => trigger(name),
        })}></Input>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
