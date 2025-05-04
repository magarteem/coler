import styles from "./textArea.module.scss";
import cn from "classnames";

type Props = {
  titleText: string;
  containerClassName?: string;
  errorText?: string;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLTextAreaElement>;

export const TextArea = ({
  titleText,
  children,
  errorText,
  containerClassName,
  ...props
}: Props) => {
  return (
    <div className={cn(styles.container, containerClassName)}>
      <p className={styles.titleInput}>{titleText}</p>
      <textarea {...props} />
      {children}
      <span className={styles.error}>{errorText}</span>
    </div>
  );
};
