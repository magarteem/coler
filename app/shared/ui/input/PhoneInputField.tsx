import cn from "classnames";
import styles from "./phoneInputField.module.scss";
import { InputMask } from "@react-input/mask";
import { useEffect, useState } from "react";
import { LoaderIcon } from "@/public/images";

type Props = {
  titleText?: string;
  containerClassName?: string;
  errorText?: string;
  value: string;
  children?: React.ReactNode;
};

export const PhoneInputField = ({
  titleText,
  children,
  errorText,
  value,
  containerClassName,
  ...props
}: Props) => {
  const [setLoad, setOnLoad] = useState(true);

  useEffect(() => {
    setOnLoad(false);
  }, []);

  return (
    <div
      className={cn(styles.container, containerClassName, {
        [styles.errorText]: !!errorText,
      })}
    >
      {setLoad ? (
        <div className={styles.loader}>
          <LoaderIcon height={40} width={40} />
        </div>
      ) : (
        <InputMask
          mask="+380 (__) ___ __ __"
          replacement={{ _: /\d/ }}
          className={styles.inputClass}
          placeholder="+380 (00) 000 00 00"
          value={value}
          {...props}
        />
      )}

      {children}
      {!!errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  );
};
