import React from "react";
import { Controller, FieldError } from "react-hook-form";
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
            errorText={(errors[name] as FieldError)?.message}
            value={value}
            {...field}
          />
        );
      }}
    />
  );
};
