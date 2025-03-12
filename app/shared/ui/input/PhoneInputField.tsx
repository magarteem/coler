"use client";

import { ReactNode, useState } from "react";
import cn from "classnames";
import { ErrorIcon } from "@/public/images";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./phoneInputField.module.scss";

type Props = {
  titleText?: string;
  containerClassName?: string;
  errorText?: any;
  valueInput?: string;
  children?: React.ReactNode;
} & PhoneInputProps;

export const PhoneInputField = ({
  titleText,
  children,
  errorText,
  containerClassName,
  valueInput,
  ...props
}: Props) => {
  const [showCode, setShowCode] = useState(false);
  //const [valueInput, setValueInput] = useState("");

  return (
    <div
      className={cn(styles.container, containerClassName, {
        [styles.errorText]: !!errorText,
      })}
    >
      <PhoneInput
        country={"ua"} // Устанавливаем Украину по умолчанию
        value={showCode ? `+380` + props.value : ""}
        //onChange={(value) => setValueInput(value)}
        onlyCountries={["ua"]}
        disableDropdown={true}
        disableCountryCode={showCode ? false : true}
        onFocus={() => {
          setShowCode(true);
        }}
        onBlur={() => {
          !valueInput && setShowCode(false);
        }}
        isValid={(e) => {
          console.log("e", e);
          return e;
        }}
        autoFormat
        placeholder="+380 (000) 000 00 00"
        inputClass={styles.inputClass}
        buttonStyle={{ display: "none" }} // Убираем флаг
        {...props}
      />
      {children}
      {!!errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  );
};
