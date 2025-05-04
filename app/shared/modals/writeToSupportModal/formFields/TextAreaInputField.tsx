import { TextArea } from "@/app/shared/ui/textArea/TextArea";
import { Controller, FieldError } from "react-hook-form";

interface PhoneInputProps {
  form: any;
  name: string;
  titleText: string;
  placeholder?: string;
}

export const TextAreaInputField = ({
  form,
  name,
  placeholder,
  titleText,
}: PhoneInputProps) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, formState: { errors } }) => {
        return (
          <TextArea
            titleText={titleText}
            placeholder={placeholder}
            errorText={(errors[name] as FieldError)?.message}
            {...field}
          />
        );
      }}
    />
  );
};
