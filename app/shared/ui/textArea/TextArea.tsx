import { ReactNode } from "react";
import s from "./textArea.module.scss";
import cn from "classnames";

type Props = {
  titleText: string;
  containerClassName?: string;
  children?: React.ReactNode;
} & React.HTMLProps<HTMLTextAreaElement>;

export const TextArea = ({
  titleText,
  children,
  containerClassName,
  ...props
}: Props) => {
  return (
    <div className={cn(s.container, containerClassName)}>
      <p className={s.titleInput}>{titleText}</p>
      <textarea {...props} />
      {children}
    </div>
  );
};
