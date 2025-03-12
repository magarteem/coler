import { ComponentPropsWithoutRef, ReactNode } from "react";
import s from "./button.module.scss";
import cn from "classnames";

type ButtonWidth = number | "full_width_btn" | "normal";
type ButtonSize = "sm" | "md" | "lg" | "full_width_btn";
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  widthBtn?: ButtonWidth;
  icon?: ReactNode;
  iconLeft?: ReactNode;
  classNameContainer?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export const Button = ({
  size = "lg",
  variant = "primary",
  widthBtn = "normal",
  children,
  classNameContainer,
  icon,
  iconLeft,
  ...props
}: ButtonProps) => {
  const classNames = [s.button, s[size], s[variant], s[widthBtn]].join(" ");

  return (
    <button
      style={widthBtn ? { width: `${widthBtn}px` } : {}}
      className={cn(classNames, classNameContainer)}
      {...props}
    >
      {iconLeft && <span className={s.iconLeft}>{iconLeft}</span>}
      {children}
      {icon && <span className={s.icon}>{icon}</span>}
    </button>
  );
};
