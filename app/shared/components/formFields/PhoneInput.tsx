import React from "react";
import { Controller } from "react-hook-form";
import { PhoneInputField } from "../../ui/input/PhoneInputField";

interface PhoneInputProps {
  form: any;
  name: string;
}

export const PhoneInput = ({ form, name }: PhoneInputProps) => {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { value, ...field }, formState: { errors } }) => {
        return (
          <PhoneInputField
            isValid={true}
            errorText={errors[name]?.message}
            {...field}
          />
        );
      }}
    />
  );
};
