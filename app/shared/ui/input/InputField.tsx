import { ReactNode } from "react";
import styles from "./input.module.scss";
import cn from "classnames";
import { ErrorIcon } from "@/public/images";

type Props = {
  titleText?: string;
  containerClassName?: string;
  errorText?: any;
  icon?: ReactNode;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLInputElement>;

export const InputField = ({
  titleText,
  children,
  errorText,
  containerClassName,
  icon,
  ...props
}: Props) => {
  return (
    <div
      className={cn(styles.container, containerClassName, {
        [styles.errorText]: !!errorText,
      })}
    >
      {titleText && <p className={styles.titleInput}>{titleText}</p>}
      <input {...props} />
      {children}
      {icon && <span className={styles.icon}>{icon}</span>}
      {!!errorText && (
        <>
          <ErrorIcon className={styles.icon} />
          <span className={styles.error}>{errorText}</span>
        </>
      )}
    </div>
  );
};
