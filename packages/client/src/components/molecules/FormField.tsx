import Input from '../atoms/Input';
import { useFormContext } from 'react-hook-form';
import Label from '../atoms/Label';
import { FormFieldProps } from '../../types';

const FormField = ({
  label,
  error,
  name,
  formFieldClass,
  labelClass,
  labelVariant,
  inputVariant,
  inputAcept,
  ...props
}: FormFieldProps) => {
  const { register, trigger } = useFormContext();
  return (
    <div className={formFieldClass}>
      <Label className={labelClass} variant={labelVariant}>
        {label}
        <Input
          variant={inputVariant}
          accept={inputAcept}
          {...props}
          {...register(name, {
            onBlur: () => trigger(name),
          })}
        />
      </Label>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
